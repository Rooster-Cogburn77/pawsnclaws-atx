import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";

const FOSTER_COORDINATOR_EMAIL = process.env.FOSTER_COORDINATOR_EMAIL || process.env.ADMIN_EMAIL || "foster@pawsnclaws.org";

// Map foster type IDs to readable names
const fosterTypeLabels: Record<string, string> = {
  "bottle-baby": "Bottle Baby Kittens",
  "weaned-kittens": "Weaned Kittens",
  "adult-cats": "Adult Cats",
  "dogs": "Dogs",
  "medical": "Medical Foster",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      fosterType,
      hasOtherPets,
      hasKids,
      housingType,
      experience,
      whyFoster,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    try {
      const result = await supabase.from("volunteers").insert({
        name,
        email,
        phone,
        skills: ["foster", ...(fosterType || [])],
        is_foster_approved: false,
        background_check: false,
        status: "pending",
        notes: JSON.stringify({
          applicationType: "foster",
          fosterTypes: fosterType,
          hasOtherPets,
          hasKids,
          housingType,
          experience,
          whyFoster,
        }),
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      console.log("Foster application received (DB not configured):", {
        name,
        email,
        fosterType,
      });
    }

    // Get readable foster types
    const fosterTypesReadable = (fosterType || [])
      .map((type: string) => fosterTypeLabels[type] || type)
      .join(", ");

    // Send welcome email with next steps
    await emails.sendFosterWelcome(email, name, fosterTypesReadable || "General Foster");

    // Send notification to foster coordinator
    await sendEmail({
      to: FOSTER_COORDINATOR_EMAIL,
      subject: `[New Foster Application] ${name}`,
      html: emailTemplates.base(`
        <h2>New Foster Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Foster Types:</strong> ${fosterTypesReadable || "None specified"}</p>
        <p><strong>Housing:</strong> ${housingType || "Not specified"}</p>
        <p><strong>Has Other Pets:</strong> ${hasOtherPets ? "Yes" : "No"}</p>
        <p><strong>Has Kids:</strong> ${hasKids ? "Yes" : "No"}</p>
        ${experience ? `<p><strong>Experience:</strong> ${experience}</p>` : ""}
        ${whyFoster ? `<p><strong>Why They Want to Foster:</strong></p><div style="background: #f9fafb; padding: 15px; border-radius: 8px;">${whyFoster}</div>` : ""}
        <a href="mailto:${email}" class="button">Contact ${name}</a>
      `),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Foster application received",
    });
  } catch (error) {
    console.error("Foster application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
