import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

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

    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("deposit_assistance").insert({
        applicant_name: name,
        applicant_email: email,
        applicant_phone: phone,
        pet_name: petName,
        pet_species: petSpecies,
        landlord_name: landlordName || null,
        deposit_amount: parseInt(depositAmount) * 100, // Convert to cents
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

    // TODO: Send confirmation email
    // TODO: Send notification to admin

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
