import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      fosterType,
      hasOtherPets,
      hasKids,
      housingType,
      experience,
      whyFoster,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("volunteers").insert({
        name,
        email,
        phone,
        skills: ["foster", ...(fosterType || [])],
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        notes: JSON.stringify({
          applicationType: "foster",
          fosterTypes: fosterType,
          hasOtherPets,
          hasKids,
          housingType,
          experience,
          whyFoster,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      console.log("Foster application received (DB not configured):", {
        name,
        email,
        fosterType,
      });
    }

    // TODO: Send welcome email with next steps
    // TODO: Send notification to foster coordinator

    return NextResponse.json({
      success: true,
      message: "Foster application received",
    });
  } catch (error) {
    console.error("Foster application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
