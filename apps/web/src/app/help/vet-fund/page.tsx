"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Force scroll to top on page load
function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => window.scrollTo(0, 0), 0);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t3 = setTimeout(() => window.scrollTo(0, 0), 100);
    const t4 = setTimeout(() => window.scrollTo(0, 0), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);
}
import { useFormValidation } from "@/hooks";
import { vetFundSchema, type VetFundFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, CheckboxField, FormError, SubmitButton } from "@/components/FormField";

const petSpeciesOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "other", label: "Other" },
];

const defaultValues: VetFundFormData = {
  name: "",
  email: "",
  phone: "",
  petName: "",
  petSpecies: "dog",
  vetClinic: "",
  diagnosis: "",
  estimatedCost: 0,
  isEmergency: false,
  situation: "",
  hasAppliedElsewhere: false,
  otherFunding: "",
};

export default function VetFundApplicationPage() {
  useScrollToTop();
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [proofOfIncome, setProofOfIncome] = useState(false);

  const form = useFormValidation({
    schema: vetFundSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/help/vet-fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          proofOfIncome,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }
    },
  });

  // Validate current step before proceeding
  const canProceedToStep2 = () => {
    const { name, email, phone } = form.values;
    return name.length >= 2 && email.includes("@") && phone.length > 0;
  };

  const canProceedToStep3 = () => {
    const { petName, vetClinic, diagnosis, estimatedCost } = form.values;
    return petName.length > 0 && vetClinic.length > 0 && diagnosis.length > 0 && estimatedCost >= 50;
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">📬</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your emergency vet fund application. Our team will
            review it and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            If this is a life-threatening emergency and you haven&apos;t heard from
            us, please proceed with treatment and we&apos;ll work with you on
            funding.
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
          <span className="text-4xl mb-4 block">🏥</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emergency Vet Fund Application
          </h1>
          <p className="text-gray-600">
            We help Austin pet owners facing emergency vet bills they can&apos;t
            afford. Fill out this form and we&apos;ll review your case.
          </p>
        </div>

        {/* Eligibility Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Before You Apply</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Must be an Austin-area resident</li>
            <li>• Must be an emergency/urgent medical situation</li>
            <li>• Funds are limited - we prioritize life-threatening cases</li>
            <li>• We pay the vet directly, not the pet owner</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 ${
                      step > s ? "bg-amber-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Contact Information
              </h2>
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
              <button
                type="button"
                onClick={() => {
                  form.setTouched("name");
                  form.setTouched("email");
                  form.setTouched("phone");
                  if (canProceedToStep2()) {
                    setStep(2);
                  }
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Pet & Vet Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Pet & Veterinary Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
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
                  label="Species"
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
              <FormField
                label="Veterinary Clinic"
                name="vetClinic"
                type="text"
                value={form.values.vetClinic}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("vetClinic")}
                touched={form.isFieldTouched("vetClinic")}
                placeholder="Name and location of the vet"
                required
              />
              <TextareaField
                label="Diagnosis / What's Wrong"
                name="diagnosis"
                value={form.values.diagnosis}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("diagnosis")}
                touched={form.isFieldTouched("diagnosis")}
                rows={3}
                placeholder="Describe the medical issue and what treatment is needed"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Cost <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={form.values.estimatedCost || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 0 : Number(e.target.value);
                      form.setValue("estimatedCost", value);
                    }}
                    onBlur={() => form.setTouched("estimatedCost")}
                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none ${
                      form.isFieldTouched("estimatedCost") && form.getFieldError("estimatedCost")
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-500"
                    }`}
                    placeholder="0"
                    min="50"
                    max="5000"
                  />
                </div>
                {form.isFieldTouched("estimatedCost") && form.getFieldError("estimatedCost") && (
                  <p className="mt-1 text-sm text-red-600">{form.getFieldError("estimatedCost")}</p>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    form.setTouched("petName");
                    form.setTouched("vetClinic");
                    form.setTouched("diagnosis");
                    form.setTouched("estimatedCost");
                    if (canProceedToStep3()) {
                      setStep(3);
                    }
                  }}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Situation & Submit */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tell Us Your Situation
              </h2>
              <TextareaField
                label="Why do you need assistance?"
                name="situation"
                value={form.values.situation}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("situation")}
                touched={form.isFieldTouched("situation")}
                rows={4}
                placeholder="Please share your circumstances and why you're unable to cover this cost..."
                required
              />

              <CheckboxField
                name="isEmergency"
                label="This is a life-threatening emergency"
                description="Check this if your pet needs immediate care"
                checked={form.values.isEmergency}
                onChange={(e) => form.setValue("isEmergency", e.target.checked)}
              />

              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={proofOfIncome}
                  onChange={(e) => setProofOfIncome(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    I can provide proof of income/hardship if requested
                  </span>
                  <span className="text-sm text-gray-600 block">
                    This helps us prioritize limited funds
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    I understand and agree <span className="text-red-500">*</span>
                  </span>
                  <span className="text-sm text-gray-600 block">
                    Funds are limited and not guaranteed. We will pay the vet
                    directly if approved. I agree to provide updates on my pet&apos;s
                    recovery.
                  </span>
                </div>
              </label>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <SubmitButton
                  isSubmitting={form.isSubmitting}
                  isValid={form.isValid && agreedToTerms}
                  loadingText="Submitting..."
                >
                  Submit Application
                </SubmitButton>
              </div>
            </div>
          )}
        </form>

        {/* Alternative Resources */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
          <h3 className="font-bold text-gray-900 mb-3">Other Resources</h3>
          <p className="text-sm text-gray-600 mb-4">
            While you wait for a response, here are other options:
          </p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>Emancipet</strong> - Low-cost vet care:{" "}
              <a href="https://emancipet.org" className="text-amber-600 hover:underline">
                emancipet.org
              </a>
            </li>
            <li>
              • <strong>CareCredit</strong> - Medical financing for pets
            </li>
            <li>
              • <strong>RedRover Relief</strong> - National pet assistance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
