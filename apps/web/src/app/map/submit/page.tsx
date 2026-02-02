"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { colonySubmissionSchema, type ColonySubmissionFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const tnrStatusOptions = [
  { value: "unknown", label: "Unknown" },
  { value: "none", label: "None fixed" },
  { value: "partial", label: "Some fixed" },
  { value: "all", label: "All fixed" },
];

const caretakerOptions = [
  { value: "unknown", label: "Unknown" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "me", label: "I am the caretaker" },
];

const relationOptions = [
  { value: "observer", label: "I've seen these cats" },
  { value: "caretaker", label: "I feed/care for this colony" },
  { value: "neighbor", label: "I live nearby" },
  { value: "property-owner", label: "I own the property" },
  { value: "other", label: "Other" },
];

const urgentNeedOptions = [
  { value: "tnr-needed", label: "TNR needed (unfixed cats)" },
  { value: "food-needed", label: "Regular food supply needed" },
  { value: "medical", label: "Cats need medical attention" },
  { value: "shelter", label: "Weather shelter needed" },
  { value: "caretaker", label: "Looking for caretaker" },
  { value: "threatened", label: "Colony threatened (construction, complaints)" },
];

const defaultValues: ColonySubmissionFormData = {
  colonyName: "",
  locationDescription: "",
  address: "",
  latitude: null,
  longitude: null,
  estimatedCats: 1,
  tnrStatus: "unknown",
  hasCaretaker: false,
  caretakerContact: "",
  feedingSchedule: "",
  urgentNeeds: "",
  additionalInfo: "",
  submitterName: "",
  submitterEmail: "",
  submitterPhone: "",
  submitterRelation: "observer",
};

export default function SubmitColonyPage() {
  const [useManualCoords, setUseManualCoords] = useState(false);
  const [urgentNeeds, setUrgentNeeds] = useState<string[]>([]);
  const [hasCaretakerValue, setHasCaretakerValue] = useState("unknown");

  const form = useFormValidation({
    schema: colonySubmissionSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/colonies/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          urgentNeeds: urgentNeeds.join(", "),
          hasCaretaker: hasCaretakerValue === "yes" || hasCaretakerValue === "me",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit colony");
      }
    },
  });

  const handleUrgentNeedToggle = (value: string) => {
    setUrgentNeeds((prev) =>
      prev.includes(value)
        ? prev.filter((n) => n !== value)
        : [...prev, value]
    );
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", parseFloat(position.coords.latitude.toFixed(6)));
          form.setValue("longitude", parseFloat(position.coords.longitude.toFixed(6)));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enter coordinates manually or describe the location in detail.");
          setUseManualCoords(true);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setUseManualCoords(true);
    }
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🐱</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Colony Submitted for Review
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for helping us track community cats! Our team will review
            your submission and add it to our map if verified. We may contact you
            for additional information.
          </p>
          <div className="space-y-4">
            <Link
              href="/map"
              className="block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              View Colony Map
            </Link>
            <button
              onClick={() => {
                form.reset();
                setUrgentNeeds([]);
                setHasCaretakerValue("unknown");
              }}
              className="block w-full px-6 py-3 text-amber-600 font-medium hover:underline"
            >
              Submit Another Colony
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4"
          >
            ← Back to Map
          </Link>
          <span className="block text-5xl mb-4">🐱</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report a Cat Colony
          </h1>
          <p className="text-gray-600">
            Help us track and support community cat colonies in Austin. All
            submissions are reviewed before being added to our public map.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-blue-900 mb-1">Privacy Note</h3>
          <p className="text-sm text-blue-800">
            Exact locations are only visible to verified volunteers and caretakers.
            The public map shows approximate areas to protect colonies from harm.
            Your contact information is never shared publicly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Colony Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Colony Information
            </h2>

            <div className="space-y-4">
              <FormField
                label="Colony Name (optional)"
                name="colonyName"
                type="text"
                value={form.values.colonyName || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("colonyName")}
                touched={form.isFieldTouched("colonyName")}
                placeholder="e.g., Riverside Colony, Mueller Park Cats"
                hint="Give the colony a name to help identify it"
              />

              <TextareaField
                label="Location Description"
                name="locationDescription"
                value={form.values.locationDescription}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("locationDescription")}
                touched={form.isFieldTouched("locationDescription")}
                rows={3}
                placeholder="Describe where the colony is located (e.g., 'Behind the HEB on Riverside, near the dumpsters')"
                required
              />

              <FormField
                label="Nearest Address (optional)"
                name="address"
                type="text"
                value={form.values.address || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("address")}
                touched={form.isFieldTouched("address")}
                placeholder="Street address or cross streets"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPS Coordinates (optional but helpful)
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    📍 Use My Location
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseManualCoords(!useManualCoords)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Enter Manually
                  </button>
                </div>
                {(useManualCoords || form.values.latitude) && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      step="0.000001"
                      value={form.values.latitude ?? ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? null : parseFloat(e.target.value);
                        form.setValue("latitude", value);
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="Latitude (e.g., 30.2672)"
                    />
                    <input
                      type="number"
                      step="0.000001"
                      value={form.values.longitude ?? ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? null : parseFloat(e.target.value);
                        form.setValue("longitude", value);
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="Longitude (e.g., -97.7431)"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Number of Cats <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={form.values.estimatedCats || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 1 : parseInt(e.target.value);
                      form.setValue("estimatedCats", value);
                    }}
                    onBlur={() => form.setTouched("estimatedCats")}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                      form.isFieldTouched("estimatedCats") && form.getFieldError("estimatedCats")
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-500"
                    }`}
                    placeholder="e.g., 5"
                  />
                  {form.isFieldTouched("estimatedCats") && form.getFieldError("estimatedCats") && (
                    <p className="mt-1 text-sm text-red-600">{form.getFieldError("estimatedCats")}</p>
                  )}
                </div>
                <SelectField
                  label="TNR Status"
                  name="tnrStatus"
                  value={form.values.tnrStatus || "unknown"}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("tnrStatus")}
                  touched={form.isFieldTouched("tnrStatus")}
                  options={tnrStatusOptions}
                />
              </div>
            </div>
          </div>

          {/* Care Status */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Care Status
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Does this colony have a caretaker?
                </label>
                <select
                  value={hasCaretakerValue}
                  onChange={(e) => setHasCaretakerValue(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  {caretakerOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {(hasCaretakerValue === "yes" || hasCaretakerValue === "me") && (
                <FormField
                  label="Caretaker Contact (optional)"
                  name="caretakerContact"
                  type="text"
                  value={form.values.caretakerContact || ""}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("caretakerContact")}
                  touched={form.isFieldTouched("caretakerContact")}
                  placeholder="Name, phone, or email"
                  hint="Only visible to our volunteer coordinators"
                />
              )}

              <FormField
                label="Feeding Schedule (if known)"
                name="feedingSchedule"
                type="text"
                value={form.values.feedingSchedule || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("feedingSchedule")}
                touched={form.isFieldTouched("feedingSchedule")}
                placeholder="e.g., Daily at 6am and 6pm, Every other day"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgent Needs (select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {urgentNeedOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        urgentNeeds.includes(option.value)
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={urgentNeeds.includes(option.value)}
                        onChange={() => handleUrgentNeedToggle(option.value)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          urgentNeeds.includes(option.value)
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {urgentNeeds.includes(option.value) && "✓"}
                      </span>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <TextareaField
                label="Additional Information"
                name="additionalInfo"
                value={form.values.additionalInfo || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("additionalInfo")}
                touched={form.isFieldTouched("additionalInfo")}
                rows={3}
                placeholder="Any other details about the colony (health conditions, friendly vs feral, history, etc.)"
              />
            </div>
          </div>

          {/* Your Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Your Information
            </h2>

            <div className="space-y-4">
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
                label="Phone (optional)"
                name="submitterPhone"
                type="tel"
                value={form.values.submitterPhone || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("submitterPhone")}
                touched={form.isFieldTouched("submitterPhone")}
              />

              <SelectField
                label="Your Relationship to This Colony"
                name="submitterRelation"
                value={form.values.submitterRelation || "observer"}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("submitterRelation")}
                touched={form.isFieldTouched("submitterRelation")}
                options={relationOptions}
              />
            </div>
          </div>

          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
          >
            Submit Colony for Review
          </SubmitButton>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting, you confirm this information is accurate to the best of
            your knowledge. False reports may result in being blocked from future
            submissions.
          </p>
        </form>
      </div>
    </div>
  );
}
