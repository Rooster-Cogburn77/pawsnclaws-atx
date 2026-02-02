import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { vetFundSchema } from "@/lib/validations";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = vetFundSchema.safeParse(body);
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
      petName,
      petSpecies,
      vetClinic,
      diagnosis,
      estimatedCost,
      situation,
      isEmergency,
      hasAppliedElsewhere,
      otherFunding,
    } = result.data;

    const cost = estimatedCost;
    const supabase = createServerSupabase();

    // Create vet fund request
    try {
      const result = await supabase.from("vet_fund_requests").insert({
        requestor_name: name,
        requestor_email: email,
        requestor_phone: phone,
        pet_name: petName,
        pet_species: petSpecies,
        vet_clinic: vetClinic,
        diagnosis: diagnosis,
        estimated_cost: cost * 100, // Convert to cents
        notes: JSON.stringify({
          situation,
          hasAppliedElsewhere,
          otherFunding,
          isEmergency,
        }),
        status: "pending",
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      // Log anyway if DB not set up
      console.log("Vet fund request received (DB not configured):", {
        name,
        email,
        petName,
        estimatedCost,
      });
    }

    // Send confirmation email to requestor
    await emails.sendVetFundConfirmation(email, name, petName);

    // Send notification email to admin (with sanitized content)
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `${isEmergency ? "[EMERGENCY] " : ""}[Vet Fund] $${cost} request for ${escapeHtml(petName)}`,
      html: emailTemplates.base(`
        ${isEmergency ? '<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #dc2626;">EMERGENCY REQUEST</strong></div>' : ''}
        <h2>Emergency Vet Fund Request</h2>
        <p><strong>Requestor:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Name:</strong> ${escapeHtml(petName)}</p>
        <p><strong>Species:</strong> ${escapeHtml(petSpecies || "Not specified")}</p>
        <p><strong>Vet Clinic:</strong> ${escapeHtml(vetClinic)}</p>
        <p><strong>Diagnosis:</strong> ${sanitizeForHtml(diagnosis, { preserveNewlines: true })}</p>
        <p><strong>Estimated Cost:</strong> $${cost.toLocaleString()}</p>
        <p><strong>Applied Elsewhere:</strong> ${hasAppliedElsewhere ? "Yes" : "No"}</p>
        ${otherFunding ? `<p><strong>Other Funding:</strong> ${escapeHtml(otherFunding)}</p>` : ''}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Situation:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${sanitizeForHtml(situation, { preserveNewlines: true })}
        </div>
        <a href="mailto:${escapeHtml(email)}" class="button" style="margin-top: 20px;">Contact ${escapeHtml(name)}</a>
      `),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Application received",
    });
  } catch (error) {
    console.error("Vet fund request error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
