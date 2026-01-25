import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { sendEmail, emailTemplates } from "@/lib/email";

const VOLUNTEER_COORDINATOR_EMAIL = process.env.VOLUNTEER_COORDINATOR_EMAIL || process.env.ADMIN_EMAIL || "coordinator@pawsnclaws.org";

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
    } = body;

    if (!name || !phone || !petInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    const reasonText = reasons.includes("other") && otherReason
      ? [...reasons.filter((r: string) => r !== "other"), otherReason].join(", ")
      : reasons.join(", ");

    const isUrgent = timeline === "urgent";

    try {
      const result = await supabase.from("surrender_prevention").insert({
        contact_name: name,
        contact_email: email || null,
        contact_phone: phone,
        pet_info: petInfo,
        reason: reasonText,
        assistance_needed: whatWouldHelp || null,
        status: "new",
        notes: JSON.stringify({
          timeline,
          triedOptions,
          rawReasons: reasons,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      console.log("Surrender prevention case received (DB not configured):", {
        name,
        phone,
        reasons,
        timeline,
      });
    }

    // Get readable reason labels
    const readableReasons = (reasons || [])
      .map((r: string) => reasonLabels[r] || r)
      .join(", ");

    // Send alert email to volunteer coordinator
    await sendEmail({
      to: VOLUNTEER_COORDINATOR_EMAIL,
      subject: `${isUrgent ? "[URGENT] " : ""}Surrender Prevention Case: ${name}`,
      html: emailTemplates.base(`
        ${isUrgent ? '<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #dc2626;">URGENT CASE</strong> - Person needs help within 48 hours</div>' : ''}
        <h2>Surrender Prevention Case</h2>
        <p><strong>Contact:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Info:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${petInfo.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Reasons:</strong> ${readableReasons || reasonText}</p>
        <p><strong>Timeline:</strong> ${timeline === "urgent" ? "Within 48 hours" : timeline === "soon" ? "Within a week" : "Exploring options"}</p>
        ${whatWouldHelp ? `<p><strong>What Would Help:</strong> ${whatWouldHelp}</p>` : ""}
        ${triedOptions ? `<p><strong>Already Tried:</strong> ${triedOptions}</p>` : ""}
        <a href="tel:${phone.replace(/\D/g, '')}" class="button">Call ${name}</a>
      `),
    });

    // Send resources email to person (if email provided)
    if (email) {
      await sendEmail({
        to: email,
        subject: "Resources to Help Keep Your Pet - PawsNClaws ATX",
        html: emailTemplates.base(`
          <h2>We're Here to Help, ${name}</h2>
          <p>We received your request and want you to know: <strong>you're not alone, and there are options</strong>.</p>
          <p>A volunteer coordinator will reach out ${isUrgent ? "within 24 hours" : "within a few days"} to discuss your situation.</p>

          <h3>In the Meantime, Here Are Some Resources:</h3>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Pet Food Assistance</h4>
            <p>Free pet food available at <a href="https://pawsnclaws.org/food-stations">our food stations</a>.</p>

            <h4>Emergency Vet Care</h4>
            <p>If cost is a barrier, see our <a href="https://pawsnclaws.org/help/vet-fund">Emergency Vet Fund</a>.</p>

            <h4>Housing Issues</h4>
            <p>Check out our <a href="https://pawsnclaws.org/help/deposit-assistance">Pet Deposit Assistance</a> program.</p>

            <h4>Behavioral Help</h4>
            <p>Free training resources at <a href="https://pawsnclaws.org/resources">our resources page</a>.</p>
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
