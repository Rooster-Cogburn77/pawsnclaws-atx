import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, eventTitle, eventDate, name, email, phone, notes } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "Event ID, name, and email are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    try {
      // Insert signup
      const { error } = await supabase.from("event_signups").insert({
        event_id: eventId,
        name,
        email,
        phone: phone || null,
        notes: notes || null,
        status: "registered",
      });

      if (error) {
        console.error("Supabase error:", error);
      }
    } catch {
      console.log("Event signup received (DB not configured):", {
        eventId,
        name,
        email,
      });
    }

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: `You're Registered: ${eventTitle}`,
      html: emailTemplates.base(`
        <h2>You're Signed Up!</h2>
        <p>Hi ${name},</p>
        <p>You're registered for:</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #f59e0b;">${eventTitle}</h3>
          <p style="margin-bottom: 0;"><strong>Date:</strong> ${eventDate}</p>
        </div>
        <h3>What to Expect:</h3>
        <ul>
          <li>We'll send a reminder email 24 hours before the event</li>
          <li>Arrive 10-15 minutes early to check in</li>
          <li>Bring your enthusiasm and questions!</li>
        </ul>
        <p>Need to cancel? Just reply to this email or contact us through our <a href="https://pawsnclaws.org/contact">contact form</a>.</p>
        <a href="https://pawsnclaws.org/events" class="button">View All Events</a>
      `),
    });

    return NextResponse.json({
      success: true,
      message: "Successfully signed up for event!",
    });
  } catch (error) {
    console.error("Event signup error:", error);
    return NextResponse.json(
      { error: "Failed to sign up. Please try again." },
      { status: 500 }
    );
  }
}
