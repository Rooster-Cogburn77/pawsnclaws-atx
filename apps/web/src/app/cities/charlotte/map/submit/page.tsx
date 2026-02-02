"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { charlotteColonySchema, type CharlotteColonyFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const urgentNeedOptions = [
  { value: "tnr-needed", label: "TNR needed (unfixed cats)" },
  { value: "food-needed", label: "Regular food supply needed" },
  { value: "medical", label: "Cats need medical attention" },
  { value: "shelter", label: "Shelter/housing needed" },
  { value: "caretaker", label: "Need a regular caretaker" },
  { value: "threatened", label: "Colony is threatened (eviction, etc.)" },
];

const tnrStatusOptions = [
  { value: "", label: "Select..." },
  { value: "all", label: "All cats are fixed (ear-tipped)" },
  { value: "partial", label: "Some cats are fixed" },
  { value: "none", label: "No cats are fixed" },
  { value: "unknown", label: "Unknown" },
];

const caretakerOptions = [
  { value: "", label: "Select..." },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Unknown" },
];

const relationOptions = [
  { value: "", label: "Select..." },
  { value: "caretaker", label: "I am the caretaker" },
  { value: "neighbor", label: "Neighbor/nearby resident" },
  { value: "observer", label: "Just observed them" },
  { value: "property", label: "Property owner/manager" },
  { value: "other", label: "Other" },
];

const defaultValues: CharlotteColonyFormData = {
  colonyName: "",
  locationDescription: "",
  address: "",
  estimatedCats: "",
  tnrStatus: "",
  hasCaretaker: "",
  urgentNeeds: [],
  additionalInfo: "",
  submitterName: "",
  submitterEmail: "",
  submitterPhone: "",
  submitterRelation: "",
};

export default function CharlotteSubmitColonyPage() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const form = useFormValidation({
    schema: charlotteColonySchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/colonies/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          urgentNeeds: selectedNeeds.join(", "),
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit colony");
      }
    },
  });

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need)
        ? prev.filter((n) => n !== need)
        : [...prev, need]
    );
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">📍</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Colony Submitted!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reporting this colony. Our team will review the
            submission and reach out if we need more information. Approved
            colonies will appear on the map.
          </p>
          <Link
            href="/cities/charlotte/map"
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/cities/charlotte/map"
            className="text-teal-600 hover:text-teal-700 text-sm mb-4 inline-block"
          >
            ← Back to Map
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report a Colony
          </h1>
          <p className="text-xl text-gray-600">
            Help us track and support community cats in Charlotte
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 rounded-xl p-4 mb-8 text-sm">
          <p className="text-blue-800">
            <strong>Privacy:</strong> Exact colony locations are only shared with
            verified volunteers. The public map shows approximate areas only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Colony Info */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Colony Information</h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Colony Name (optional)"
              name="colonyName"
              type="text"
              value={form.values.colonyName || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("colonyName")}
              touched={form.isFieldTouched("colonyName")}
              placeholder="e.g., 'The Park Street Cats'"
            />
            <FormField
              label="Estimated Number of Cats"
              name="estimatedCats"
              type="number"
              value={form.values.estimatedCats}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("estimatedCats")}
              touched={form.isFieldTouched("estimatedCats")}
              required
            />
          </div>

          <div className="mb-6">
            <TextareaField
              label="Location Description"
              name="locationDescription"
              value={form.values.locationDescription}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("locationDescription")}
              touched={form.isFieldTouched("locationDescription")}
              rows={3}
              placeholder="Describe where the cats gather (e.g., 'Behind the shopping center near the dumpsters')"
              required
            />
          </div>

          <div className="mb-6">
            <FormField
              label="Address or Cross Streets (approximate is fine)"
              name="address"
              type="text"
              value={form.values.address || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("address")}
              touched={form.isFieldTouched("address")}
            />
          </div>

          {/* TNR Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="TNR Status"
              name="tnrStatus"
              value={form.values.tnrStatus}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("tnrStatus")}
              touched={form.isFieldTouched("tnrStatus")}
              options={tnrStatusOptions}
              required
            />
            <SelectField
              label="Is there a regular caretaker?"
              name="hasCaretaker"
              value={form.values.hasCaretaker}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("hasCaretaker")}
              touched={form.isFieldTouched("hasCaretaker")}
              options={caretakerOptions}
              required
            />
          </div>

          {/* Urgent Needs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Urgent Needs (select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {urgentNeedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleNeed(option.value)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    selectedNeeds.includes(option.value)
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-8">
            <TextareaField
              label="Additional Information"
              name="additionalInfo"
              value={form.values.additionalInfo || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("additionalInfo")}
              touched={form.isFieldTouched("additionalInfo")}
              rows={3}
              placeholder="Any other details about the colony..."
            />
          </div>

          {/* Submitter Info */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 pt-6 border-t">
            Your Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Your Name"
              name="submitterName"
              type="text"
              value={form.values.submitterName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("submitterName")}
              touched={form.isFieldTouched("submitterName")}
              required
            />
            <FormField
              label="Email"
              name="submitterEmail"
              type="email"
              value={form.values.submitterEmail}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("submitterEmail")}
              touched={form.isFieldTouched("submitterEmail")}
              required
            />
            <FormField
              label="Phone"
              name="submitterPhone"
              type="tel"
              value={form.values.submitterPhone || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("submitterPhone")}
              touched={form.isFieldTouched("submitterPhone")}
            />
            <SelectField
              label="Your Relationship to Colony"
              name="submitterRelation"
              value={form.values.submitterRelation}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("submitterRelation")}
              touched={form.isFieldTouched("submitterRelation")}
              options={relationOptions}
              required
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors disabled:bg-gray-300"
          >
            Submit Colony Report
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
