"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { surrenderPreventionSchema, type SurrenderPreventionFormData } from "@/lib/validations";
import { FormField, TextareaField, FormError, SubmitButton } from "@/components/FormField";

const surrenderReasons = [
  { id: "housing", label: "Housing issues (moving, can't find pet-friendly place)" },
  { id: "financial", label: "Can't afford pet care (food, vet bills)" },
  { id: "behavioral", label: "Behavioral problems (aggression, not house-trained)" },
  { id: "allergies", label: "Allergies in the family" },
  { id: "health", label: "Owner health issues (can't care for pet)" },
  { id: "time", label: "Not enough time for the pet" },
  { id: "new-baby", label: "New baby/family changes" },
  { id: "other", label: "Other reason" },
];

const timelineOptions = [
  { id: "urgent", label: "Urgent (days)" },
  { id: "soon", label: "Within 2 weeks" },
  { id: "month", label: "Within a month" },
  { id: "flexible", label: "Flexible / exploring options" },
];

const defaultValues: SurrenderPreventionFormData = {
  name: "",
  email: "",
  phone: "",
  petInfo: "",
  reasons: [],
  otherReason: "",
  timeline: "flexible",
  whatWouldHelp: "",
  triedOptions: "",
};

export default function SurrenderPreventionPage() {
  const form = useFormValidation({
    schema: surrenderPreventionSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/surrender-prevention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit case");
      }
    },
  });

  const toggleReason = (reasonId: string) => {
    const currentReasons = form.values.reasons || [];
    const newReasons = currentReasons.includes(reasonId)
      ? currentReasons.filter((r) => r !== reasonId)
      : [...currentReasons, reasonId];
    form.setValue("reasons", newReasons);
    form.setTouched("reasons");
  };

  const setTimeline = (timeline: string) => {
    form.setValue("timeline", timeline);
    form.setTouched("timeline");
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">💕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out before making this difficult decision.
            We&apos;ll review your situation and contact you within 24-48 hours with
            resources and options.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Remember: surrendering should be the last resort. There are often
            solutions we can find together.
          </p>
          <Link
            href="/resources"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Browse Resources
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
          <span className="text-4xl mb-4 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Need to Rehome Your Pet?
          </h1>
          <p className="text-gray-600">
            Before surrendering to a shelter, let us help. We have resources and
            can often find solutions to keep pets with their families.
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-green-900 mb-2">
            We&apos;re Not Here to Judge
          </h3>
          <p className="text-sm text-green-800">
            We understand life circumstances change. Our goal is to help you
            explore every option before separating from your pet. Many situations
            that seem impossible have solutions - temporary foster care, financial
            assistance, training help, or housing resources.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4 mb-6">
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("email")}
                touched={form.isFieldTouched("email")}
              />
              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={form.values.phone || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("phone")}
                touched={form.isFieldTouched("phone")}
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">About Your Pet</h3>
          <div className="mb-6">
            <TextareaField
              label="Tell us about your pet"
              name="petInfo"
              value={form.values.petInfo}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petInfo")}
              touched={form.isFieldTouched("petInfo")}
              required
              rows={3}
              placeholder="Species, breed, age, name, personality, any health or behavioral notes..."
            />
          </div>

          <h3 className="font-bold text-gray-900 mb-4">
            What&apos;s making you consider this?
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {surrenderReasons.map((reason) => (
              <button
                key={reason.id}
                type="button"
                onClick={() => toggleReason(reason.id)}
                className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                  form.values.reasons?.includes(reason.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                {reason.label}
              </button>
            ))}
          </div>
          {form.isFieldTouched("reasons") && form.getFieldError("reasons") && (
            <p className="text-red-500 text-sm mb-4">
              {form.getFieldError("reasons")}
            </p>
          )}

          {form.values.reasons?.includes("other") && (
            <div className="mb-6">
              <FormField
                label="Please describe"
                name="otherReason"
                type="text"
                value={form.values.otherReason || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("otherReason")}
                touched={form.isFieldTouched("otherReason")}
                placeholder="Please describe your reason..."
              />
            </div>
          )}

          <h3 className="font-bold text-gray-900 mb-4 mt-6">Timeline</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {timelineOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTimeline(option.id)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  form.values.timeline === option.id
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <TextareaField
              label="What would help you keep your pet?"
              name="whatWouldHelp"
              value={form.values.whatWouldHelp || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("whatWouldHelp")}
              touched={form.isFieldTouched("whatWouldHelp")}
              rows={2}
              placeholder="Financial help, training, temporary foster, housing assistance..."
            />

            <TextareaField
              label="What have you already tried?"
              name="triedOptions"
              value={form.values.triedOptions || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("triedOptions")}
              touched={form.isFieldTouched("triedOptions")}
              rows={2}
              placeholder="Rehoming through friends, pet-friendly housing search, training, etc."
            />
          </div>

          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
          >
            Get Help
          </SubmitButton>
        </form>

        {/* Immediate Resources */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Immediate Resources
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>Pet food help:</strong>{" "}
              <Link href="/resources" className="text-amber-600 hover:underline">
                Austin Pet Food Pantries
              </Link>
            </li>
            <li>
              <strong>Low-cost vet care:</strong>{" "}
              <a
                href="https://emancipet.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                Emancipet
              </a>
            </li>
            <li>
              <strong>Pet-friendly housing:</strong>{" "}
              <a
                href="https://www.petfriendlyaustintx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                Pet Friendly Austin
              </a>
            </li>
            <li>
              <strong>Deposit help:</strong>{" "}
              <Link
                href="/help/deposit-assistance"
                className="text-amber-600 hover:underline"
              >
                Our Deposit Assistance Program
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
