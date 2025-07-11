import { pgTable, text, serial, integer, boolean, timestamp, jsonb, numeric, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionTier: text("subscription_tier").default("free"), // free, single, multiple, annual
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  documentType: text("document_type").notNull(), // current_policy, competitor_quote
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // for automatic deletion
  analysisStatus: text("analysis_status").default("pending"), // pending, processing, completed, error
});

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"), // for anonymous users
  documentIds: jsonb("document_ids").notNull(), // array of document IDs
  analysisType: text("analysis_type").notNull(), // free, single, multiple
  analysisData: jsonb("analysis_data"), // AI analysis results
  comparisonData: jsonb("comparison_data"), // competitor comparison results
  status: text("status").default("pending"), // pending, processing, completed, error
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // for automatic deletion
});

export const discountCodes = pgTable("discount_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  discountPercentage: numeric("discount_percentage", { precision: 5, scale: 2 }).notNull(), // e.g., 15.50 for 15.5%
  isActive: boolean("is_active").default(true),
  description: text("description"), // for admin reference, e.g., "B2B partner ABC Insurance"
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => adminUsers.id),
});

export const discountUsage = pgTable("discount_usage", {
  id: serial("id").primaryKey(),
  discountCodeId: integer("discount_code_id").references(() => discountCodes.id).notNull(),
  paymentId: integer("payment_id").references(() => payments.id).notNull(),
  userId: integer("user_id").references(() => users.id),
  originalAmount: numeric("original_amount", { precision: 10, scale: 2 }).notNull(),
  discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }).notNull(),
  finalAmount: numeric("final_amount", { precision: 10, scale: 2 }).notNull(),
  usedAt: timestamp("used_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  status: text("status").notNull(), // pending, succeeded, failed
  analysisId: integer("analysis_id").references(() => analyses.id),
  discountCodeId: integer("discount_code_id").references(() => discountCodes.id), // applied discount
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailReports = pgTable("email_reports", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analyses.id),
  email: text("email").notNull(),
  status: text("status").default("pending"), // pending, sent, failed
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").default("admin"), // admin, super_admin
  lastLoginAt: timestamp("last_login_at"),
  resetToken: text("reset_token"),
  resetTokenExpiresAt: timestamp("reset_token_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Anonymous insurance data for price comparison feature (GDPR compliant)
export const insuranceData = pgTable("insurance_data", {
  id: serial("id").primaryKey(),
  postcode: varchar("postcode", { length: 10 }).notNull(), // Only non-identifying data
  insuranceType: text("insurance_type").notNull(), // bil, hus, indbo, rejse, sundhed
  coverageLevel: text("coverage_level"), // basis, medium, comprehensive
  annualPremium: numeric("annual_premium", { precision: 10, scale: 2 }), // extracted amount
  insuranceCompany: text("insurance_company"), // extracted company name
  productName: text("product_name"), // extracted product/policy name
  extractedData: jsonb("extracted_data"), // additional anonymous policy details
  collectedAt: timestamp("collected_at").defaultNow(),
  dataSource: text("data_source").default("upload"), // upload, competitor_quote
});

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  userId: true,
  filename: true,
  originalName: true,
  fileSize: true,
  mimeType: true,
  documentType: true,
});

export const insertAnalysisSchema = createInsertSchema(analyses).pick({
  userId: true,
  sessionId: true,
  documentIds: true,
  analysisType: true,
});

export const insertDiscountCodeSchema = createInsertSchema(discountCodes).pick({
  code: true,
  discountPercentage: true,
  description: true,
  createdBy: true,
});

export const insertDiscountUsageSchema = createInsertSchema(discountUsage).pick({
  discountCodeId: true,
  paymentId: true,
  userId: true,
  originalAmount: true,
  discountAmount: true,
  finalAmount: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  userId: true,
  stripePaymentIntentId: true,
  amount: true,
  currency: true,
  status: true,
  analysisId: true,
  discountCodeId: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  email: true,
  password: true,
  name: true,
  role: true,
});

export const adminLoginSchema = createInsertSchema(adminUsers).pick({
  email: true,
  password: true,
});

export const adminPasswordResetSchema = z.object({
  email: z.string().email(),
});

export const adminPasswordUpdateSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export const insertInsuranceDataSchema = createInsertSchema(insuranceData).pick({
  postcode: true,
  insuranceType: true,
  coverageLevel: true,
  annualPremium: true,
  insuranceCompany: true,
  productName: true,
  extractedData: true,
  dataSource: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDiscountCode = z.infer<typeof insertDiscountCodeSchema>;
export type DiscountCode = typeof discountCodes.$inferSelect;
export type InsertDiscountUsage = z.infer<typeof insertDiscountUsageSchema>;
export type DiscountUsage = typeof discountUsage.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
export type EmailReport = typeof emailReports.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type AdminPasswordReset = z.infer<typeof adminPasswordResetSchema>;
export type AdminPasswordUpdate = z.infer<typeof adminPasswordUpdateSchema>;
export type InsertInsuranceData = z.infer<typeof insertInsuranceDataSchema>;
export type InsuranceData = typeof insuranceData.$inferSelect;
