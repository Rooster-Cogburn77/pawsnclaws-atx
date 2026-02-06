import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml, sanitizeUrl } from "@/lib/sanitize";
import { sponsorInquirySchema } from "@/lib/validations";
import { getCityBySlug } from "@/config/cities";

const tierLabels: Record<string, string> = {
  bronze: "Bronze ($500/year)",
  silver: "Silver ($1,000/year)",
  gold: "Gold ($2,500/year)",
  platinum: "Platinum ($5,000/year)",
  champion: "Champion ($10,000+/year)",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = sponsorInquirySchema.safeParse(body);
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
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      tier,
      message,
    } = result.data;

    const website = body.website;
    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);

    const supabase = createServerSupabase();

    // Create a sponsor inquiry (pending status)
    try {
      const result = await supabase.from("sponsors").insert({
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        website: website,
        tier: tier || "bronze",
        is_active: false, // Pending approval
        display_on_site: false,
        benefits: { inquiry_message: message },
        city: cityConfig.slug,
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      // If table doesn't exist yet, just log and return success
      // This allows the form to work before DB is set up
      console.log("Sponsor inquiry received (DB not configured):", {
        companyName,
        tier,
      });
    }

    // Send confirmation email to sponsor
    await emails.sendSponsorConfirmation(contactEmail, companyName);

    // Send notification email to city admin (with sanitized content)
    const sanitizedWebsite = website ? sanitizeUrl(website) : "";
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] [New Sponsor Inquiry] ${escapeHtml(companyName)} - ${tierLabels[tier || "bronze"] || tier}`,
      html: emailTemplates.base(`
        <h2>New Sponsor Partnership Inquiry</h2>
        <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Website:</strong> ${sanitizedWebsite ? `<a href="${sanitizedWebsite}">${escapeHtml(website)}</a>` : "Not provided"}</p>
        <p><strong>Interested Tier:</strong> ${tierLabels[tier || "bronze"] || escapeHtml(tier || "Not specified")}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contactEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(contactPhone || "Not provided")}</p>
        ${message ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${sanitizeForHtml(message, { preserveNewlines: true })}
        </div>
        ` : ''}
        <a href="mailto:${escapeHtml(contactEmail)}" class="button" style="margin-top: 20px;">Contact ${escapeHtml(contactName)}</a>
      `),
      replyTo: contactEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received"
    });
  } catch (error) {
    console.error("Sponsor inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
