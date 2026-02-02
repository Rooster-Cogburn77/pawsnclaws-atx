import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { emails } from "@/lib/email";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    const normalizedEmail = result.data.email.toLowerCase().trim();

    // Store in Supabase
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: normalizedEmail,
      subscribed_at: new Date().toISOString(),
      source: "website_footer",
      status: "active",
    });

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 }
        );
      }
      throw error;
    }

    // Send welcome email
    await emails.sendNewsletterWelcome(normalizedEmail);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to get subscriber count
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("status", "active");

    if (error) throw error;

    return NextResponse.json({
      count: data?.length || 0,
      subscribers: data || [],
    });
  } catch (error) {
    console.error("Newsletter fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
