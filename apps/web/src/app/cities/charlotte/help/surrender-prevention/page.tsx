"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { charlotteSurrenderSchema, type CharlotteSurrenderFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const reasons = [
  { id: "cost", label: "Can't afford pet care (vet, food, etc.)" },
  { id: "moving", label: "Moving and can't take pet" },
  { id: "landlord", label: "Landlord issues" },
  { id: "behavior", label: "Behavior problems" },
  { id: "allergies", label: "Allergies" },
  { id: "time", label: "Not enough time" },
  { id: "health", label: "My health issues" },
  { id: "baby", label: "New baby / family changes" },
  { id: "other", label: "Other reason" },
];

const petTypeOptions = [
  { value: "", label: "Select..." },
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "multiple", label: "Multiple pets" },
  { value: "other", label: "Other" },
];

const timelineOptions = [
  { value: "", label: "Select..." },
  { value: "immediate", label: "Immediate (within days)" },
  { value: "week", label: "Within a week" },
  { value: "month", label: "Within a month" },
  { value: "exploring", label: "Just exploring options" },
];

const defaultValues: CharlotteSurrenderFormData = {
  name: "",
  email: "",
  phone: "",
  petType: "",
  petName: "",
  reasons: [],
  timeline: "",
  message: "",
};

export default function CharlotteSurrenderPreventionPage() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const form = useFormValidation({
    schema: charlotteSurrenderSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/surrender-prevention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          reasons: selectedReasons,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request");
      }
    },
  });

  const toggleReason = (reasonId: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((r) => r !== reasonId)
        : [...prev, reasonId]
    );
    form.setValue("reasons", selectedReasons.includes(reasonId)
      ? selectedReasons.filter((r) => r !== reasonId)
      : [...selectedReasons, reasonId]
    );
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out before making a decision. Our team will
            contact you within 24-48 hours to discuss options. There&apos;s often
            a solution we can find together.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💕</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Before You Surrender
          </h1>
          <p className="text-xl text-gray-600">
            Let&apos;s talk. There&apos;s often a solution we can find together.
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-amber-900 mb-3">We&apos;re Not Here to Judge</h2>
          <p className="text-amber-800">
            Life happens. Circumstances change. We understand. Our goal is simply
            to explore all options with you. Sometimes the solution is easier than
            you think. And if rehoming truly is best, we can help with that too.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tell Us What&apos;s Going On</h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          {/* Pet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="Pet Type"
              name="petType"
              value={form.values.petType}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petType")}
              touched={form.isFieldTouched("petType")}
              options={petTypeOptions}
              required
            />
            <FormField
              label="Pet Name(s)"
              name="petName"
              type="text"
              value={form.values.petName || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petName")}
              touched={form.isFieldTouched("petName")}
            />
          </div>

          {/* Reasons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What&apos;s making you consider surrender? (select all that apply) *
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => toggleReason(reason.id)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    selectedReasons.includes(reason.id)
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>
            {form.isFieldTouched("reasons") && form.getFieldError("reasons") && (
              <p className="mt-2 text-sm text-red-600">{form.getFieldError("reasons")}</p>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <SelectField
              label="How urgent is this?"
              name="timeline"
              value={form.values.timeline || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("timeline")}
              touched={form.isFieldTouched("timeline")}
              options={timelineOptions}
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <TextareaField
              label="Tell us more about your situation"
              name="message"
              value={form.values.message || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              rows={4}
              placeholder="The more details you share, the better we can help..."
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid && selectedReasons.length > 0}
            loadingText="Submitting..."
          >
            Get Help
          </SubmitButton>
        </form>

        {/* Resources */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            You can also explore our other programs:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cities/charlotte/help/vet-fund"
              className="text-teal-600 hover:text-teal-700"
            >
              Emergency Vet Fund →
            </Link>
            <Link
              href="/cities/charlotte/help/deposit-assistance"
              className="text-teal-600 hover:text-teal-700"
            >
              Pet Deposit Help →
            </Link>
            <Link
              href="/cities/charlotte/resources"
              className="text-teal-600 hover:text-teal-700"
            >
              Local Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
