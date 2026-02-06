import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml } from "@/lib/sanitize";
import { getCityBySlug } from "@/config/cities";
import { z } from "zod";
import { nameSchema, emailSchema, phoneOptionalSchema } from "@/lib/validations";

const eventSignupRequestSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  eventTitle: z.string().min(1, "Event title is required").max(200),
  eventDate: z.string().min(1, "Event date is required").max(100),
  name: nameSchema,
  email: emailSchema,
  phone: phoneOptionalSchema,
  notes: z.string().max(1000).optional(),
  city: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = eventSignupRequestSchema.safeParse(body);
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

    const { eventId, eventTitle, eventDate, name, email, phone, notes, city } = result.data;
    const cityConfig = getCityBySlug(city);

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
        city: cityConfig.slug,
      });

      if (error) {
        console.error("Supabase error:", error);
      }
    } catch {
      console.log("Event signup received (DB not configured):", {
        eventId,
      });
    }

    // Send confirmation email (with escaped user content)
    await sendEmail({
      to: email,
      subject: `You're Registered: ${eventTitle}`,
      html: emailTemplates.base(`
        <h2>You're Signed Up!</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>You're registered for:</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #f59e0b;">${escapeHtml(eventTitle)}</h3>
          <p style="margin-bottom: 0;"><strong>Date:</strong> ${escapeHtml(eventDate)}</p>
        </div>
        <h3>What to Expect:</h3>
        <ul>
          <li>We'll send a reminder email 24 hours before the event</li>
          <li>Arrive 10-15 minutes early to check in</li>
          <li>Bring your enthusiasm and questions!</li>
        </ul>
        <p>Need to cancel? Just reply to this email or contact us through our <a href="https://pawsandclawsatx.com/contact">contact form</a>.</p>
        <a href="https://pawsandclawsatx.com/events" class="button">View All Events</a>
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
