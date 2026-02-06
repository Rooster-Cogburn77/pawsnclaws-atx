import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { depositAssistanceSchema } from "@/lib/validations";
import { getCityBySlug } from "@/config/cities";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = depositAssistanceSchema.safeParse(body);
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
      landlordName,
      depositAmount,
      monthlyIncome,
      canRepay,
      situation,
    } = result.data;
    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);

    const amount = depositAmount;
    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("deposit_assistance").insert({
        applicant_name: name,
        applicant_email: email,
        applicant_phone: phone,
        pet_name: petName,
        pet_species: petSpecies,
        landlord_name: landlordName || null,
        deposit_amount: amount * 100, // Convert to cents
        status: "pending",
        city: cityConfig.slug,
        notes: JSON.stringify({
          monthlyIncome: monthlyIncome ? monthlyIncome * 100 : null,
          canRepay,
          situation,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      console.log("Deposit assistance application received (DB not configured):", {
        name,
        email,
        petName,
        depositAmount,
      });
    }

    // Send confirmation email to applicant
    await emails.sendDepositConfirmation(email, name, amount);

    // Send notification to city admin (with sanitized content)
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] [Deposit Assistance] $${amount} request from ${escapeHtml(name)}`,
      html: emailTemplates.base(`
        <h2>New Deposit Assistance Application</h2>
        <p><strong>Applicant:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Name:</strong> ${escapeHtml(petName)}</p>
        <p><strong>Pet Species:</strong> ${escapeHtml(petSpecies || "Not specified")}</p>
        <p><strong>Deposit Amount Requested:</strong> $${amount.toLocaleString()}</p>
        <p><strong>Monthly Income:</strong> ${monthlyIncome ? `$${monthlyIncome.toLocaleString()}` : "Not provided"}</p>
        <p><strong>Landlord:</strong> ${escapeHtml(landlordName || "Not provided")}</p>
        <p><strong>Can Repay:</strong> ${canRepay ? "Yes" : "No"}</p>
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
    console.error("Deposit assistance error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
