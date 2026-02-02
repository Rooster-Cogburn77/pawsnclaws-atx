"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { lostFoundSchema, type LostFoundFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const speciesOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "other", label: "Other" },
];

function ReportFormContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "found" ? "found" : "lost";

  const defaultValues: LostFoundFormData = {
    type: initialType as "lost" | "found",
    species: "dog",
    breed: "",
    name: "",
    color: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    microchipId: "",
    photos: [],
  };

  const form = useFormValidation({
    schema: lostFoundSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/lost-found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit report");
      }
    },
  });

  const isLost = form.values.type === "lost";

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">
            {isLost ? "🔴" : "🟢"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Report Submitted
          </h1>
          <p className="text-gray-600 mb-6">
            {isLost
              ? "We've posted your lost pet report. We hope you're reunited soon!"
              : "Thank you for reporting this found pet. You're helping get them home!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lost-found"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              View All Listings
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report a {isLost ? "Lost" : "Found"} Pet
          </h1>
          <p className="text-gray-600">
            {isLost
              ? "We'll help spread the word to find your pet."
              : "Help this pet get back to their family."}
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => form.setValue("type", "lost")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                isLost
                  ? "bg-red-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🔴 Lost Pet
            </button>
            <button
              type="button"
              onClick={() => form.setValue("type", "found")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                !isLost
                  ? "bg-green-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🟢 Found Pet
            </button>
          </div>

          {/* Pet Info */}
          <h3 className="font-bold text-gray-900 mb-4">Pet Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <SelectField
              label="Species"
              name="species"
              value={form.values.species}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("species")}
              touched={form.isFieldTouched("species")}
              options={speciesOptions}
              required
            />
            <FormField
              label="Breed"
              name="breed"
              type="text"
              value={form.values.breed || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("breed")}
              touched={form.isFieldTouched("breed")}
              placeholder="e.g. Labrador, Tabby"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {isLost && (
              <FormField
                label="Pet Name"
                name="name"
                type="text"
                value={form.values.name || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("name")}
                touched={form.isFieldTouched("name")}
              />
            )}
            <div className={isLost ? "" : "col-span-2"}>
              <FormField
                label="Color/Markings"
                name="color"
                type="text"
                value={form.values.color}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("color")}
                touched={form.isFieldTouched("color")}
                placeholder="e.g. Black and white, orange tabby"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <TextareaField
              label="Description"
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("description")}
              touched={form.isFieldTouched("description")}
              rows={3}
              placeholder={
                isLost
                  ? "Describe your pet, any distinguishing features, collar, tags, temperament..."
                  : "Describe the pet, where exactly you found them, their condition..."
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <FormField
              label={isLost ? "Last Seen Location" : "Found Location"}
              name="location"
              type="text"
              value={form.values.location}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("location")}
              touched={form.isFieldTouched("location")}
              placeholder="Be specific: street, neighborhood, landmarks"
              required
            />
            <FormField
              label="Date"
              name="date"
              type="date"
              value={form.values.date}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("date")}
              touched={form.isFieldTouched("date")}
              required
            />
          </div>

          {isLost && (
            <div className="mb-6">
              <FormField
                label="Microchip ID (if known)"
                name="microchipId"
                type="text"
                value={form.values.microchipId || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("microchipId")}
                touched={form.isFieldTouched("microchipId")}
              />
            </div>
          )}

          {/* Contact Info */}
          <h3 className="font-bold text-gray-900 mb-4 mt-8">
            Your Contact Information
          </h3>
          <div className="space-y-4 mb-6">
            <FormField
              label="Name"
              name="contactName"
              type="text"
              value={form.values.contactName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("contactName")}
              touched={form.isFieldTouched("contactName")}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Phone"
                name="contactPhone"
                type="tel"
                value={form.values.contactPhone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("contactPhone")}
                touched={form.isFieldTouched("contactPhone")}
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
          </div>

          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
          >
            <span className={isLost ? "text-white" : "text-white"}>
              Submit {isLost ? "Lost" : "Found"} Report
            </span>
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ReportFormContent />
    </Suspense>
  );
}
