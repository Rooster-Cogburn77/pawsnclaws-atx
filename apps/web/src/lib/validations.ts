/**
 * Form Validation Schemas using Zod
 *
 * Centralized validation for all forms in the application.
 * Use these on both client-side (forms) and server-side (API routes).
 */

import { z } from "zod";

// ============================================
// COMMON FIELD SCHEMAS
// ============================================

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^[\d\s\-\(\)\+\.]+$/,
    "Please enter a valid phone number"
  )
  .transform((val) => val.replace(/[^\d+]/g, ""));

export const phoneOptionalSchema = z
  .string()
  .regex(/^[\d\s\-\(\)\+\.]*$/, "Please enter a valid phone number")
  .transform((val) => val.replace(/[^\d+]/g, ""))
  .optional()
  .or(z.literal(""));

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters");

export const messageSchema = z
  .string()
  .min(1, "Message is required")
  .min(10, "Please provide more detail (at least 10 characters)")
  .max(5000, "Message must be less than 5000 characters");

export const messageOptionalSchema = z
  .string()
  .max(5000, "Message must be less than 5000 characters")
  .optional()
  .or(z.literal(""));

// ============================================
// CONTACT FORM
// ============================================

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  reason: z.string().optional(),
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ============================================
// NEWSLETTER
// ============================================

export const newsletterSchema = z.object({
  email: emailSchema,
  city: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ============================================
// VOLUNTEER APPLICATION
// ============================================

export const volunteerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneOptionalSchema,
  roles: z.array(z.string()).min(1, "Please select at least one role"),
  experience: z.string().optional(),
  availability: z.string().optional(),
  interests: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: phoneOptionalSchema,
  howHeard: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

// ============================================
// FOSTER APPLICATION
// ============================================

export const fosterSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(1, "Address is required"),
  housingType: z.enum(["house", "apartment", "condo", "other"], {
    error: "Please select your housing type" }),
  hasYard: z.boolean().optional(),
  otherPets: z.string().optional(),
  experience: z.string().optional(),
  fosterType: z.enum(["cats", "dogs", "kittens", "puppies", "any"], {
    error: "Please select what you'd like to foster" }),
  availability: z.string().optional(),
  emergencyVet: z.boolean().optional(),
  notes: z.string().optional(),
});

export type FosterFormData = z.infer<typeof fosterSchema>;

// ============================================
// DONATION
// ============================================

export const donationSchema = z.object({
  amount: z
    .number({ error: "Please enter a valid amount" })
    .min(1, "Minimum donation is $1")
    .max(100000, "For donations over $100,000, please contact us"),
  email: emailSchema,
  name: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  coverFees: z.boolean().optional(),
  message: messageOptionalSchema,
  campaignId: z.string().optional(),
  isRecurring: z.boolean().optional(),
  interval: z.enum(["month", "year"]).optional(),
});

export type DonationFormData = z.infer<typeof donationSchema>;

// ============================================
// TRIBUTE / MEMORIAL DONATION
// ============================================

export const tributeSchema = z.object({
  tributeType: z.enum(["memorial", "honor"], {
    error: "Please select tribute type" }),
  honoreeType: z.enum(["pet", "person"], {
    error: "Please select who you're honoring" }),
  honoreeName: z.string().min(1, "Please enter a name"),
  message: messageOptionalSchema,
  notifyRecipient: z.boolean().optional(),
  recipientName: z.string().optional(),
  recipientEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  donorName: nameSchema,
  donorEmail: emailSchema,
  amount: z
    .number({ error: "Please enter a valid amount" })
    .min(5, "Minimum tribute donation is $5")
    .max(100000, "For donations over $100,000, please contact us"),
  isAnonymous: z.boolean().optional(),
});

export type TributeFormData = z.infer<typeof tributeSchema>;

// ============================================
// DEPOSIT ASSISTANCE
// ============================================

export const depositAssistanceSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  petName: z.string().min(1, "Pet name is required"),
  petSpecies: z.enum(["cat", "dog", "other"], {
    error: "Please select pet type" }),
  landlordName: z.string().min(1, "Landlord/property manager name is required"),
  depositAmount: z
    .number({ error: "Please enter a valid amount" })
    .min(50, "Minimum request is $50")
    .max(2000, "Maximum request is $2,000"),
  monthlyIncome: z
    .number({ error: "Please enter your monthly income" })
    .min(0, "Income cannot be negative")
    .optional(),
  situation: messageSchema,
  canRepay: z.boolean(),
});

export type DepositAssistanceFormData = z.infer<typeof depositAssistanceSchema>;

// ============================================
// VET FUND REQUEST
// ============================================

export const vetFundSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  petName: z.string().min(1, "Pet name is required"),
  petSpecies: z.enum(["cat", "dog", "other"], {
    error: "Please select pet type" }),
  vetClinic: z.string().min(1, "Vet clinic name is required"),
  diagnosis: z.string().min(1, "Please describe the diagnosis"),
  estimatedCost: z
    .number({ error: "Please enter the estimated cost" })
    .min(50, "Minimum request is $50")
    .max(5000, "Maximum request is $5,000. For higher amounts, please contact us."),
  isEmergency: z.boolean(),
  situation: messageSchema,
  hasAppliedElsewhere: z.boolean().optional(),
  otherFunding: z.string().optional(),
});

export type VetFundFormData = z.infer<typeof vetFundSchema>;

// ============================================
// SURRENDER PREVENTION
// ============================================

export const surrenderPreventionSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneOptionalSchema,
  petInfo: z.string().min(1, "Please describe your pet(s)"),
  reason: z.enum([
    "housing",
    "financial",
    "behavioral",
    "medical",
    "moving",
    "allergies",
    "other",
  ], {
    error: "Please select the main reason" }),
  situation: messageSchema,
  timeline: z.enum(["immediate", "week", "month", "flexible"], {
    error: "Please select your timeline" }),
  assistanceNeeded: z.array(z.string()).optional(),
});

export type SurrenderPreventionFormData = z.infer<typeof surrenderPreventionSchema>;

// ============================================
// LOST & FOUND
// ============================================

export const lostFoundSchema = z.object({
  type: z.enum(["lost", "found"], {
    error: "Please select lost or found" }),
  species: z.enum(["cat", "dog", "other"], {
    error: "Please select the animal type" }),
  breed: z.string().optional(),
  color: z.string().min(1, "Color/markings are required"),
  name: z.string().optional(),
  description: messageSchema,
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  contactName: nameSchema,
  contactPhone: phoneSchema,
  contactEmail: emailSchema,
  microchipId: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

export type LostFoundFormData = z.infer<typeof lostFoundSchema>;

// ============================================
// COLONY SUBMISSION
// ============================================

export const colonySubmissionSchema = z.object({
  colonyName: z.string().optional(),
  locationDescription: z.string().min(1, "Location description is required"),
  address: z.string().optional(),
  latitude: z
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude")
    .optional()
    .nullable(),
  longitude: z
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude")
    .optional()
    .nullable(),
  estimatedCats: z
    .number({ error: "Please enter a number" })
    .min(1, "Must be at least 1 cat")
    .max(500, "For very large colonies, please contact us directly"),
  tnrStatus: z.enum(["all", "partial", "none", "unknown"]).optional(),
  hasCaretaker: z.boolean().optional(),
  caretakerContact: z.string().optional(),
  feedingSchedule: z.string().optional(),
  urgentNeeds: z.string().optional(),
  additionalInfo: z.string().optional(),
  submitterName: nameSchema,
  submitterEmail: emailSchema,
  submitterPhone: phoneOptionalSchema,
  submitterRelation: z.enum([
    "observer",
    "caretaker",
    "neighbor",
    "property-owner",
    "other",
  ]).optional(),
});

export type ColonySubmissionFormData = z.infer<typeof colonySubmissionSchema>;

// ============================================
// SPONSOR INQUIRY
// ============================================

export const sponsorInquirySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneOptionalSchema,
  tier: z.string().optional(),
  interests: z.array(z.string()).optional(),
  message: messageOptionalSchema,
});

export type SponsorInquiryFormData = z.infer<typeof sponsorInquirySchema>;

// ============================================
// EVENT SIGNUP
// ============================================

export const eventSignupSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  eventName: z.string().min(1, "Event name is required"),
  name: nameSchema,
  email: emailSchema,
  phone: phoneOptionalSchema,
  guests: z
    .number({ error: "Please enter number of guests" })
    .min(1, "At least 1 guest required")
    .max(10, "Maximum 10 guests per registration"),
  notes: z.string().optional(),
});

export type EventSignupFormData = z.infer<typeof eventSignupSchema>;

// ============================================
// CITY REQUEST
// ============================================

export const cityRequestSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  email: emailSchema,
  interest: z.enum(["just-interested", "want-to-lead", "know-someone"], {
    error: "Please select your interest level" }),
  message: z.string().optional(),
});

export type CityRequestFormData = z.infer<typeof cityRequestSchema>;

// ============================================
// CITY LEAD APPLICATION
// ============================================

export const cityLeadSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  experience: messageSchema,
  availability: z.string().min(1, "Please describe your availability"),
  motivation: messageSchema,
  linkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type CityLeadFormData = z.infer<typeof cityLeadSchema>;

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

/**
 * Validate form data and return errors
 * @returns Object with field errors or null if valid
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const error of result.error.issues) {
    const path = error.path.join(".");
    if (!errors[path]) {
      errors[path] = error.message;
    }
  }

  return { success: false, errors };
}

/**
 * Get error message for a specific field
 */
export function getFieldError(
  errors: Record<string, string> | undefined,
  field: string
): string | undefined {
  return errors?.[field];
}

/**
 * Check if a field has an error
 */
export function hasFieldError(
  errors: Record<string, string> | undefined,
  field: string
): boolean {
  return !!errors?.[field];
}
