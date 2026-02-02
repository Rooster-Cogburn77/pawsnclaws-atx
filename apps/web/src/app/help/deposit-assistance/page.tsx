"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { depositAssistanceSchema, type DepositAssistanceFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const petSpeciesOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "other", label: "Other" },
];

const defaultValues: DepositAssistanceFormData = {
  name: "",
  email: "",
  phone: "",
  petName: "",
  petSpecies: "dog",
  landlordName: "",
  depositAmount: 0,
  monthlyIncome: undefined,
  situation: "",
  canRepay: true,
};

export default function DepositAssistancePage() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const form = useFormValidation({
    schema: depositAssistanceSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/deposit-assistance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }
    },
  });

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to our Pet Deposit Assistance program. We&apos;ll
            review your application and contact you within 3-5 business days.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            In the meantime, don&apos;t sign a lease that would require you to give up
            your pet. We&apos;ll work with you to find a solution.
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Deposit Assistance
          </h1>
          <p className="text-gray-600">
            Can&apos;t afford a pet deposit? We can help cover it so you don&apos;t have to
            give up your furry family member.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-3">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <div className="font-bold mb-1">1. Apply</div>
              <p>Tell us about your situation and how much you need.</p>
            </div>
            <div>
              <div className="font-bold mb-1">2. We Pay</div>
              <p>If approved, we pay the deposit directly to your landlord.</p>
            </div>
            <div>
              <div className="font-bold mb-1">3. You Repay</div>
              <p>Pay us back over time (0% interest) as you&apos;re able.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          <h3 className="font-bold text-gray-900 mb-4">Your Information</h3>
          <div className="space-y-4 mb-6">
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
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Pet Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
              name="petSpecies"
              value={form.values.petSpecies}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("petSpecies")}
              touched={form.isFieldTouched("petSpecies")}
              options={petSpeciesOptions}
              required
            />
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Housing Details</h3>
          <div className="space-y-4 mb-6">
            <FormField
              label="Landlord/Property Name"
              name="landlordName"
              type="text"
              value={form.values.landlordName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("landlordName")}
              touched={form.isFieldTouched("landlordName")}
              placeholder="Name of landlord or apartment complex"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Deposit Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="depositAmount"
                    value={form.values.depositAmount || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      form.setValue("depositAmount", value);
                    }}
                    onBlur={() => form.setTouched("depositAmount")}
                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none ${
                      form.isFieldTouched("depositAmount") && form.getFieldError("depositAmount")
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-500"
                    }`}
                    placeholder="0"
                    min="50"
                    max="2000"
                  />
                </div>
                {form.isFieldTouched("depositAmount") && form.getFieldError("depositAmount") && (
                  <p className="mt-1 text-sm text-red-600">{form.getFieldError("depositAmount")}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={form.values.monthlyIncome ?? ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
                      form.setValue("monthlyIncome", value);
                    }}
                    onBlur={() => form.setTouched("monthlyIncome")}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Your Situation</h3>
          <div className="space-y-4 mb-6">
            <TextareaField
              label="Tell us about your situation"
              name="situation"
              value={form.values.situation}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("situation")}
              touched={form.isFieldTouched("situation")}
              rows={4}
              placeholder="Why do you need assistance? What would happen to your pet without this help?"
              required
            />

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={form.values.canRepay}
                onChange={(e) => form.setValue("canRepay", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">
                  I can repay this loan over time
                </span>
                <span className="text-sm text-gray-600 block">
                  We offer 0% interest repayment plans. Typical: $25-50/month.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">
                  I understand and agree <span className="text-red-500">*</span>
                </span>
                <span className="text-sm text-gray-600 block">
                  Funds are limited. If approved, I agree to a repayment plan.
                  This is a loan, not a grant (though we can discuss hardship
                  cases).
                </span>
              </div>
            </label>
          </div>

          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid && agreeToTerms}
            loadingText="Submitting..."
          >
            Submit Application
          </SubmitButton>
        </form>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">Common Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">
                How much can you help with?
              </p>
              <p className="text-gray-600">
                We typically assist with deposits up to $500. Larger amounts
                considered case-by-case.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                How long do I have to repay?
              </p>
              <p className="text-gray-600">
                We&apos;ll work out a plan that fits your budget. Most people repay
                within 6-12 months.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                What if I can&apos;t repay?
              </p>
              <p className="text-gray-600">
                Life happens. If your situation changes, talk to us. We&apos;d rather
                keep pets with families than stress you out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
