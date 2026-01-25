import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Update subscriber status
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed" })
      .eq("email", normalizedEmail);

    if (error) {
      console.error("Unsubscribe error:", error);
      // Even if update fails (e.g., email not found), return success
      // to prevent email enumeration
    }

    return NextResponse.json({
      message: "You've been unsubscribed from our newsletter.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    );
  }
}
