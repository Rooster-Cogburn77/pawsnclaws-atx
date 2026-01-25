import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      species,
      breed,
      name,
      color,
      description,
      location,
      contactName,
      contactPhone,
      contactEmail,
      microchipId,
    } = body;

    if (!type || !species || !color || !description || !location || !contactName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    const isLost = type === "lost";

    try {
      const result = await supabase.from("lost_found").insert({
        type,
        species,
        breed: breed || null,
        name: name || null,
        color,
        description,
        location_last_seen: isLost ? location : null,
        location_found: !isLost ? location : null,
        contact_name: contactName,
        contact_phone: contactPhone || null,
        contact_email: contactEmail || null,
        microchip_id: microchipId || null,
        status: "active",
        photos: [],
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      console.log("Lost/found report received (DB not configured):", {
        type,
        species,
        location,
        contactName,
      });
    }

    // TODO: Send notification email

    return NextResponse.json({
      success: true,
      message: "Report submitted",
    });
  } catch (error) {
    console.error("Lost/found report error:", error);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("lost_found")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ listings: [] });
    }

    return NextResponse.json({ listings: data || [] });
  } catch (error) {
    console.error("Lost/found fetch error:", error);
    return NextResponse.json({ listings: [] });
  }
}
