"use client";

import { useState } from "react";
import { useFormValidation } from "@/hooks";
import { charlotteVolunteerSchema, type CharlotteVolunteerFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const volunteerRoles = [
  { id: "colony-care", label: "Colony Caretaker", description: "Feed and monitor a local colony" },
  { id: "tnr-helper", label: "TNR Helper", description: "Assist with trapping and transport" },
  { id: "foster", label: "Foster Parent", description: "Provide temporary homes" },
  { id: "transport", label: "Transport Driver", description: "Drive cats to/from appointments" },
  { id: "events", label: "Events & Outreach", description: "Help at community events" },
  { id: "admin", label: "Admin & Social Media", description: "Help with communications" },
];

const experienceOptions = [
  { value: "", label: "Select..." },
  { value: "none", label: "No experience (that's okay!)" },
  { value: "pet-owner", label: "Pet owner" },
  { value: "some", label: "Some rescue/shelter experience" },
  { value: "experienced", label: "Experienced in animal rescue" },
  { value: "professional", label: "Vet tech or professional" },
];

const availabilityOptions = [
  { value: "", label: "Select..." },
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "evenings", label: "Evenings only" },
  { value: "flexible", label: "Flexible schedule" },
  { value: "occasional", label: "Occasional/events only" },
];

const defaultValues: CharlotteVolunteerFormData = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  roles: [],
  experience: "",
  availability: "",
  message: "",
};

export default function CharlotteVolunteerPage() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const form = useFormValidation({
    schema: charlotteVolunteerSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          roles: selectedRoles,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }
    },
  });

  const toggleRole = (roleId: string) => {
    const updated = selectedRoles.includes(roleId)
      ? selectedRoles.filter((r) => r !== roleId)
      : [...selectedRoles, roleId];
    setSelectedRoles(updated);
    form.setValue("roles", updated);
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🎉</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Volunteering!
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your application and will be in touch soon.
            Charlotte&apos;s cats thank you!
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
          <span className="text-5xl mb-4 block">🤝</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer in Charlotte
          </h1>
          <p className="text-xl text-gray-600">
            Join our team and help make a difference for community cats
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
              value={form.values.phone || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("phone")}
              touched={form.isFieldTouched("phone")}
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

          {/* Roles */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I&apos;m interested in: (select all that apply) *
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {volunteerRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => toggleRole(role.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedRoles.includes(role.id)
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{role.label}</div>
                  <div className="text-sm text-gray-500">{role.description}</div>
                </button>
              ))}
            </div>
            {form.isFieldTouched("roles") && form.getFieldError("roles") && (
              <p className="mt-2 text-sm text-red-600">{form.getFieldError("roles")}</p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <SelectField
              label="Experience with cats/animals"
              name="experience"
              value={form.values.experience || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("experience")}
              touched={form.isFieldTouched("experience")}
              options={experienceOptions}
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <SelectField
              label="Availability"
              name="availability"
              value={form.values.availability || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("availability")}
              touched={form.isFieldTouched("availability")}
              options={availabilityOptions}
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <TextareaField
              label="Anything else you'd like us to know?"
              name="message"
              value={form.values.message || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              rows={4}
              placeholder="Tell us about yourself, your experience, or any questions..."
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid && selectedRoles.length > 0}
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
