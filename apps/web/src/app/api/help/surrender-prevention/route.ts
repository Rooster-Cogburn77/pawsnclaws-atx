import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

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

    try {
      const result = await supabase.from("surrender_prevention").insert({
        contact_name: name,
        contact_email: email || null,
        contact_phone: phone,
        pet_info: petInfo,
        reason: reasonText,
        assistance_needed: whatWouldHelp || null,
        status: timeline === "urgent" ? "new" : "new",
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

    // TODO: Send alert email to volunteer coordinator (especially if urgent)
    // TODO: Send resources email to person

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
