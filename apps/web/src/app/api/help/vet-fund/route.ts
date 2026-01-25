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
      vetClinic,
      diagnosis,
      estimatedCost,
      situation,
      proofOfIncome,
    } = body;

    if (!name || !email || !petName || !diagnosis || !estimatedCost) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
        estimated_cost: parseInt(estimatedCost) * 100, // Convert to cents
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

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to requestor

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
