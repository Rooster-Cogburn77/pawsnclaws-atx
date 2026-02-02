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
              href="mailto:hello@pawsnclaws.org"
              className="text-amber-600 hover:underline"
            >
              hello@pawsnclaws.org
            </a>
            <p className="text-xs text-gray-500 mt-2">
              We typically respond within 2-3 business days.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Social links coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
