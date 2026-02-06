"use client";

import { useState } from "react";
import { useFormValidation } from "@/hooks";
import { charlotteFosterSchema, type CharlotteFosterFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const fosterTypes = [
  { id: "kittens", label: "Kittens", description: "Bottle babies or weaned kittens" },
  { id: "adult-cats", label: "Adult Cats", description: "Friendly strays needing socialization" },
  { id: "medical", label: "Medical Fosters", description: "Cats recovering from surgery/illness" },
  { id: "pregnant", label: "Pregnant Moms", description: "Expecting cats until kittens are weaned" },
  { id: "feral-friendly", label: "Barn Cats", description: "Semi-feral cats needing safe outdoor homes" },
];

const housingOptions = [
  { value: "", label: "Select..." },
  { value: "house", label: "House (owned)" },
  { value: "house-rent", label: "House (rented)" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo/Townhouse" },
  { value: "other", label: "Other" },
];

const otherPetsOptions = [
  { value: "", label: "Select..." },
  { value: "no", label: "No other pets" },
  { value: "cats", label: "Cats only" },
  { value: "dogs", label: "Dogs only" },
  { value: "both", label: "Cats and dogs" },
  { value: "other", label: "Other animals" },
];

const experienceOptions = [
  { value: "", label: "Select..." },
  { value: "none", label: "First time foster" },
  { value: "some", label: "Some fostering experience" },
  { value: "experienced", label: "Experienced foster" },
  { value: "professional", label: "Vet tech or professional" },
];

const defaultValues: CharlotteFosterFormData = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  housingType: "",
  hasOtherPets: "",
  fosterType: [],
  experience: "",
  message: "",
};

export default function CharlotteFosterPage() {
  const [selectedFosterTypes, setSelectedFosterTypes] = useState<string[]>([]);

  const form = useFormValidation({
    schema: charlotteFosterSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/foster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fosterTypes: selectedFosterTypes,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }
    },
  });

  const toggleFosterType = (typeId: string) => {
    const updated = selectedFosterTypes.includes(typeId)
      ? selectedFosterTypes.filter((t) => t !== typeId)
      : [...selectedFosterTypes, typeId];
    setSelectedFosterTypes(updated);
    form.setValue("fosterType", updated);
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in fostering! We&apos;ll review your
            application and reach out within 48 hours.
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
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Foster for Charlotte
          </h1>
          <p className="text-xl text-gray-600">
            Open your home temporarily and save lives
          </p>
        </div>

        {/* What We Provide */}
        <div className="bg-teal-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-teal-800 mb-3">What We Provide</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-teal-700 text-sm">
            <li>✓ All food and supplies</li>
            <li>✓ Litter and litter boxes</li>
            <li>✓ All veterinary care</li>
            <li>✓ Crates and carriers</li>
            <li>✓ 24/7 support line</li>
            <li>✓ Foster community group</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Foster Application</h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Full Name"
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
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("phone")}
              touched={form.isFieldTouched("phone")}
              required
            />
            <FormField
              label="ZIP Code"
              name="zip"
              type="text"
              value={form.values.zip}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("zip")}
              touched={form.isFieldTouched("zip")}
              placeholder="28XXX"
              required
            />
          </div>

          {/* Housing */}
          <div className="mb-6">
            <SelectField
              label="Housing Type"
              name="housingType"
              value={form.values.housingType}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("housingType")}
              touched={form.isFieldTouched("housingType")}
              options={housingOptions}
              required
            />
          </div>

          {/* Other Pets */}
          <div className="mb-6">
            <SelectField
              label="Do you have other pets?"
              name="hasOtherPets"
              value={form.values.hasOtherPets}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("hasOtherPets")}
              touched={form.isFieldTouched("hasOtherPets")}
              options={otherPetsOptions}
              required
            />
          </div>

          {/* Foster Types */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What would you like to foster? (select all that apply) *
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {fosterTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleFosterType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFosterTypes.includes(type.id)
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
            {form.isFieldTouched("fosterType") && form.getFieldError("fosterType") && (
              <p className="mt-2 text-sm text-red-600">{form.getFieldError("fosterType")}</p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <SelectField
              label="Foster/rescue experience"
              name="experience"
              value={form.values.experience || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("experience")}
              touched={form.isFieldTouched("experience")}
              options={experienceOptions}
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <TextareaField
              label="Tell us about yourself and your home"
              name="message"
              value={form.values.message || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              rows={4}
              placeholder="What's your living situation like? Any experience with cats? Why do you want to foster?"
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid && selectedFosterTypes.length > 0}
            loadingText="Submitting..."
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors disabled:bg-gray-300"
          >
            Submit Application
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
