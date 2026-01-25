import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      interests,
      availability,
      experience,
      hasVehicle,
      canFoster,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("volunteers").insert({
        name,
        email,
        phone: phone || null,
        skills: interests || [],
        availability: availability || null,
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        notes: JSON.stringify({
          experience,
          hasVehicle,
          canFoster,
          message,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      console.log("Volunteer signup received (DB not configured):", {
        name,
        email,
        interests,
      });
    }

    // TODO: Send welcome email
    // TODO: Send notification to admin

    return NextResponse.json({
      success: true,
      message: "Volunteer signup received",
    });
  } catch (error) {
    console.error("Volunteer signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
