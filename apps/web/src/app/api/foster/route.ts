import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { getCityBySlug } from "@/config/cities";
import { z } from "zod";

// Foster application schema
const fosterApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  fosterTypes: z.array(z.string()).min(1, "Please select at least one foster type"),
  hasOtherPets: z.string().optional(),
  hasKids: z.string().optional(),
  housingType: z.string().optional(),
  experience: z.string().max(5000).optional(),
  whyFoster: z.string().max(5000).optional(),
  city: z.string().optional(),
});

// Map foster type IDs to readable names
const fosterTypeLabels: Record<string, string> = {
  "short-term": "Short-Term Foster",
  "medical": "Medical Foster",
  "socialization": "Socialization Foster",
  "bottle-baby": "Bottle Baby Foster",
  "hospice": "Hospice Foster",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = fosterApplicationSchema.safeParse(body);
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
      fosterTypes,
      hasOtherPets,
      hasKids,
      housingType,
      experience,
      whyFoster,
      city,
    } = result.data;

    const cityConfig = getCityBySlug(city);
    const supabase = createServerSupabase();

    try {
      const dbResult = await supabase.from("volunteers").insert({
        name,
        email,
        phone,
        skills: ["foster", ...(fosterTypes || [])],
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        city: cityConfig.slug,
        notes: JSON.stringify({
          applicationType: "foster",
          fosterTypes,
          hasOtherPets,
          hasKids,
          housingType,
          experience,
          whyFoster,
        }),
      });

      if (dbResult.error) {
        console.error("Supabase error:", dbResult.error);
      }
    } catch {
      console.log("Foster application received (DB not configured):", {
        name,
        email,
        fosterTypes,
      });
    }

    // Get readable foster types
    const fosterTypesReadable = (fosterTypes || [])
      .map((type: string) => fosterTypeLabels[type] || type)
      .join(", ");

    // Send welcome email with next steps
    await emails.sendFosterWelcome(email, name, fosterTypesReadable || "General Foster");

    // Send notification to foster coordinator (with sanitized content)
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] [New Foster Application] ${escapeHtml(name)}`,
      html: emailTemplates.base(`
        <h2>New Foster Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Foster Types:</strong> ${escapeHtml(fosterTypesReadable || "None specified")}</p>
        <p><strong>Housing:</strong> ${escapeHtml(housingType || "Not specified")}</p>
        <p><strong>Other Pets:</strong> ${escapeHtml(hasOtherPets || "Not specified")}</p>
        <p><strong>Children:</strong> ${escapeHtml(hasKids || "Not specified")}</p>
        ${experience ? `<p><strong>Experience:</strong> ${sanitizeForHtml(experience, { preserveNewlines: true })}</p>` : ""}
        ${whyFoster ? `<p><strong>Why They Want to Foster:</strong></p><div style="background: #f9fafb; padding: 15px; border-radius: 8px;">${sanitizeForHtml(whyFoster, { preserveNewlines: true })}</div>` : ""}
        <a href="mailto:${escapeHtml(email)}" class="button">Contact ${escapeHtml(name)}</a>
      `),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Foster application received",
    });
  } catch (error) {
    console.error("Foster application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
