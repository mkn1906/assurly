import { 
  users, documents, analyses, payments, emailReports, adminUsers, discountCodes, discountUsage, insuranceData,
  type User, type InsertUser, type Document, type InsertDocument,
  type Analysis, type InsertAnalysis, type Payment, type InsertPayment,
  type EmailReport, type AdminUser, type InsertAdminUser,
  type DiscountCode, type InsertDiscountCode, type DiscountUsage, type InsertDiscountUsage,
  type InsuranceData, type InsertInsuranceData
} from "@shared/schema";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId?: string): Promise<User>;
  updateUserSubscription(userId: number, tier: string, expiresAt?: Date): Promise<User>;

  // Document operations
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByUser(userId: number): Promise<Document[]>;
  getDocumentsByAnalysis(analysisId: number): Promise<Document[]>;
  deleteDocument(id: number): Promise<void>;
  deleteExpiredDocuments(): Promise<void>;

  // Analysis operations
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: number): Promise<Analysis | undefined>;
  getAnalysesByUser(userId: number): Promise<Analysis[]>;
  getAnalysisBySession(sessionId: string): Promise<Analysis | undefined>;
  getAllAnalyses(): Promise<Analysis[]>;
  updateAnalysisStatus(id: number, status: string): Promise<void>;
  updateAnalysisData(id: number, analysisData: any, comparisonData?: any): Promise<void>;
  deleteExpiredAnalyses(): Promise<void>;

  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentByStripeId(stripeId: string): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string): Promise<void>;

  // Email report operations
  createEmailReport(analysisId: number, email: string): Promise<EmailReport>;
  updateEmailReportStatus(id: number, status: string): Promise<void>;
  getPendingEmailReports(): Promise<EmailReport[]>;

  // Admin user operations
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  updateAdminUserLastLogin(id: number): Promise<void>;
  setAdminPasswordResetToken(email: string, token: string, expiresAt: Date): Promise<void>;
  getAdminUserByResetToken(token: string): Promise<AdminUser | undefined>;
  updateAdminPassword(id: number, password: string): Promise<void>;
  clearAdminResetToken(id: number): Promise<void>;

  // Discount code operations
  createDiscountCode(discountCode: InsertDiscountCode): Promise<DiscountCode>;
  getDiscountCode(id: number): Promise<DiscountCode | undefined>;
  getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined>;
  getAllDiscountCodes(): Promise<DiscountCode[]>;
  updateDiscountCodeStatus(id: number, isActive: boolean): Promise<void>;
  deleteDiscountCode(id: number): Promise<void>;

  // Discount usage operations
  createDiscountUsage(discountUsage: InsertDiscountUsage): Promise<DiscountUsage>;
  getDiscountUsageByPayment(paymentId: number): Promise<DiscountUsage | undefined>;
  getDiscountUsageByCode(codeId: number, startDate?: Date, endDate?: Date): Promise<DiscountUsage[]>;
  getDiscountUsageReport(codeFilter?: string, startDate?: Date, endDate?: Date): Promise<Array<DiscountUsage & { code: string; description?: string }>>;

  // Insurance data operations (GDPR compliant - postcode only)
  createInsuranceData(insuranceData: InsertInsuranceData): Promise<InsuranceData>;
  getInsuranceDataByPostcode(postcode: string): Promise<InsuranceData[]>;
  getInsuranceDataByType(insuranceType: string): Promise<InsuranceData[]>;
  getInsuranceDataStats(postcode?: string, insuranceType?: string): Promise<{
    averagePremium: number;
    sampleSize: number;
    priceRange: { min: number; max: number };
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private analyses: Map<number, Analysis>;
  private payments: Map<number, Payment>;
  private emailReports: Map<number, EmailReport>;
  private adminUsers: Map<number, AdminUser>;
  private discountCodes: Map<number, DiscountCode>;
  private discountUsage: Map<number, DiscountUsage>;
  private insuranceData: Map<number, InsuranceData>;
  private currentUserId: number;
  private currentDocumentId: number;
  private currentAnalysisId: number;
  private currentPaymentId: number;
  private currentEmailReportId: number;
  private currentAdminUserId: number;
  private currentDiscountCodeId: number;
  private currentDiscountUsageId: number;
  private currentInsuranceDataId: number;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.analyses = new Map();
    this.payments = new Map();
    this.emailReports = new Map();
    this.adminUsers = new Map();
    this.discountCodes = new Map();
    this.discountUsage = new Map();
    this.insuranceData = new Map();
    this.currentUserId = 1;
    this.currentDocumentId = 1;
    this.currentAnalysisId = 1;
    this.currentPaymentId = 1;
    this.currentEmailReportId = 1;
    this.currentAdminUserId = 1;
    this.currentDiscountCodeId = 1;
    this.currentDiscountUsageId = 1;
    this.currentInsuranceDataId = 1;

    // Create default admin user
    this.createDefaultAdminUser();
  }

  private async createDefaultAdminUser() {
    const hashedPassword = await bcrypt.hash('tempPassword123!', 10);
    
    const adminUser: AdminUser = {
      id: this.currentAdminUserId++,
      email: 'mkn@siblsolutions.com',
      password: hashedPassword,
      name: 'Martin Knudsen',
      role: 'admin',
      lastLoginAt: null,
      resetToken: null,
      resetTokenExpiresAt: null,
      createdAt: new Date(),
      isActive: true,
    };
    
    this.adminUsers.set(adminUser.id, adminUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionTier: "free",
      subscriptionExpiresAt: null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId?: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = {
      ...user,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId || user.stripeSubscriptionId
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserSubscription(userId: number, tier: string, expiresAt?: Date): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = {
      ...user,
      subscriptionTier: tier,
      subscriptionExpiresAt: expiresAt || null
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = {
      ...insertDocument,
      id,
      uploadedAt: new Date(),
      expiresAt: null,
      analysisStatus: "pending"
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getDocumentsByUser(userId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.userId === userId);
  }

  async getDocumentsByAnalysis(analysisId: number): Promise<Document[]> {
    const analysis = this.analyses.get(analysisId);
    if (!analysis) return [];
    
    const documentIds = analysis.documentIds as number[];
    return documentIds.map(id => this.documents.get(id)).filter(Boolean) as Document[];
  }

  async deleteDocument(id: number): Promise<void> {
    this.documents.delete(id);
  }

  async deleteExpiredDocuments(): Promise<void> {
    const now = new Date();
    for (const [id, document] of this.documents.entries()) {
      if (document.expiresAt && document.expiresAt <= now) {
        this.documents.delete(id);
      }
    }
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.currentAnalysisId++;
    const analysis: Analysis = {
      ...insertAnalysis,
      id,
      analysisData: null,
      comparisonData: null,
      status: "pending",
      createdAt: new Date(),
      expiresAt: null
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: number): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getAnalysesByUser(userId: number): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).filter(analysis => analysis.userId === userId);
  }

  async getAnalysisBySession(sessionId: string): Promise<Analysis | undefined> {
    return Array.from(this.analyses.values()).find(analysis => analysis.sessionId === sessionId);
  }

  async getAllAnalyses(): Promise<Analysis[]> {
    return Array.from(this.analyses.values());
  }

  async updateAnalysisStatus(id: number, status: string): Promise<void> {
    const analysis = this.analyses.get(id);
    if (analysis) {
      this.analyses.set(id, { ...analysis, status });
    }
  }

  async updateAnalysisData(id: number, analysisData: any, comparisonData?: any): Promise<void> {
    const analysis = this.analyses.get(id);
    if (analysis) {
      this.analyses.set(id, { 
        ...analysis, 
        analysisData, 
        comparisonData: comparisonData || analysis.comparisonData,
        status: "completed"
      });
    }
  }

  async deleteExpiredAnalyses(): Promise<void> {
    const now = new Date();
    for (const [id, analysis] of this.analyses.entries()) {
      if (analysis.expiresAt && analysis.expiresAt <= now) {
        this.analyses.delete(id);
      }
    }
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const payment: Payment = {
      ...insertPayment,
      id,
      createdAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByStripeId(stripeId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(payment => payment.stripePaymentIntentId === stripeId);
  }

  async updatePaymentStatus(id: number, status: string): Promise<void> {
    const payment = this.payments.get(id);
    if (payment) {
      this.payments.set(id, { ...payment, status });
    }
  }

  async createEmailReport(analysisId: number, email: string): Promise<EmailReport> {
    const id = this.currentEmailReportId++;
    const emailReport: EmailReport = {
      id,
      analysisId,
      email,
      status: "pending",
      sentAt: null,
      createdAt: new Date()
    };
    this.emailReports.set(id, emailReport);
    return emailReport;
  }

  async updateEmailReportStatus(id: number, status: string): Promise<void> {
    const emailReport = this.emailReports.get(id);
    if (emailReport) {
      this.emailReports.set(id, { 
        ...emailReport, 
        status,
        sentAt: status === "sent" ? new Date() : emailReport.sentAt
      });
    }
  }

  async getPendingEmailReports(): Promise<EmailReport[]> {
    return Array.from(this.emailReports.values()).filter(report => report.status === "pending");
  }

  // Admin user operations
  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(admin => admin.email === email);
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminUserId++;
    const adminUser: AdminUser = {
      id,
      ...insertAdminUser,
      lastLoginAt: null,
      resetToken: null,
      resetTokenExpiresAt: null,
      createdAt: new Date(),
      isActive: true,
    };
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }

  async updateAdminUserLastLogin(id: number): Promise<void> {
    const adminUser = this.adminUsers.get(id);
    if (adminUser) {
      this.adminUsers.set(id, { ...adminUser, lastLoginAt: new Date() });
    }
  }

  async setAdminPasswordResetToken(email: string, token: string, expiresAt: Date): Promise<void> {
    const adminUser = Array.from(this.adminUsers.values()).find(admin => admin.email === email);
    if (adminUser) {
      this.adminUsers.set(adminUser.id, { 
        ...adminUser, 
        resetToken: token, 
        resetTokenExpiresAt: expiresAt 
      });
    }
  }

  async getAdminUserByResetToken(token: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(admin => 
      admin.resetToken === token && 
      admin.resetTokenExpiresAt && 
      admin.resetTokenExpiresAt > new Date()
    );
  }

  async updateAdminPassword(id: number, password: string): Promise<void> {
    const adminUser = this.adminUsers.get(id);
    if (adminUser) {
      this.adminUsers.set(id, { ...adminUser, password });
    }
  }

  async clearAdminResetToken(id: number): Promise<void> {
    const adminUser = this.adminUsers.get(id);
    if (adminUser) {
      this.adminUsers.set(id, { 
        ...adminUser, 
        resetToken: null, 
        resetTokenExpiresAt: null 
      });
    }
  }

  // Discount code operations
  async createDiscountCode(insertDiscountCode: InsertDiscountCode): Promise<DiscountCode> {
    const discountCode: DiscountCode = {
      id: this.currentDiscountCodeId++,
      ...insertDiscountCode,
      isActive: true,
      createdAt: new Date(),
    };
    this.discountCodes.set(discountCode.id, discountCode);
    return discountCode;
  }

  async getDiscountCode(id: number): Promise<DiscountCode | undefined> {
    return this.discountCodes.get(id);
  }

  async getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
    for (const discountCode of this.discountCodes.values()) {
      if (discountCode.code.toLowerCase() === code.toLowerCase() && discountCode.isActive) {
        return discountCode;
      }
    }
    return undefined;
  }

  async getAllDiscountCodes(): Promise<DiscountCode[]> {
    return Array.from(this.discountCodes.values());
  }

  async updateDiscountCodeStatus(id: number, isActive: boolean): Promise<void> {
    const discountCode = this.discountCodes.get(id);
    if (discountCode) {
      this.discountCodes.set(id, { ...discountCode, isActive });
    }
  }

  async deleteDiscountCode(id: number): Promise<void> {
    this.discountCodes.delete(id);
  }

  // Discount usage operations
  async createDiscountUsage(insertDiscountUsage: InsertDiscountUsage): Promise<DiscountUsage> {
    const discountUsage: DiscountUsage = {
      id: this.currentDiscountUsageId++,
      ...insertDiscountUsage,
      usedAt: new Date(),
    };
    this.discountUsage.set(discountUsage.id, discountUsage);
    return discountUsage;
  }

  async getDiscountUsageByPayment(paymentId: number): Promise<DiscountUsage | undefined> {
    for (const usage of this.discountUsage.values()) {
      if (usage.paymentId === paymentId) {
        return usage;
      }
    }
    return undefined;
  }

  async getDiscountUsageByCode(codeId: number, startDate?: Date, endDate?: Date): Promise<DiscountUsage[]> {
    const usageList = Array.from(this.discountUsage.values()).filter(usage => 
      usage.discountCodeId === codeId
    );

    if (startDate || endDate) {
      return usageList.filter(usage => {
        const usedAt = usage.usedAt;
        if (startDate && usedAt < startDate) return false;
        if (endDate && usedAt > endDate) return false;
        return true;
      });
    }

    return usageList;
  }

  async getDiscountUsageReport(codeFilter?: string, startDate?: Date, endDate?: Date): Promise<Array<DiscountUsage & { code: string; description?: string }>> {
    let filteredUsage = Array.from(this.discountUsage.values());

    // Date filtering
    if (startDate || endDate) {
      filteredUsage = filteredUsage.filter(usage => {
        const usedAt = usage.usedAt;
        if (startDate && usedAt < startDate) return false;
        if (endDate && usedAt > endDate) return false;
        return true;
      });
    }

    // Join with discount codes and filter by code
    const report = filteredUsage.map(usage => {
      const discountCode = this.discountCodes.get(usage.discountCodeId);
      return {
        ...usage,
        code: discountCode?.code || 'UNKNOWN',
        description: discountCode?.description || undefined
      };
    });

    // Code filtering
    if (codeFilter) {
      return report.filter(item => 
        item.code.toLowerCase().includes(codeFilter.toLowerCase())
      );
    }

    return report;
  }

  // Insurance data operations (GDPR compliant)
  async createInsuranceData(insertInsuranceData: InsertInsuranceData): Promise<InsuranceData> {
    const insuranceData: InsuranceData = {
      id: this.currentInsuranceDataId++,
      postcode: insertInsuranceData.postcode,
      insuranceType: insertInsuranceData.insuranceType,
      coverageLevel: insertInsuranceData.coverageLevel || null,
      annualPremium: insertInsuranceData.annualPremium || null,
      insuranceCompany: insertInsuranceData.insuranceCompany || null,
      productName: insertInsuranceData.productName || null,
      extractedData: insertInsuranceData.extractedData || null,
      collectedAt: new Date(),
      dataSource: insertInsuranceData.dataSource || "upload",
    };
    
    this.insuranceData.set(insuranceData.id, insuranceData);
    return insuranceData;
  }

  async getInsuranceDataByPostcode(postcode: string): Promise<InsuranceData[]> {
    return Array.from(this.insuranceData.values()).filter(data => data.postcode === postcode);
  }

  async getInsuranceDataByType(insuranceType: string): Promise<InsuranceData[]> {
    return Array.from(this.insuranceData.values()).filter(data => data.insuranceType === insuranceType);
  }

  async getInsuranceDataStats(postcode?: string, insuranceType?: string): Promise<{
    averagePremium: number;
    sampleSize: number;
    priceRange: { min: number; max: number };
  }> {
    let filteredData = Array.from(this.insuranceData.values());
    
    if (postcode) {
      filteredData = filteredData.filter(data => data.postcode === postcode);
    }
    
    if (insuranceType) {
      filteredData = filteredData.filter(data => data.insuranceType === insuranceType);
    }
    
    // Only include data with valid premium amounts
    const validPremiums = filteredData
      .filter(data => data.annualPremium && data.annualPremium > 0)
      .map(data => Number(data.annualPremium));
    
    if (validPremiums.length === 0) {
      return {
        averagePremium: 0,
        sampleSize: 0,
        priceRange: { min: 0, max: 0 }
      };
    }
    
    const sum = validPremiums.reduce((a, b) => a + b, 0);
    const averagePremium = Math.round(sum / validPremiums.length);
    const min = Math.min(...validPremiums);
    const max = Math.max(...validPremiums);
    
    return {
      averagePremium,
      sampleSize: validPremiums.length,
      priceRange: { min, max }
    };
  }
}

export const storage = new MemStorage();
