import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { sendEmail, emailTemplates } from "@/lib/email";
import { escapeHtml, sanitizeForHtml } from "@/lib/sanitize";
import { lostFoundSchema } from "@/lib/validations";
import { getCityBySlug } from "@/config/cities";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = lostFoundSchema.safeParse(body);
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
    } = result.data;
    const city = body.city as string | undefined;
    const cityConfig = getCityBySlug(city);

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
        city: cityConfig.slug,
      });

      if (result.error) {
        console.error("Supabase error:", result.error);
      }
    } catch {
      console.log("Lost/found report received (DB not configured):", {
        type,
        species,
        location,
        contactName,
      });
    }

    // Send notification email to city admin (with sanitized content)
    await sendEmail({
      to: cityConfig.email,
      subject: `[${cityConfig.shortName}] [${isLost ? "Lost" : "Found"} Pet] ${escapeHtml(species)}${name ? ` named ${escapeHtml(name)}` : ""} - ${escapeHtml(location)}`,
      html: emailTemplates.base(`
        <h2>${isLost ? "Lost" : "Found"} Pet Report</h2>
        <div style="background: ${isLost ? '#fef2f2' : '#f0fdf4'}; border: 1px solid ${isLost ? '#fecaca' : '#bbf7d0'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <strong style="color: ${isLost ? '#dc2626' : '#16a34a'};">${isLost ? "LOST" : "FOUND"}</strong>
        </div>
        <p><strong>Species:</strong> ${escapeHtml(species)}</p>
        ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ''}
        <p><strong>Breed:</strong> ${escapeHtml(breed || "Unknown")}</p>
        <p><strong>Color:</strong> ${escapeHtml(color)}</p>
        <p><strong>Location:</strong> ${escapeHtml(location)}</p>
        ${microchipId ? `<p><strong>Microchip ID:</strong> ${escapeHtml(microchipId)}</p>` : ''}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Description:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
          ${sanitizeForHtml(description, { preserveNewlines: true })}
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
        ${contactPhone ? `<p><strong>Phone:</strong> ${escapeHtml(contactPhone)}</p>` : ''}
        ${contactEmail ? `<p><strong>Email:</strong> ${escapeHtml(contactEmail)}</p>` : ''}
        <a href="https://pawsnclaws.org/lost-found" class="button">View All Reports</a>
      `),
    });

    // Send confirmation to reporter if email provided
    if (contactEmail) {
      await sendEmail({
        to: contactEmail,
        subject: `Your ${isLost ? "Lost" : "Found"} Pet Report - PawsNClaws ATX`,
        html: emailTemplates.base(`
          <h2>Report Received</h2>
          <p>Hi ${escapeHtml(contactName)},</p>
          <p>We've received your ${isLost ? "lost" : "found"} pet report and it's now visible on our <a href="https://pawsnclaws.org/lost-found">Lost & Found board</a>.</p>

          <h3>Your Report:</h3>
          <ul>
            <li><strong>Type:</strong> ${escapeHtml(species)}${breed ? ` (${escapeHtml(breed)})` : ''}</li>
            <li><strong>Color:</strong> ${escapeHtml(color)}</li>
            <li><strong>Location:</strong> ${escapeHtml(location)}</li>
          </ul>

          ${isLost ? `
          <h3>Tips for Finding Your Pet:</h3>
          <ul>
            <li>Search your neighborhood at dawn and dusk when it's quieter</li>
            <li>Leave out familiar-smelling items (bedding, clothes)</li>
            <li>Post on Nextdoor, local Facebook groups, and Pawboost</li>
            <li>Contact local shelters daily</li>
            <li>Check Austin Animal Center: (512) 978-0500</li>
          </ul>
          ` : `
          <h3>If You've Found a Pet:</h3>
          <ul>
            <li>Take them to any vet to scan for a microchip (free)</li>
            <li>Post on Nextdoor and local Facebook groups</li>
            <li>Contact Austin Animal Center: (512) 978-0500</li>
          </ul>
          `}

          <p>We hope for a happy reunion!</p>
        `),
      });
    }

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
