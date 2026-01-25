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
      landlordName,
      depositAmount,
      monthlyRent,
      canRepay,
      situation,
    } = body;

    if (!name || !email || !phone || !petName || !depositAmount || !situation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amount = parseInt(depositAmount);
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
        notes: JSON.stringify({
          monthlyRent: monthlyRent ? parseInt(monthlyRent) * 100 : null,
          canRepay,
          situation,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      console.log("Deposit assistance application received (DB not configured):", {
        name,
        email,
        petName,
        depositAmount,
      });
    }

    // Send confirmation email to applicant
    await emails.sendDepositConfirmation(email, name, amount);

    // Send notification to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[Deposit Assistance] $${amount} request from ${name}`,
      html: emailTemplates.base(`
        <h2>New Deposit Assistance Application</h2>
        <p><strong>Applicant:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Pet Name:</strong> ${petName}</p>
        <p><strong>Pet Species:</strong> ${petSpecies || "Not specified"}</p>
        <p><strong>Deposit Amount Requested:</strong> $${amount.toLocaleString()}</p>
        <p><strong>Monthly Rent:</strong> ${monthlyRent ? `$${parseInt(monthlyRent).toLocaleString()}` : "Not provided"}</p>
        <p><strong>Landlord:</strong> ${landlordName || "Not provided"}</p>
        <p><strong>Can Repay:</strong> ${canRepay ? "Yes" : "No"}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Situation:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${situation.replace(/\n/g, '<br>')}
        </div>
        <a href="mailto:${email}" class="button" style="margin-top: 20px;">Contact ${name}</a>
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
