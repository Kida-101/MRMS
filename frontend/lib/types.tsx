import { z } from "zod";

export const tenantSchema = z.object({
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
});
