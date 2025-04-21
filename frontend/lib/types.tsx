import { z } from "zod";

export const tenantSchema = z.object({
  personalInfo: z.object({
    // Personal Info
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone Number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    // image: z.string().url("Must be a valid image URL").optional(),
    address: z.object({
      street: z.string().min(1, "Street Address is required"),
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
      postalCode: z.string().min(1, "Postal Code is required"),
    }),
  }),

  // Emergency Contact Info
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency Contact Name is required"),
    relationship: z.enum(
      ["parent", "spouse", "sibling", "friend", "colleague", "other"],
      {
        required_error: "Relationsip is required",
        invalid_type_error: "Invalid relationship type",
      }
    ),
    phone: z.string().min(1, "Emergency Phone is required"),
    email: z.string().email("Invalid email address"),
    address: z.object({
      street: z.string().min(1, "Street Address is required"),
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
      postalCode: z.string().min(1, "Postal Code is required"),
    }),
  }),

  // Business & Lease Info
  businessInfo: z.object({
    businessName: z.string().min(1, "Business Name is required"),
    businessType: z.enum(
      ["retail", "food", "services", "office", "commercial", "other"],
      {
        required_error: "Business type is required",
        invalid_type_error: "Invalid business type",
      }
    ),
    businessPhone: z.string().min(1, "Business Phone is required"),
    businessEmail: z.string().email("Invalid Business Email"),
  }),

  // Lease Info
  leaseInfo: z.object({
    startDate: z.string().min(1, "Lease Start Date is required"),
    endDate: z.string().min(1, "Lease End Date is required"),
    securityDeposit: z.string().min(1, "Security Deposit is required"),
    paymentSchedule: z.enum(["monthly", "quarterly", "annually"], {
      required_error: "Payment Schedule is required",
      invalid_type_error: "Invalid payment schedule type",
    }),
    // documents: z.string().optional(),
  }),
  roomId: z.string().min(1, "Room selection is required"),
});

export const tenantSchemaDemo = z.object({
  personalInfo: z.object({
    name: z.string().default("John Doe"),
    email: z.string().default("test@example.com"),
    phone: z.string().default("000-000-0000"),
    password: z.string().default("password123"),
    address: z.object({
      street: z.string().default("123 Main St"),
      city: z.string().default("Unknown City"),
      country: z.string().default("Unknown Country"),
      postalCode: z.string().default("00000"),
    }),
  }),

  emergencyContact: z.object({
    name: z.string().default("Emergency Contact"),
    relationship: z
      .enum(["parent", "spouse", "sibling", "friend", "colleague", "other"])
      .default("parent"),
    phone: z.string().default("000-000-0000"),
    address: z.object({
      street: z.string().default("456 Emergency St"),
      city: z.string().default("Unknown City"),
      country: z.string().default("Unknown Country"),
      postalCode: z.string().default("00000"),
    }),
  }),

  businessInfo: z.object({
    businessName: z.string().default("ABC Corp"),
    businessType: z
      .enum(["retail", "food", "services", "office", "commercial", "other"])
      .default("retail"),
    businessPhone: z.string().default("000-000-0000"),
    businessEmail: z.string().default("business@example.com"),
  }),

  leaseInfo: z.object({
    startDate: z.string().default("2023-01-01"),
    endDate: z.string().default("2024-01-01"),
    monthlyRent: z.string().default("1000"),
    securityDeposit: z.string().default("2000"),
    paymentSchedule: z
      .enum(["monthly", "quarterly", "annually"])
      .default("monthly"),
  }),
});
