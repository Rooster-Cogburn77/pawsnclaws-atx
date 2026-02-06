"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const contactReasons = [
  { value: "general", label: "General Inquiry" },
  { value: "volunteer", label: "Volunteering Question" },
  { value: "partnership", label: "Partnership / Sponsorship" },
  { value: "resource", label: "Suggest a Resource" },
  { value: "report", label: "Report an Issue" },
  { value: "media", label: "Media / Press" },
  { value: "other", label: "Other" },
];

const defaultValues: ContactFormData = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

export default function ContactPage() {
  const form = useFormValidation({
    schema: contactSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
    },
  });

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">✉️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Message Sent!
          </h1>
          <p className="text-gray-600 mb-6">
            Thanks for reaching out. We&apos;ll get back to you within 2-3 business
            days.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">✉️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">
            Questions, suggestions, or just want to say hi? We&apos;d love to hear
            from you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/volunteer"
            className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mb-2 block">🤝</span>
            <span className="font-medium text-gray-900 text-sm">Volunteer</span>
          </Link>
          <Link
            href="/sponsor"
            className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mb-2 block">🏢</span>
            <span className="font-medium text-gray-900 text-sm">Partner</span>
          </Link>
          <Link
            href="/donate"
            className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mb-2 block">❤️</span>
            <span className="font-medium text-gray-900 text-sm">Donate</span>
          </Link>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={form.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="space-y-4">
            {form.submitError && (
              <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Your Name"
                name="name"
                type="text"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("name")}
                touched={form.isFieldTouched("name")}
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("email")}
                touched={form.isFieldTouched("email")}
                required
              />
            </div>

            <SelectField
              label="What's this about?"
              name="reason"
              value={form.values.reason || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("reason")}
              touched={form.isFieldTouched("reason")}
              options={contactReasons}
              placeholder="Select a topic..."
            />

            <TextareaField
              label="Message"
              name="message"
              value={form.values.message}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              required
              rows={5}
              placeholder="How can we help?"
            />

            <SubmitButton
              isSubmitting={form.isSubmitting}
              isValid={form.isValid}
              loadingText="Sending..."
            >
              Send Message
            </SubmitButton>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
            <a
              href="mailto:hello@pawsandclawsatx.com"
              className="text-amber-600 hover:underline"
            >
              hello@pawsandclawsatx.com
            </a>
            <p className="text-xs text-gray-500 mt-2">
              We typically respond within 2-3 business days.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm">
              We typically respond within 2-3 business days. For emergencies
              involving animal safety, please call Austin 311.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
