import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails } from "@/lib/email";
import { contactSchema } from "@/lib/validations";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = contactSchema.safeParse(body);
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

    const { name, email, reason, message } = result.data;

    const supabase = createServerSupabase();

    try {
      // Store in database if connected
      await supabase.from("contact_messages").insert({
        name,
        email,
        reason: reason || "general",
        message,
        status: "new",
      });
    } catch {
      // Log for now if DB not configured
      console.log("Contact form submission received:", {
        name,
        email,
        reason,
        message: message.substring(0, 100) + "...",
      });
    }

    // Send notification email to admin
    await emails.sendContactNotification(ADMIN_EMAIL, {
      name,
      email,
      subject: reason || "General Inquiry",
      message,
    });

    // Send confirmation email to sender
    await emails.sendContactConfirmation(email, name);

    return NextResponse.json({
      success: true,
      message: "Message received",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
