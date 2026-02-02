/**
 * Email Service for PawsNClaws ATX
 *
 * This module provides email functionality using Resend.
 * Set RESEND_API_KEY in environment variables to enable.
 *
 * Resend is recommended for Next.js projects - sign up at https://resend.com
 */

import { escapeHtml, sanitizeForHtml } from "./sanitize";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email templates
const templates = {
  // Wrap content in base template
  base: (content: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .button:hover { background: #d97706; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PawsNClaws ATX</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>PawsNClaws ATX - Keeping Pets & People Together</p>
          <p>Austin, TX | <a href="https://pawsnclaws.org">pawsnclaws.org</a></p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Contact form confirmation
  contactConfirmation: (name: string) => templates.base(`
    <h2>Thanks for reaching out, ${escapeHtml(name)}!</h2>
    <p>We've received your message and will get back to you within 24-48 hours.</p>
    <p>In the meantime, check out our <a href="https://pawsnclaws.org/resources">resources</a> for helpful information.</p>
    <p>Best,<br>The PawsNClaws Team</p>
  `),

  // Admin notification for contact form
  contactNotification: (data: { name: string; email: string; subject: string; message: string }) => templates.base(`
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
      ${sanitizeForHtml(data.message, { preserveNewlines: true })}
    </div>
    <a href="mailto:${escapeHtml(data.email)}" class="button">Reply to ${escapeHtml(data.name)}</a>
  `),

  // Volunteer welcome
  volunteerWelcome: (name: string, roles: string[]) => templates.base(`
    <h2>Welcome to the Pack, ${escapeHtml(name)}!</h2>
    <p>Thank you for signing up to volunteer with PawsNClaws ATX. We're thrilled to have you join our mission!</p>
    <p><strong>You signed up for:</strong></p>
    <ul>
      ${roles.map(role => `<li>${escapeHtml(role)}</li>`).join('')}
    </ul>
    <p>A volunteer coordinator will reach out within the next few days to discuss next steps and answer any questions.</p>
    <a href="https://pawsnclaws.org/events" class="button">View Upcoming Events</a>
  `),

  // Foster welcome
  fosterWelcome: (name: string, fosterType: string) => templates.base(`
    <h2>Thank You for Applying to Foster, ${escapeHtml(name)}!</h2>
    <p>We're so grateful you want to open your home to animals in need.</p>
    <p><strong>Foster Type:</strong> ${escapeHtml(fosterType)}</p>
    <h3>Next Steps:</h3>
    <ol>
      <li>Our foster coordinator will review your application (1-3 business days)</li>
      <li>We'll schedule a brief phone orientation</li>
      <li>Once approved, you'll be added to our foster network</li>
    </ol>
    <p>Questions? Reply to this email or visit our <a href="https://pawsnclaws.org/foster">foster page</a>.</p>
  `),

  // Deposit assistance confirmation
  depositConfirmation: (name: string, amount: number) => templates.base(`
    <h2>Application Received, ${escapeHtml(name)}</h2>
    <p>We've received your pet deposit assistance application for $${amount.toLocaleString()}.</p>
    <h3>What Happens Next:</h3>
    <ol>
      <li>Our team will review your application (typically 3-5 business days)</li>
      <li>We may reach out for additional documentation</li>
      <li>You'll receive a decision by email</li>
    </ol>
    <p>If approved, funds are typically disbursed within 1-2 weeks directly to your landlord/property manager.</p>
    <p style="color: #6b7280; font-size: 14px;">Need immediate assistance? Call 211 for additional housing resources.</p>
  `),

  // Vet fund confirmation
  vetFundConfirmation: (name: string, petName: string) => templates.base(`
    <h2>Emergency Vet Fund Application Received</h2>
    <p>Hi ${escapeHtml(name)},</p>
    <p>We've received your emergency vet fund application for ${escapeHtml(petName)}. We understand this is a stressful time.</p>
    <h3>Timeline:</h3>
    <ul>
      <li><strong>Emergency cases:</strong> 24-48 hours</li>
      <li><strong>Non-emergency cases:</strong> 3-5 business days</li>
    </ul>
    <p>We'll contact you and your veterinarian directly once a decision is made.</p>
    <p style="color: #dc2626;"><strong>If this is a life-threatening emergency:</strong> Please proceed with treatment. Many vets offer payment plans, and we can potentially help with costs retroactively.</p>
  `),

  // Lost pet alert
  lostPetAlert: (data: { petName: string; species: string; location: string; description: string }) => templates.base(`
    <h2>Lost Pet Alert: ${escapeHtml(data.petName)}</h2>
    <p><strong>Species:</strong> ${escapeHtml(data.species)}</p>
    <p><strong>Last Seen:</strong> ${escapeHtml(data.location)}</p>
    <p><strong>Description:</strong> ${sanitizeForHtml(data.description, { preserveNewlines: true })}</p>
    <a href="https://pawsnclaws.org/lost-found" class="button">View Lost & Found Board</a>
    <p style="margin-top: 20px; font-size: 14px;">If you've seen this pet, please contact the owner through our website or call Austin 311.</p>
  `),

  // Sponsor inquiry confirmation
  sponsorConfirmation: (companyName: string) => templates.base(`
    <h2>Thank You for Your Interest, ${escapeHtml(companyName)}!</h2>
    <p>We're excited about the possibility of partnering with you to help Austin's animals.</p>
    <p>A member of our partnerships team will reach out within 2-3 business days to discuss sponsorship opportunities.</p>
    <h3>In the meantime:</h3>
    <ul>
      <li><a href="https://pawsnclaws.org/impact">View our impact</a></li>
      <li><a href="https://pawsnclaws.org/stories">Read success stories</a></li>
    </ul>
  `),

  // Newsletter welcome
  newsletterWelcome: (email: string) => templates.base(`
    <h2>You're In!</h2>
    <p>Thanks for subscribing to the PawsNClaws ATX newsletter.</p>
    <p>You'll receive:</p>
    <ul>
      <li>Monthly updates on our impact</li>
      <li>Heartwarming success stories</li>
      <li>Upcoming events and volunteer opportunities</li>
      <li>Ways to help Austin's animals</li>
    </ul>
    <p style="font-size: 12px; color: #6b7280;">
      Subscribed: ${escapeHtml(email)}<br>
      <a href="https://pawsnclaws.org/unsubscribe">Unsubscribe</a>
    </p>
  `),

  // Colony submission notification
  colonySubmission: (data: { colonyName: string; location: string; estimatedCats: string; submitterName: string; submitterEmail: string; urgentNeeds?: string }) => templates.base(`
    <h2>New Colony Submission</h2>
    <p><strong>Colony Name:</strong> ${escapeHtml(data.colonyName)}</p>
    <p><strong>Location:</strong> ${escapeHtml(data.location)}</p>
    <p><strong>Estimated Cats:</strong> ${escapeHtml(data.estimatedCats)}</p>
    <p><strong>Submitted by:</strong> ${escapeHtml(data.submitterName)} (${escapeHtml(data.submitterEmail)})</p>
    ${data.urgentNeeds ? `
    <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <p style="color: #dc2626; font-weight: bold; margin: 0 0 10px 0;">⚠️ Urgent Needs:</p>
      <p style="margin: 0;">${sanitizeForHtml(data.urgentNeeds, { preserveNewlines: true })}</p>
    </div>
    ` : ''}
    <a href="https://pawsnclaws.org/admin/colonies" class="button">Review in Admin</a>
  `),
};

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[Email] RESEND_API_KEY not configured. Email not sent:", options.subject);
    console.log("[Email] To:", options.to);
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "PawsNClaws ATX <noreply@pawsnclaws.org>",
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    console.log("[Email] Sent successfully:", options.subject, "to", options.to);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("[Email] Send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Export templates for use in API routes
export const emailTemplates = templates;

// Convenience functions
export const emails = {
  sendContactConfirmation: (email: string, name: string) =>
    sendEmail({
      to: email,
      subject: "We received your message - PawsNClaws ATX",
      html: templates.contactConfirmation(name),
    }),

  sendContactNotification: (adminEmail: string, data: { name: string; email: string; subject: string; message: string }) =>
    sendEmail({
      to: adminEmail,
      subject: `[Contact] ${data.subject} - from ${data.name}`,
      html: templates.contactNotification(data),
      replyTo: data.email,
    }),

  sendVolunteerWelcome: (email: string, name: string, roles: string[]) =>
    sendEmail({
      to: email,
      subject: "Welcome to PawsNClaws ATX Volunteers!",
      html: templates.volunteerWelcome(name, roles),
    }),

  sendFosterWelcome: (email: string, name: string, fosterType: string) =>
    sendEmail({
      to: email,
      subject: "Foster Application Received - PawsNClaws ATX",
      html: templates.fosterWelcome(name, fosterType),
    }),

  sendDepositConfirmation: (email: string, name: string, amount: number) =>
    sendEmail({
      to: email,
      subject: "Deposit Assistance Application Received",
      html: templates.depositConfirmation(name, amount),
    }),

  sendVetFundConfirmation: (email: string, name: string, petName: string) =>
    sendEmail({
      to: email,
      subject: "Emergency Vet Fund Application Received",
      html: templates.vetFundConfirmation(name, petName),
    }),

  sendSponsorConfirmation: (email: string, companyName: string) =>
    sendEmail({
      to: email,
      subject: "Partnership Inquiry Received - PawsNClaws ATX",
      html: templates.sponsorConfirmation(companyName),
    }),

  sendNewsletterWelcome: (email: string) =>
    sendEmail({
      to: email,
      subject: "Welcome to the PawsNClaws Newsletter!",
      html: templates.newsletterWelcome(email),
    }),

  sendColonySubmissionNotification: (adminEmail: string, data: { colonyName: string; location: string; estimatedCats: string; submitterName: string; submitterEmail: string; urgentNeeds?: string }) =>
    sendEmail({
      to: adminEmail,
      subject: `[Colony] New submission - ${data.colonyName} (${data.estimatedCats} cats)`,
      html: templates.colonySubmission(data),
      replyTo: data.submitterEmail,
    }),
};
