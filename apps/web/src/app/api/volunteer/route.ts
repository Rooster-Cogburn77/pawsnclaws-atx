import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { z } from "zod";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

// Volunteer signup schema (different from volunteer application schema)
const volunteerSignupSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interests: z.array(z.string()).optional(),
  availability: z.string().optional(),
  experience: z.string().optional(),
  hasVehicle: z.boolean().optional(),
  canFoster: z.boolean().optional(),
  message: z.string().max(5000).optional(),
});

// Map interest IDs to readable names
const interestLabels: Record<string, string> = {
  "colony-care": "Colony Care",
  "tnr-transport": "TNR Transport",
  "foster": "Fostering",
  "events": "Event Support",
  "admin": "Administrative",
  "outreach": "Community Outreach",
  "photography": "Pet Photography",
  "social-media": "Social Media",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = volunteerSignupSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const error of result.error.issues) {
        const path = error.path.join(".");
        if (!errors[path]) {
          errors[path] = error.message;
        }
      }
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      interests,
      availability,
      experience,
      hasVehicle,
      canFoster,
      message,
    } = result.data;

    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("volunteers").insert({
        name,
        email,
        phone: phone || null,
        skills: interests || [],
        availability: availability || null,
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        notes: JSON.stringify({
          experience,
          hasVehicle,
          canFoster,
          message,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      console.log("Volunteer signup received (DB not configured):", {
        name,
        email,
        interests,
      });
    }

    // Convert interest IDs to readable labels
    const roleLabels = (interests || []).map(
      (id: string) => interestLabels[id] || id
    );

    // Send welcome email to volunteer
    await emails.sendVolunteerWelcome(email, name, roleLabels);

    // Send notification to admin (with sanitized content)
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[New Volunteer] ${escapeHtml(name)} signed up`,
      html: emailTemplates.base(`
        <h2>New Volunteer Signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Interests:</strong> ${roleLabels.map(r => escapeHtml(r)).join(", ") || "None selected"}</p>
        <p><strong>Availability:</strong> ${escapeHtml(availability || "Not specified")}</p>
        <p><strong>Has Vehicle:</strong> ${hasVehicle ? "Yes" : "No"}</p>
        <p><strong>Interested in Fostering:</strong> ${canFoster ? "Yes" : "No"}</p>
        ${experience ? `<p><strong>Experience:</strong> ${sanitizeForHtml(experience, { preserveNewlines: true })}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${sanitizeForHtml(message, { preserveNewlines: true })}</p>` : ""}
        <a href="mailto:${escapeHtml(email)}" class="button">Contact ${escapeHtml(name)}</a>
      `),
    });

    return NextResponse.json({
      success: true,
      message: "Volunteer signup received",
    });
  } catch (error) {
    console.error("Volunteer signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
