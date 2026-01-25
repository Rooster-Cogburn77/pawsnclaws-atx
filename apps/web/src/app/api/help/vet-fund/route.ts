import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
      proofOfIncome,
      isEmergency,
    } = body;

    if (!name || !email || !petName || !diagnosis || !estimatedCost) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cost = parseInt(estimatedCost);
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
        proof_of_income: proofOfIncome,
        notes: situation,
        status: "pending",
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
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

    // Send notification email to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `${isEmergency ? "[EMERGENCY] " : ""}[Vet Fund] $${cost} request for ${petName}`,
      html: emailTemplates.base(`
        ${isEmergency ? '<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #dc2626;">EMERGENCY REQUEST</strong></div>' : ''}
        <h2>Emergency Vet Fund Request</h2>
        <p><strong>Requestor:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Name:</strong> ${petName}</p>
        <p><strong>Species:</strong> ${petSpecies || "Not specified"}</p>
        <p><strong>Vet Clinic:</strong> ${vetClinic || "Not specified"}</p>
        <p><strong>Diagnosis:</strong> ${diagnosis}</p>
        <p><strong>Estimated Cost:</strong> $${cost.toLocaleString()}</p>
        <p><strong>Proof of Income:</strong> ${proofOfIncome || "Not provided"}</p>
        ${situation ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Situation:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${situation.replace(/\n/g, '<br>')}
        </div>
        ` : ''}
        <a href="mailto:${email}" class="button" style="margin-top: 20px;">Contact ${name}</a>
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
