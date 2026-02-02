import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails } from "@/lib/email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.locationDescription || !data.estimatedCats || !data.submitterName || !data.submitterEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.submitterEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    try {
      // Save to Supabase if connected
      await supabase.from("colony_submissions").insert({
        colony_name: data.colonyName || "Unnamed Colony",
        location_description: data.locationDescription,
        address: data.address,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        estimated_cats: parseInt(data.estimatedCats),
        tnr_status: data.tnrStatus || "unknown",
        has_caretaker: data.hasCaretaker || false,
        caretaker_contact: data.caretakerContact,
        feeding_schedule: data.feedingSchedule,
        urgent_needs: data.urgentNeeds,
        additional_info: data.additionalInfo,
        submitter_name: data.submitterName,
        submitter_email: data.submitterEmail,
        submitter_phone: data.submitterPhone,
        submitter_relation: data.submitterRelation,
        status: "pending",
      });
    } catch {
      // Log for now if DB not configured
      console.log("Colony submission received:", {
        colonyName: data.colonyName,
        location: data.locationDescription,
        cats: data.estimatedCats,
        submitter: data.submitterEmail,
        urgentNeeds: data.urgentNeeds,
      });
    }

    // Send notification email to admin
    await emails.sendColonySubmissionNotification(ADMIN_EMAIL, {
      colonyName: data.colonyName || "Unnamed Colony",
      location: data.locationDescription,
      estimatedCats: data.estimatedCats,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      urgentNeeds: data.urgentNeeds,
    });

    return NextResponse.json({
      success: true,
      message: "Colony submitted for review",
    });
  } catch (error) {
    console.error("Colony submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit colony" },
      { status: 500 }
    );
  }
}
