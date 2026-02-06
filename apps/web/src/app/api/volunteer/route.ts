import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { getCityBySlug } from "@/config/cities";
import { volunteerSchema } from "@/lib/validations";

// Map role IDs to readable names
const roleLabelsMap: Record<string, string> = {
  "colony-feeder": "Colony Feeder",
  "tnr-helper": "TNR Volunteer",
  "foster": "Foster Parent",
  "transport": "Transport Driver",
  "events": "Event Volunteer",
  "admin": "Admin Support",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = volunteerSchema.safeParse(body);
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
      roles,
      availability,
      experience,
      hasVehicle,
      canFoster,
      message,
    } = result.data;

    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);
    const supabase = createServerSupabase();

    try {
      const dbResult = await supabase.from("volunteers").insert({
        name,
        email,
        phone: phone || null,
        skills: roles || [],
        availability: availability || null,
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        city: cityConfig.slug,
        notes: JSON.stringify({
          experience,
          hasVehicle,
          canFoster,
          message,
        }),
      });

      if (dbResult.error) {
        console.error("Supabase error:", dbResult.error);
      }
    } catch {
      console.log("Volunteer signup received (DB not configured):", {
        roles,
      });
    }

    // Convert role IDs to readable labels
    const roleLabels = (roles || []).map(
      (id: string) => roleLabelsMap[id] || id
    );

    // Send welcome email to volunteer
    await emails.sendVolunteerWelcome(email, name, roleLabels);

    // Send notification to admin (with sanitized content)
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] [New Volunteer] ${escapeHtml(name)} signed up`,
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
