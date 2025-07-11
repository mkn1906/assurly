import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import bcrypt from "bcrypt";
import session from "express-session";
import { storage } from "./storage.js";
import { analyzeInsuranceDocument, compareInsurancePolicies, selectHighestImpactPolicyForFree, extractInsuranceData } from "./services/openai.js";
import { sendAnalysisReport } from "./services/email.js";
import { processDocument, validateFileUpload, calculateRetentionDate } from "./services/fileProcessor.js";
import { insertUserSchema, insertDocumentSchema, insertAnalysisSchema, insertDiscountCodeSchema } from "@shared/schema.js";

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
    })
  : null;

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || "insurance-analyst-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  // Currency conversion rates (simplified - in production, use real-time rates)
  const currencyRates = {
    DKK: 1,
    SEK: 0.94,
    NOK: 0.93,
    EUR: 7.44
  };

  // Pricing tiers in DKK
  const pricingTiers = {
    free: 0,
    single: 129,
    multiple: 199,
    annual: 588
  };

  // Authentication middleware
  function requireAuth(req: any, res: any, next: any) {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  }

  function requireAdminAuth(req: any, res: any, next: any) {
    if (!req.session.adminUserId) {
      return res.status(401).json({ message: "Admin authentication required" });
    }
    next();
  }

  // User registration
  app.post("/api/register", async (req, res) => {
    try {
      const { email, password } = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({ email, password: hashedPassword });
      req.session.userId = user.id;
      
      res.json({ user: { id: user.id, email: user.email, subscriptionTier: user.subscriptionTier } });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // User login
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ user: { id: user.id, email: user.email, subscriptionTier: user.subscriptionTier } });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // User logout
  app.post("/api/logout", (req: any, res: any) => {
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
  });

  // Get current user
  app.get("/api/user", async (req: any, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: { id: user.id, email: user.email, subscriptionTier: user.subscriptionTier } });
  });

  // Upload documents
  app.post("/api/upload", upload.array('documents', 5), async (req: any, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const analysisType = req.body.analysisType || 'free';
      const postcode = req.body.postcode || null; // Optional postcode for anonymous data collection
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Validate subscription tier limits
      if (analysisType === 'multiple' && files.length > 4) {
        return res.status(400).json({ message: "Maximum 4 documents allowed for multiple comparison (1 current + 3 competitors)" });
      }

      const documents = [];
      for (const file of files) {
        try {
          validateFileUpload(file);
          
          const processed = await processDocument(file.buffer, file.originalname, file.mimetype);
          
          const document = await storage.createDocument({
            userId: req.session.userId || null,
            filename: `${Date.now()}-${file.originalname}`,
            originalName: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype,
            documentType: processed.documentType
          });

          documents.push({
            id: document.id,
            filename: document.originalName,
            documentType: document.documentType,
            text: processed.text
          });
        } catch (error: any) {
          console.error(`Error processing file ${file.originalname}:`, error);
          return res.status(400).json({ message: `Error processing ${file.originalname}: ${error.message}` });
        }
      }

      // Extract and store anonymous insurance data if postcode is provided
      if (postcode) {
        try {
          for (const doc of documents) {
            if (doc.documentType === 'current_policy') {
              // Extract insurance data from current policy documents
              const insuranceData = await extractInsuranceData(doc.text);
              
              // Store anonymous data with postcode only (GDPR compliant)
              await storage.createInsuranceData({
                postcode: postcode,
                insuranceType: insuranceData.insuranceType,
                insuranceCompany: insuranceData.insuranceCompany || null,
                productName: insuranceData.productName || null,
                annualPremium: insuranceData.annualPremium ? insuranceData.annualPremium.toString() : null,
                coverageLevel: insuranceData.coverageLevel || null,
                extractedData: insuranceData.extractedData || null
              });
            }
          }
        } catch (error) {
          console.log('Failed to extract insurance data for anonymous collection:', error);
          // Don't fail the upload if insurance data extraction fails
        }
      }

      // Create analysis
      const analysis = await storage.createAnalysis({
        userId: req.session.userId || null,
        sessionId: req.session.id,
        documentIds: documents.map(d => d.id),
        analysisType
      });

      res.json({ 
        analysisId: analysis.id,
        documents: documents.map(d => ({
          id: d.id,
          filename: d.filename,
          documentType: d.documentType
        }))
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Upload failed: " + error.message });
    }
  });

  // Start analysis
  app.post("/api/analyze/:analysisId", async (req: any, res) => {
    try {
      const analysisId = parseInt(req.params.analysisId);
      const analysis = await storage.getAnalysis(analysisId);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      // Check if payment is required
      if (analysis.analysisType !== 'free' && !req.session.userId) {
        return res.status(401).json({ message: "Authentication required for paid analysis" });
      }

      await storage.updateAnalysisStatus(analysisId, "processing");

      // Get documents for analysis
      const documents = await storage.getDocumentsByAnalysis(analysisId);
      const allPolicies = documents.filter(d => d.documentType === 'current_policy');
      const competitorQuotes = documents.filter(d => d.documentType === 'competitor_quote');

      if (allPolicies.length === 0) {
        throw new Error("No policy documents found");
      }

      let analysisData;
      let conversionMessage = null;

      // For FREE tier: strategically select the policy with highest impact
      if (analysis.analysisType === 'free') {
        if (allPolicies.length === 1) {
          // Single policy - analyze normally
          analysisData = await analyzeInsuranceDocument(allPolicies[0].filename); // In real implementation, use actual document text
        } else {
          // Multiple policies - select highest impact one for maximum conversion potential
          const documentsForAnalysis = allPolicies.map(doc => ({
            text: doc.filename, // In real implementation, use actual document text
            filename: doc.originalName
          }));
          
          const impactResult = await selectHighestImpactPolicyForFree(documentsForAnalysis);
          analysisData = impactResult.analysis;
          conversionMessage = impactResult.conversionMessage;
          
          // Add conversion metadata to analysis
          analysisData.selectedPolicy = impactResult.selectedDocument.filename;
          analysisData.totalPoliciesUploaded = allPolicies.length;
          analysisData.conversionMessage = conversionMessage;
        }
      } else {
        // PAID tier: analyze all policies
        const currentPolicy = allPolicies[0]; // For now, use first policy
        analysisData = await analyzeInsuranceDocument(currentPolicy.filename); // In real implementation, use actual document text
      }

      let comparisonData = null;
      if (competitorQuotes.length > 0 && analysis.analysisType !== 'free') {
        // For multiple comparisons, analyze against each competitor
        comparisonData = [];
        for (const quote of competitorQuotes) {
          const comparison = await compareInsurancePolicies(
            currentPolicy.filename, // In real implementation, use actual document text
            quote.filename
          );
          comparisonData.push({
            quoteId: quote.id,
            quoteName: quote.originalName,
            comparison
          });
        }
      }

      await storage.updateAnalysisData(analysisId, analysisData, comparisonData);

      // Send email report if requested
      if (req.body.email) {
        await storage.createEmailReport(analysisId, req.body.email);
        // In real implementation, trigger email sending job
        await sendAnalysisReport(req.body.email, analysisData, comparisonData);
      }

      res.json({ 
        analysisId,
        status: "completed",
        analysisData,
        comparisonData
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      await storage.updateAnalysisStatus(parseInt(req.params.analysisId), "error");
      res.status(500).json({ message: "Analysis failed: " + error.message });
    }
  });

  // Get analysis results
  app.get("/api/analysis/:analysisId", async (req: any, res) => {
    try {
      const analysisId = parseInt(req.params.analysisId);
      const analysis = await storage.getAnalysis(analysisId);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      // Check access permissions
      if (analysis.userId && analysis.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!analysis.userId && analysis.sessionId !== req.session.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json({
        id: analysis.id,
        analysisType: analysis.analysisType,
        status: analysis.status,
        analysisData: analysis.analysisData,
        comparisonData: analysis.comparisonData,
        createdAt: analysis.createdAt
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user analyses
  app.get("/api/analyses", requireAuth, async (req: any, res) => {
    try {
      const analyses = await storage.getAnalysesByUser(req.session.userId);
      res.json(analyses.map(a => ({
        id: a.id,
        analysisType: a.analysisType,
        status: a.status,
        createdAt: a.createdAt
      })));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get pricing in different currencies
  app.get("/api/pricing/:currency", (req, res) => {
    const currency = req.params.currency.toUpperCase();
    const rate = currencyRates[currency as keyof typeof currencyRates];
    
    if (!rate) {
      return res.status(400).json({ message: "Unsupported currency" });
    }

    const pricing = Object.entries(pricingTiers).reduce((acc, [tier, dkkPrice]) => {
      acc[tier] = Math.round(dkkPrice * rate);
      return acc;
    }, {} as Record<string, number>);

    res.json({ currency, pricing });
  });

  // Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = 'DKK', analysisType } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents/øre
        currency: currency.toLowerCase(),
        payment_method_types: ['card', 'mobilepay'], // Enable MobilePay for Danish customers
        metadata: {
          analysisType,
          userId: req.session.userId?.toString() || 'anonymous'
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Stripe webhook for payment confirmation
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        
        // Update payment status and user subscription if applicable
        const payment = await storage.getPaymentByStripeId(paymentIntent.id);
        if (payment) {
          await storage.updatePaymentStatus(payment.id, 'succeeded');
          
          // Update user subscription
          if (payment.userId) {
            const analysisType = paymentIntent.metadata.analysisType;
            if (analysisType === 'annual') {
              const expiresAt = new Date();
              expiresAt.setFullYear(expiresAt.getFullYear() + 1);
              await storage.updateUserSubscription(payment.userId, 'annual', expiresAt);
            }
          }
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // Admin authentication endpoints
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Get admin user by email
      const adminUser = await storage.getAdminUserByEmail(email);
      if (!adminUser || !adminUser.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isValid = await bcrypt.compare(password, adminUser.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Update last login
      await storage.updateAdminUserLastLogin(adminUser.id);
      
      // Set admin session
      (req.session as any).adminUserId = adminUser.id;
      
      // Return admin user info (without password)
      const { password: _, ...adminInfo } = adminUser;
      res.json(adminInfo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/reset-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      const adminUser = await storage.getAdminUserByEmail(email);
      if (!adminUser) {
        // Don't reveal if email exists for security
        return res.json({ message: "If the email exists, a reset link has been sent" });
      }
      
      // Generate reset token
      const crypto = await import('crypto');
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour
      
      await storage.setAdminPasswordResetToken(email, resetToken, expiresAt);
      
      // In a real implementation, send email here
      // For demo, we'll log the reset information
      console.log(`🔑 Password reset for ${email}:
Reset token: ${resetToken}
Expires: ${expiresAt}
Reset URL: ${req.protocol}://${req.get('host')}/admin/reset/${resetToken}`);
      
      res.json({ message: "If the email exists, a reset link has been sent" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/update-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      
      const adminUser = await storage.getAdminUserByResetToken(token);
      if (!adminUser) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update password and clear reset token
      await storage.updateAdminPassword(adminUser.id, hashedPassword);
      await storage.clearAdminResetToken(adminUser.id);
      
      res.json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    (req.session as any).adminUserId = null;
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/admin/me", async (req, res) => {
    try {
      const adminUserId = (req.session as any).adminUserId;
      if (!adminUserId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const adminUser = await storage.getAdminUser(adminUserId);
      if (!adminUser) {
        return res.status(401).json({ message: "Admin user not found" });
      }
      
      const { password: _, ...adminInfo } = adminUser;
      res.json(adminInfo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin endpoints for customer management and email campaigns
  app.get("/api/admin/customers", async (req, res) => {
    try {
      // Get all analyses to build customer data
      const analyses = await storage.getAllAnalyses();
      
      // Group by email and aggregate data
      const customerMap = new Map();
      
      for (const analysis of analyses) {
        const email = analysis.sessionId + "@customer.assurly.io"; // Mock email for demo
        
        if (!customerMap.has(email)) {
          customerMap.set(email, {
            id: analysis.id,
            email,
            analysisType: analysis.analysisType || "Generel analyse",
            createdAt: analysis.createdAt,
            policiesUploaded: 1,
            lastAnalysis: analysis.createdAt
          });
        } else {
          const existing = customerMap.get(email);
          existing.policiesUploaded += 1;
          if (new Date(analysis.createdAt) > new Date(existing.lastAnalysis)) {
            existing.lastAnalysis = analysis.createdAt;
            existing.analysisType = analysis.analysisType || existing.analysisType;
          }
        }
      }
      
      const customers = Array.from(customerMap.values())
        .sort((a, b) => new Date(b.lastAnalysis).getTime() - new Date(a.lastAnalysis).getTime());
      
      res.json(customers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/send-campaign", async (req, res) => {
    try {
      const { subject, content, recipients } = req.body;
      
      // In a real implementation, this would integrate with an email service
      // For now, we'll simulate the email sending process
      
      console.log(`📧 Email Campaign Sent:
Subject: ${subject}
Recipients: ${recipients.length} customers
Content preview: ${content.substring(0, 100)}...`);
      
      // Here you would integrate with SendGrid, Mailchimp, or similar service
      // Example implementation would be:
      /*
      for (const email of recipients) {
        await sendEmail({
          to: email,
          from: "noreply@assurly.io",
          subject,
          html: content.replace(/\n/g, '<br>'),
        });
      }
      */
      
      res.json({ 
        message: "Email campaign sent successfully",
        sentCount: recipients.length 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Discount Code Validation for Checkout
  app.post("/api/validate-discount", async (req, res) => {
    try {
      const { code, amount } = req.body;
      
      if (!code) {
        return res.status(400).json({ message: "Discount code required" });
      }

      const discountCode = await storage.getDiscountCodeByCode(code);
      
      if (!discountCode) {
        return res.status(404).json({ message: "Invalid discount code" });
      }

      if (!discountCode.isActive) {
        return res.status(400).json({ message: "Discount code is inactive" });
      }

      const discountPercentage = parseFloat(discountCode.discountPercentage);
      const originalAmount = parseFloat(amount);
      const discountAmount = (originalAmount * discountPercentage) / 100;
      const finalAmount = originalAmount - discountAmount;

      res.json({
        valid: true,
        discountCode: {
          id: discountCode.id,
          code: discountCode.code,
          discountPercentage: discountPercentage,
          description: discountCode.description
        },
        pricing: {
          originalAmount,
          discountAmount,
          finalAmount,
          discountPercentage
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin Discount Code Management
  app.get("/api/admin/discount-codes", requireAdminAuth, async (req, res) => {
    try {
      const discountCodes = await storage.getAllDiscountCodes();
      res.json(discountCodes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/discount-codes", requireAdminAuth, async (req, res) => {
    try {
      const validatedData = insertDiscountCodeSchema.parse({
        ...req.body,
        createdBy: req.session.adminUserId || 1
      });
      
      const discountCode = await storage.createDiscountCode(validatedData);
      res.status(201).json(discountCode);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/admin/discount-codes/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      await storage.updateDiscountCodeStatus(parseInt(id), isActive);
      res.json({ message: "Discount code status updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/discount-codes/:id", requireAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDiscountCode(parseInt(id));
      res.json({ message: "Discount code deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin Insurance Data Analytics (GDPR compliant - postcode only)
  app.get("/api/admin/insurance-data/stats", requireAdminAuth, async (req, res) => {
    try {
      const { postcode, insuranceType } = req.query;
      
      const stats = await storage.getInsuranceDataStats(
        postcode as string,
        insuranceType as string
      );
      
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/insurance-data/by-postcode/:postcode", requireAdminAuth, async (req, res) => {
    try {
      const { postcode } = req.params;
      const data = await storage.getInsuranceDataByPostcode(postcode);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/insurance-data/by-type/:type", requireAdminAuth, async (req, res) => {
    try {
      const { type } = req.params;
      const data = await storage.getInsuranceDataByType(type);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Discount Usage Reports
  app.get("/api/admin/discount-usage", requireAdminAuth, async (req, res) => {
    try {
      const { code, startDate, endDate } = req.query;
      
      const report = await storage.getDiscountUsageReport(
        code as string,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      res.json(report);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Cleanup job endpoint (would typically be called by a cron job)
  app.post("/api/cleanup", async (req, res) => {
    try {
      await storage.deleteExpiredDocuments();
      await storage.deleteExpiredAnalyses();
      res.json({ message: "Cleanup completed" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
