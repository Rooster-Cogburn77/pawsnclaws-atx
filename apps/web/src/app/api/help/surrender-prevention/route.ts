import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml, sanitizePhone } from "@/lib/sanitize";
import { surrenderPreventionSchema } from "@/lib/validations";
import { getCityBySlug } from "@/config/cities";

// Map reason IDs to readable labels
const reasonLabels: Record<string, string> = {
  "housing": "Housing Issues",
  "financial": "Financial Hardship",
  "behavioral": "Pet Behavioral Problems",
  "medical": "Owner Medical Issues",
  "allergies": "Allergies",
  "time": "Not Enough Time",
  "moving": "Moving/Relocation",
  "other": "Other",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = surrenderPreventionSchema.safeParse(body);
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
      petInfo,
      reasons,
      otherReason,
      timeline,
      whatWouldHelp,
      triedOptions,
    } = result.data;
    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);

    // Map reasons to readable text
    const reasonTexts = (reasons || []).map(r => reasonLabels[r] || r);
    const reasonText = reasonTexts.join(", ") + (otherReason ? ` (${otherReason})` : "");

    const supabase = createServerSupabase();

    const isUrgent = timeline === "immediate";

    try {
      const dbResult = await supabase.from("surrender_prevention").insert({
        contact_name: name,
        contact_email: email || null,
        contact_phone: phone,
        pet_info: petInfo,
        reason: reasonText,
        assistance_needed: whatWouldHelp || null,
        status: "new",
        city: cityConfig.slug,
        notes: JSON.stringify({
          timeline,
          triedOptions,
          rawReasons: reasons,
          otherReason,
        }),
      });

      if (dbResult.error) {
        console.error("Supabase error:", dbResult.error);
      }
    } catch {
      console.log("Surrender prevention case received (DB not configured):", {
        reasons,
        timeline,
      });
    }

    // Readable reasons
    const readableReason = reasonText;

    // Send alert email to city coordinator (with sanitized content)
    const sanitizedPhone = sanitizePhone(phone || "");
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] ${isUrgent ? "[URGENT] " : ""}Surrender Prevention Case: ${escapeHtml(name)}`,
      html: emailTemplates.base(`
        ${isUrgent ? '<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #dc2626;">URGENT CASE</strong> - Person needs help within 48 hours</div>' : ''}
        <h2>Surrender Prevention Case</h2>
        <p><strong>Contact:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Info:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${sanitizeForHtml(petInfo, { preserveNewlines: true })}
        </div>
        <p><strong>Reasons:</strong> ${escapeHtml(readableReason)}</p>
        <p><strong>Timeline:</strong> ${timeline === "urgent" ? "Within 48 hours" : timeline === "soon" ? "Within 2 weeks" : timeline === "month" ? "Within a month" : "Flexible"}</p>
        ${whatWouldHelp ? `<p><strong>What Would Help:</strong> ${escapeHtml(whatWouldHelp)}</p>` : ""}
        ${triedOptions ? `<p><strong>Already Tried:</strong> ${sanitizeForHtml(triedOptions, { preserveNewlines: true })}</p>` : ""}
        <a href="tel:${sanitizedPhone.replace(/\D/g, '')}" class="button">Call ${escapeHtml(name)}</a>
      `),
    });

    // Send resources email to person (if email provided)
    if (email) {
      await sendEmail({
        to: email,
        subject: "Resources to Help Keep Your Pet - PawsNClaws ATX",
        html: emailTemplates.base(`
          <h2>We're Here to Help, ${escapeHtml(name)}</h2>
          <p>We received your request and want you to know: <strong>you're not alone, and there are options</strong>.</p>
          <p>A volunteer coordinator will reach out ${isUrgent ? "within 24 hours" : "within a few days"} to discuss your situation.</p>

          <h3>In the Meantime, Here Are Some Resources:</h3>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Pet Food Assistance</h4>
            <p>Free pet food available at <a href="https://pawsandclawsatx.com/food-stations">our food stations</a>.</p>

            <h4>Emergency Vet Care</h4>
            <p>If cost is a barrier, see our <a href="https://pawsandclawsatx.com/help/vet-fund">Emergency Vet Fund</a>.</p>

            <h4>Housing Issues</h4>
            <p>Check out our <a href="https://pawsandclawsatx.com/help/deposit-assistance">Pet Deposit Assistance</a> program.</p>

            <h4>Behavioral Help</h4>
            <p>Free training resources at <a href="https://pawsandclawsatx.com/resources">our resources page</a>.</p>
          </div>

          <p style="color: #6b7280;">
            If this is truly urgent, call 211 for additional local resources, or reach us at the number on our website.
          </p>
        `),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Case submitted",
    });
  } catch (error) {
    console.error("Surrender prevention error:", error);
    return NextResponse.json(
      { error: "Failed to submit case" },
      { status: 500 }
    );
  }
}
