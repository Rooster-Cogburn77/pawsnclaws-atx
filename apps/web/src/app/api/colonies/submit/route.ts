import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails } from "@/lib/email";
import { colonySubmissionSchema } from "@/lib/validations";
import { getCityBySlug } from "@/config/cities";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = colonySubmissionSchema.safeParse(body);
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

    const data = result.data;
    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);

    const supabase = createServerSupabase();

    try {
      // Save to Supabase if connected
      await supabase.from("colony_submissions").insert({
        colony_name: data.colonyName || "Unnamed Colony",
        location_description: data.locationDescription,
        address: data.address,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        estimated_cats: data.estimatedCats,
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
        city: cityConfig.slug,
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

    // Send notification email to city admin (sanitization handled in email templates)
    await emails.sendColonySubmissionNotification(cityConfig.email, {
      colonyName: data.colonyName || "Unnamed Colony",
      location: data.locationDescription,
      estimatedCats: String(data.estimatedCats),
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
