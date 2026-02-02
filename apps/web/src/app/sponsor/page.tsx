"use client";

import Link from "next/link";
import { sponsorTiers, formatAmount } from "@/lib/stripe";
import { useFormValidation } from "@/hooks";
import { sponsorInquirySchema, type SponsorInquiryFormData } from "@/lib/validations";
import { FormField, TextareaField, FormError, SubmitButton } from "@/components/FormField";

const defaultValues: SponsorInquiryFormData = {
  companyName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  tier: "",
  message: "",
};

export default function SponsorPage() {
  const form = useFormValidation({
    schema: sponsorInquirySchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/sponsors/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send inquiry");
      }
    },
  });

  const setSelectedTier = (tier: string) => {
    form.setValue("tier", tier);
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your sponsorship inquiry and will be in touch within
            2 business days to discuss partnership opportunities.
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Corporate Partnerships
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partner With PawsNClaws ATX
          </h1>
          <p className="text-xl text-gray-600">
            Align your brand with animal welfare, get real marketing value, and
            make a measurable impact in our community.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">📊</span>
              <h3 className="font-bold text-gray-900 mb-2">
                Transparent Impact
              </h3>
              <p className="text-gray-600 text-sm">
                Know exactly where your dollars go. Quarterly reports with real
                numbers: animals helped, meals served, lives saved.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">🎯</span>
              <h3 className="font-bold text-gray-900 mb-2">Local Visibility</h3>
              <p className="text-gray-600 text-sm">
                Your logo on our site, maps, events, and social media. Austin
                loves supporting businesses that give back.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">💼</span>
              <h3 className="font-bold text-gray-900 mb-2">Tax Benefits</h3>
              <p className="text-gray-600 text-sm">
                501(c)(3) tax-deductible donations. We provide all documentation
                for your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sponsorship Tiers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sponsorTiers).map(([key, tier]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTier(key)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  form.values.tier === key
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 bg-white hover:border-amber-300"
                }`}
              >
                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    key === "platinum"
                      ? "text-purple-600"
                      : key === "gold"
                      ? "text-yellow-600"
                      : key === "silver"
                      ? "text-gray-500"
                      : "text-amber-700"
                  }`}
                >
                  {tier.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {formatAmount(tier.minAmount)}
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </div>
                <ul className="space-y-2">
                  {tier.perks.map((perk, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-amber-500 mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Other Partnership Options */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Other Ways to Partner
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
              <h3 className="font-bold text-gray-900 mb-2">
                🛒 Round-Up Partner
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Add &quot;Round up for pets&quot; at your POS. Customers donate spare
                change, you get goodwill.
              </p>
              <span className="text-xs text-amber-600 font-medium">
                Zero cost to you
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-900 mb-2">
                🤝 Matching Gifts
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Match employee donations. We handle tracking and reporting.
              </p>
              <span className="text-xs text-blue-600 font-medium">
                Double the impact
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">
                📦 In-Kind Donations
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Donate products or services. Pet food, supplies, printing,
                catering for events.
              </p>
              <span className="text-xs text-green-600 font-medium">
                Full FMV deduction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Start the Conversation
            </h2>
            <form onSubmit={form.handleSubmit} className="space-y-4">
              {form.submitError && (
                <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Company Name"
                  name="companyName"
                  type="text"
                  value={form.values.companyName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("companyName")}
                  touched={form.isFieldTouched("companyName")}
                  required
                />
                <FormField
                  label="Phone"
                  name="contactPhone"
                  type="tel"
                  value={form.values.contactPhone || ""}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("contactPhone")}
                  touched={form.isFieldTouched("contactPhone")}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Contact Name"
                  name="contactName"
                  type="text"
                  value={form.values.contactName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("contactName")}
                  touched={form.isFieldTouched("contactName")}
                  required
                />
                <FormField
                  label="Email"
                  name="contactEmail"
                  type="email"
                  value={form.values.contactEmail}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("contactEmail")}
                  touched={form.isFieldTouched("contactEmail")}
                  required
                />
              </div>

              <TextareaField
                label="What interests you?"
                name="message"
                value={form.values.message || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("message")}
                touched={form.isFieldTouched("message")}
                rows={4}
                placeholder="Tell us about your company and what type of partnership interests you..."
              />

              {form.values.tier && (
                <div className="p-4 bg-amber-50 rounded-xl">
                  <span className="text-sm text-amber-700">
                    Selected tier:{" "}
                    <strong className="capitalize">{form.values.tier}</strong> (
                    {formatAmount(sponsorTiers[form.values.tier as keyof typeof sponsorTiers].minAmount)}
                    /month)
                  </span>
                </div>
              )}

              <SubmitButton
                isSubmitting={form.isSubmitting}
                isValid={form.isValid}
                loadingText="Sending..."
              >
                Send Inquiry
              </SubmitButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
