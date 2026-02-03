"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { tributeSchema, type TributeFormData } from "@/lib/validations";
import { FormField, TextareaField, CheckboxField, RadioGroup, FormError, FormSuccess, SubmitButton } from "@/components/FormField";
import { formatAmount, calculateFee } from "@/lib/stripe";

const defaultValues: TributeFormData = {
  tributeType: "memorial",
  honoreeType: "pet",
  honoreeName: "",
  message: "",
  notifyRecipient: false,
  recipientName: "",
  recipientEmail: "",
  donorName: "",
  donorEmail: "",
  amount: 25,
  isAnonymous: false,
};

const amountOptions = [
  { amount: 2500, label: "$25", description: "One week of colony food" },
  { amount: 5000, label: "$50", description: "Emergency vet visit co-pay" },
  { amount: 10000, label: "$100", description: "Full vaccination series" },
  { amount: 25000, label: "$250", description: "One month of shelter care" },
];

export default function TributePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [coverFees, setCoverFees] = useState(true);

  const amount = selectedAmount || (customAmount ? parseInt(customAmount) * 100 : 0);
  const fee = calculateFee(amount);
  const totalAmount = coverFees ? amount + fee : amount;

  const form = useFormValidation({
    schema: tributeSchema,
    initialValues: { ...defaultValues, amount: amount / 100 },
    onSubmit: async (data) => {
      const response = await fetch("/api/donations/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          donationType: "one-time",
          coverFees,
          donorName: data.isAnonymous ? "Anonymous" : data.donorName,
          donorEmail: data.donorEmail,
          tribute: {
            type: data.tributeType,
            honoreeType: data.honoreeType,
            honoreeName: data.honoreeName,
            message: data.message,
            notifyRecipient: data.notifyRecipient,
            recipientName: data.recipientName,
            recipientEmail: data.recipientEmail,
          },
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    },
  });

  // Update form amount when selection changes
  const handleAmountChange = (newAmount: number | null, custom?: string) => {
    setSelectedAmount(newAmount);
    if (custom !== undefined) setCustomAmount(custom);
    const cents = newAmount || (custom ? parseInt(custom) * 100 : 0);
    form.setValue("amount", cents / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <span className="text-3xl">💜</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Honor a Loved One
          </h1>
          <p className="text-xl text-gray-600">
            Make a meaningful tribute in memory of or in honor of someone special.
            Your gift helps animals in need while celebrating someone you love.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {form.submitError && (
              <div className="mb-6">
                <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
              </div>
            )}

            {form.submitSuccess && (
              <div className="mb-6">
                <FormSuccess message="Redirecting to payment..." />
              </div>
            )}

            {/* Tribute Type */}
            <div className="mb-8">
              <RadioGroup
                label="Tribute Type"
                name="tributeType"
                value={form.values.tributeType}
                onChange={(value) => form.setValue("tributeType", value as "memorial" | "honor")}
                error={form.getFieldError("tributeType")}
                touched={form.isFieldTouched("tributeType")}
                required
                options={[
                  {
                    value: "memorial",
                    label: "In Memory Of",
                    description: "Honor someone who has passed away",
                  },
                  {
                    value: "honor",
                    label: "In Honor Of",
                    description: "Celebrate someone special in your life",
                  },
                ]}
              />
            </div>

            {/* Honoree Type */}
            <div className="mb-8">
              <RadioGroup
                label="Who are you honoring?"
                name="honoreeType"
                value={form.values.honoreeType}
                onChange={(value) => form.setValue("honoreeType", value as "pet" | "person")}
                error={form.getFieldError("honoreeType")}
                touched={form.isFieldTouched("honoreeType")}
                required
                options={[
                  {
                    value: "pet",
                    label: "A Beloved Pet",
                    description: "A furry family member",
                  },
                  {
                    value: "person",
                    label: "A Person",
                    description: "A friend, family member, or animal lover",
                  },
                ]}
              />
            </div>

            {/* Honoree Name */}
            <div className="mb-6">
              <FormField
                label={form.values.honoreeType === "pet" ? "Pet's Name" : "Person's Name"}
                name="honoreeName"
                type="text"
                value={form.values.honoreeName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("honoreeName")}
                touched={form.isFieldTouched("honoreeName")}
                placeholder={form.values.honoreeType === "pet" ? "Whiskers" : "Jane Doe"}
                required
              />
            </div>

            {/* Optional Message */}
            <div className="mb-8">
              <TextareaField
                label="Tribute Message (optional)"
                name="message"
                value={form.values.message || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("message")}
                touched={form.isFieldTouched("message")}
                placeholder="Share a memory or special message..."
                rows={3}
              />
            </div>

            {/* Notify Recipient Section */}
            <div className="mb-8 p-4 bg-purple-50 rounded-xl">
              <CheckboxField
                name="notifyRecipient"
                label="Send notification to someone"
                description="We'll send a card letting them know about your tribute"
                checked={form.values.notifyRecipient}
                onChange={(e) => form.setValue("notifyRecipient", e.target.checked)}
              />

              {form.values.notifyRecipient && (
                <div className="mt-4 space-y-4 pl-8">
                  <FormField
                    label="Recipient's Name"
                    name="recipientName"
                    type="text"
                    value={form.values.recipientName || ""}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.getFieldError("recipientName")}
                    touched={form.isFieldTouched("recipientName")}
                    placeholder="John Smith"
                  />
                  <FormField
                    label="Recipient's Email"
                    name="recipientEmail"
                    type="email"
                    value={form.values.recipientEmail || ""}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.getFieldError("recipientEmail")}
                    touched={form.isFieldTouched("recipientEmail")}
                    placeholder="john@example.com"
                  />
                </div>
              )}
            </div>

            <hr className="my-8" />

            {/* Donation Amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tribute Amount <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {amountOptions.map((opt) => (
                  <button
                    key={opt.amount}
                    type="button"
                    onClick={() => handleAmountChange(opt.amount, "")}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedAmount === opt.amount
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <span className="text-lg font-bold text-gray-900">{opt.label}</span>
                    <span className="text-xs text-gray-600 block mt-1">{opt.description}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleAmountChange(null, e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  min="5"
                />
              </div>
              {form.hasFieldError("amount") && (
                <p className="mt-2 text-sm text-red-600">{form.getFieldError("amount")}</p>
              )}
            </div>

            {/* Cover Fees */}
            {amount > 0 && (
              <div className="mb-6">
                <CheckboxField
                  name="coverFees"
                  label={`Cover transaction fees (${formatAmount(fee)})`}
                  description={`100% of your ${formatAmount(amount)} goes directly to the animals`}
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                />
              </div>
            )}

            <hr className="my-8" />

            {/* Donor Info */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Your Information</h3>

              <FormField
                label="Your Name"
                name="donorName"
                type="text"
                value={form.values.donorName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("donorName")}
                touched={form.isFieldTouched("donorName")}
                placeholder="Jane Doe"
                required
                disabled={form.values.isAnonymous}
              />

              <FormField
                label="Your Email"
                name="donorEmail"
                type="email"
                value={form.values.donorEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("donorEmail")}
                touched={form.isFieldTouched("donorEmail")}
                placeholder="jane@example.com"
                required
                hint="For your tax receipt"
              />

              <CheckboxField
                name="isAnonymous"
                label="Make my donation anonymous"
                checked={form.values.isAnonymous}
                onChange={(e) => form.setValue("isAnonymous", e.target.checked)}
              />
            </div>

            {/* Submit */}
            <SubmitButton
              isSubmitting={form.isSubmitting}
              isValid={form.isValid && amount >= 500}
              loadingText="Processing..."
            >
              Donate {formatAmount(totalAmount)} in {form.values.tributeType === "memorial" ? "Memory" : "Honor"}
            </SubmitButton>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure
              </span>
              <span>501(c)(3) Status Pending</span>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-bold text-gray-900 mb-4">What Your Tribute Includes</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✓</span>
                <span>A beautiful digital tribute card sent to you (and optional recipient)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✓</span>
                <span>Your tribute featured on our Wall of Love (unless anonymous)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✓</span>
                <span>Tax-deductible receipt for your records</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✓</span>
                <span>100% of your donation helps animals in need</span>
              </li>
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/donate"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Donation Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
