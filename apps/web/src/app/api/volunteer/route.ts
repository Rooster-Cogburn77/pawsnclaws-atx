import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

// Map interest IDs to readable names
const interestLabels: Record<string, string> = {
  "colony-care": "Colony Care",
  "tnr-transport": "TNR Transport",
  "foster": "Fostering",
  "events": "Event Support",
  "admin": "Administrative",
  "outreach": "Community Outreach",
  "photography": "Pet Photography",
  "social-media": "Social Media",
};

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

    // Convert interest IDs to readable labels
    const roleLabels = (interests || []).map(
      (id: string) => interestLabels[id] || id
    );

    // Send welcome email to volunteer
    await emails.sendVolunteerWelcome(email, name, roleLabels);

    // Send notification to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[New Volunteer] ${name} signed up`,
      html: emailTemplates.base(`
        <h2>New Volunteer Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Interests:</strong> ${roleLabels.join(", ") || "None selected"}</p>
        <p><strong>Availability:</strong> ${availability || "Not specified"}</p>
        <p><strong>Has Vehicle:</strong> ${hasVehicle ? "Yes" : "No"}</p>
        <p><strong>Interested in Fostering:</strong> ${canFoster ? "Yes" : "No"}</p>
        ${experience ? `<p><strong>Experience:</strong> ${experience}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <a href="mailto:${email}" class="button">Contact ${name}</a>
      `),
    });

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
