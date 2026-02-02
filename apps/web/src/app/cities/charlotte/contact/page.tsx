"use client";

import { useFormValidation } from "@/hooks";
import { charlotteContactSchema, type CharlotteContactFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const subjectOptions = [
  { value: "", label: "Select a topic..." },
  { value: "general", label: "General Question" },
  { value: "colony", label: "Colony/TNR Help" },
  { value: "volunteer", label: "Volunteering" },
  { value: "foster", label: "Fostering" },
  { value: "donate", label: "Donations" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "other", label: "Other" },
];

const defaultValues: CharlotteContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function CharlotteContactPage() {
  const form = useFormValidation({
    schema: charlotteContactSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
    },
  });

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">✉️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Message Sent!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">📬</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact PawsNClaws CLT
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? We&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={form.handleSubmit} className="space-y-6">
              {form.submitError && (
                <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
              )}

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
              <SelectField
                label="Subject"
                name="subject"
                value={form.values.subject}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("subject")}
                touched={form.isFieldTouched("subject")}
                options={subjectOptions}
                required
              />
              <TextareaField
                label="Message"
                name="message"
                value={form.values.message}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("message")}
                touched={form.isFieldTouched("message")}
                rows={5}
                placeholder="How can we help?"
                required
              />
              <SubmitButton
                isSubmitting={form.isSubmitting}
                isValid={form.isValid}
                loadingText="Sending..."
                className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300"
              >
                Send Message
              </SubmitButton>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Email Us</h3>
              <a
                href="mailto:charlotte@pawsandclawsatx.com"
                className="text-teal-600 hover:text-teal-700"
              >
                charlotte@pawsandclawsatx.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/cities/charlotte/resources" className="text-teal-600 hover:text-teal-700">
                    → Local TNR Resources
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/map/submit" className="text-teal-600 hover:text-teal-700">
                    → Report a Colony
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/volunteer" className="text-teal-600 hover:text-teal-700">
                    → Volunteer Application
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/foster" className="text-teal-600 hover:text-teal-700">
                    → Foster Application
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="font-bold text-red-800 mb-2">Emergency?</h3>
              <p className="text-red-700 text-sm mb-3">
                For injured animals or emergencies, contact:
              </p>
              <div className="space-y-2">
                <p className="font-medium text-red-800">
                  CARE Charlotte: <a href="tel:704-457-2300" className="underline">(704) 457-2300</a>
                </p>
                <p className="font-medium text-red-800">
                  Animal Control: <a href="tel:311" className="underline">311</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
