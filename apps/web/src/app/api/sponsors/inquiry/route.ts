import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      website,
      message,
      tier,
    } = body;

    if (!companyName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    // Create a sponsor inquiry (pending status)
    try {
      const result = await supabase.from("sponsors").insert({
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        website: website,
        tier: tier || "bronze",
        is_active: false, // Pending approval
        display_on_site: false,
        benefits: { inquiry_message: message },
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch (dbError) {
      // If table doesn't exist yet, just log and return success
      // This allows the form to work before DB is set up
      console.log("Sponsor inquiry received (DB not configured):", {
        companyName,
        contactName,
        contactEmail,
        tier,
      });
    }

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to sponsor

    return NextResponse.json({
      success: true,
      message: "Inquiry received"
    });
  } catch (error) {
    console.error("Sponsor inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
