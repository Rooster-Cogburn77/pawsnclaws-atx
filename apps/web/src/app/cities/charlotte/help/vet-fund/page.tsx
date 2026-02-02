"use client";

import { useFormValidation } from "@/hooks";
import { charlotteVetFundSchema, type CharlotteVetFundFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const petTypeOptions = [
  { value: "", label: "Select..." },
  { value: "cat-owned", label: "Cat (my pet)" },
  { value: "cat-community", label: "Cat (community/feral)" },
  { value: "dog", label: "Dog" },
  { value: "other", label: "Other" },
];

const canContributeOptions = [
  { value: "", label: "Select..." },
  { value: "none", label: "No, I cannot contribute" },
  { value: "some", label: "Yes, I can pay part" },
  { value: "half", label: "I can pay about half" },
];

const defaultValues: CharlotteVetFundFormData = {
  name: "",
  email: "",
  phone: "",
  petName: "",
  petType: "",
  situation: "",
  vetName: "",
  vetPhone: "",
  estimatedCost: "",
  canContribute: "",
  message: "",
};

export default function CharlotteVetFundPage() {
  const form = useFormValidation({
    schema: charlotteVetFundSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/vet-fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request");
      }
    },
  });

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏥</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your vet fund request. Our team will review it
            and get back to you within 24-48 hours. For emergencies, please
            contact the vet directly.
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
          <span className="text-5xl mb-4 block">🏥</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency Vet Fund
          </h1>
          <p className="text-xl text-gray-600">
            Financial help for unexpected veterinary emergencies
          </p>
        </div>

        {/* Eligibility */}
        <div className="bg-teal-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-teal-900 mb-3">Eligibility</h2>
          <ul className="space-y-2 text-teal-800 text-sm">
            <li>✓ Charlotte/Mecklenburg County residents</li>
            <li>✓ Unexpected emergency (not routine care)</li>
            <li>✓ Demonstrated financial need</li>
            <li>✓ Pet owner OR community cat caretaker</li>
          </ul>
          <p className="mt-4 text-teal-700 text-sm">
            <strong>Note:</strong> Funds are paid directly to the veterinarian,
            not to individuals. Maximum assistance varies based on available funds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Request Assistance</h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Contact Info */}
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
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("phone")}
              touched={form.isFieldTouched("phone")}
              required
            />
          </div>

          {/* Pet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Pet Name"
              name="petName"
              type="text"
              value={form.values.petName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petName")}
              touched={form.isFieldTouched("petName")}
              required
            />
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
          </div>

          {/* Situation */}
          <div className="mb-6">
            <TextareaField
              label="What happened?"
              name="situation"
              value={form.values.situation}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("situation")}
              touched={form.isFieldTouched("situation")}
              rows={4}
              placeholder="Describe the emergency and what treatment is needed..."
              required
            />
          </div>

          {/* Vet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Veterinarian/Clinic Name"
              name="vetName"
              type="text"
              value={form.values.vetName || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("vetName")}
              touched={form.isFieldTouched("vetName")}
            />
            <FormField
              label="Vet Phone"
              name="vetPhone"
              type="tel"
              value={form.values.vetPhone || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("vetPhone")}
              touched={form.isFieldTouched("vetPhone")}
            />
          </div>

          {/* Cost */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Estimated Cost"
              name="estimatedCost"
              type="text"
              value={form.values.estimatedCost}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("estimatedCost")}
              touched={form.isFieldTouched("estimatedCost")}
              placeholder="$"
              required
            />
            <SelectField
              label="Can you contribute any amount?"
              name="canContribute"
              value={form.values.canContribute || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("canContribute")}
              touched={form.isFieldTouched("canContribute")}
              options={canContributeOptions}
            />
          </div>

          {/* Additional */}
          <div className="mb-8">
            <TextareaField
              label="Anything else we should know?"
              name="message"
              value={form.values.message || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              rows={3}
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors disabled:bg-gray-300"
          >
            Submit Request
          </SubmitButton>

          <p className="text-center text-sm text-gray-500 mt-4">
            We review requests within 24-48 hours. For immediate emergencies,
            please contact the vet directly.
          </p>
        </form>
      </div>
    </div>
  );
}
