import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { emails, sendEmail, emailTemplates } from "@/lib/email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsnclaws.org";

const tierLabels: Record<string, string> = {
  bronze: "Bronze ($500/year)",
  silver: "Silver ($1,000/year)",
  gold: "Gold ($2,500/year)",
  platinum: "Platinum ($5,000/year)",
  champion: "Champion ($10,000+/year)",
};

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

    // Send confirmation email to sponsor
    await emails.sendSponsorConfirmation(contactEmail, companyName);

    // Send notification email to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[New Sponsor Inquiry] ${companyName} - ${tierLabels[tier] || tier}`,
      html: emailTemplates.base(`
        <h2>New Sponsor Partnership Inquiry</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Website:</strong> ${website ? `<a href="${website}">${website}</a>` : "Not provided"}</p>
        <p><strong>Interested Tier:</strong> ${tierLabels[tier] || tier}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${contactEmail}</p>
        <p><strong>Phone:</strong> ${contactPhone || "Not provided"}</p>
        ${message ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        ` : ''}
        <a href="mailto:${contactEmail}" class="button" style="margin-top: 20px;">Contact ${contactName}</a>
      `),
      replyTo: contactEmail,
    });

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
