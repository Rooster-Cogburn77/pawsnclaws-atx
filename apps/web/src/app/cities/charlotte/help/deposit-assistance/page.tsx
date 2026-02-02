"use client";

import { useFormValidation } from "@/hooks";
import { charlotteDepositSchema, type CharlotteDepositFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const petTypeOptions = [
  { value: "", label: "Select..." },
  { value: "cat", label: "Cat(s)" },
  { value: "dog", label: "Dog(s)" },
  { value: "both", label: "Cats and Dogs" },
];

const defaultValues: CharlotteDepositFormData = {
  name: "",
  email: "",
  phone: "",
  moveDate: "",
  currentAddress: "",
  newAddress: "",
  petType: "",
  petCount: "",
  depositAmount: "",
  situation: "",
};

export default function CharlotteDepositAssistancePage() {
  const form = useFormValidation({
    schema: charlotteDepositSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/deposit-assistance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          city: "charlotte",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }
    },
  });

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your deposit assistance application. Our team will
            review it and contact you within 3-5 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet Deposit Assistance
          </h1>
          <p className="text-xl text-gray-600">
            0% interest loans to help you keep your pet when moving
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-blue-900 mb-3">How It Works</h2>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✓ We provide 0% interest loans for pet deposits</li>
            <li>✓ Funds are paid directly to your landlord</li>
            <li>✓ Flexible repayment terms based on your situation</li>
            <li>✓ No credit check required</li>
          </ul>
          <p className="mt-4 text-blue-700 text-sm">
            <strong>Eligibility:</strong> Charlotte/Mecklenburg County residents
            facing a pet deposit that would otherwise cause surrender.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Apply for Assistance</h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Contact */}
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
              label="Move Date"
              name="moveDate"
              type="date"
              value={form.values.moveDate}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("moveDate")}
              touched={form.isFieldTouched("moveDate")}
              required
            />
          </div>

          {/* Addresses */}
          <div className="mb-6">
            <FormField
              label="Current Address"
              name="currentAddress"
              type="text"
              value={form.values.currentAddress || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("currentAddress")}
              touched={form.isFieldTouched("currentAddress")}
            />
          </div>
          <div className="mb-6">
            <FormField
              label="New Address (if known)"
              name="newAddress"
              type="text"
              value={form.values.newAddress || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("newAddress")}
              touched={form.isFieldTouched("newAddress")}
            />
          </div>

          {/* Pet & Deposit */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
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
              label="Number of Pets"
              name="petCount"
              type="number"
              value={form.values.petCount}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petCount")}
              touched={form.isFieldTouched("petCount")}
              required
            />
            <FormField
              label="Deposit Amount"
              name="depositAmount"
              type="text"
              value={form.values.depositAmount}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("depositAmount")}
              touched={form.isFieldTouched("depositAmount")}
              placeholder="$"
              required
            />
          </div>

          {/* Situation */}
          <div className="mb-8">
            <TextareaField
              label="Tell us about your situation"
              name="situation"
              value={form.values.situation || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("situation")}
              touched={form.isFieldTouched("situation")}
              rows={4}
              placeholder="Why do you need help with the deposit? Any other relevant details..."
            />
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
            className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300"
          >
            Submit Application
          </SubmitButton>

          <p className="text-center text-sm text-gray-500 mt-4">
            We&apos;ll review your application within 3-5 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
