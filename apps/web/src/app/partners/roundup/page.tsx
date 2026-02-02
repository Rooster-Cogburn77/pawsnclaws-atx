"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { roundupPartnerSchema, type RoundupPartnerFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

// Sample partner businesses
const samplePartners = [
  {
    name: "Cosmic Coffee + Beer Garden",
    type: "Coffee Shop",
    location: "North Loop",
    logo: null,
    raised: 234500, // cents
  },
  {
    name: "Bouldin Creek Cafe",
    type: "Restaurant",
    location: "South Austin",
    logo: null,
    raised: 187300,
  },
  {
    name: "Bark & Co Pet Supply",
    type: "Pet Store",
    location: "East Austin",
    logo: null,
    raised: 412000,
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Partner Joins",
    description: "Local businesses sign up to participate in our Round-Up program.",
  },
  {
    step: "2",
    title: "Customers Round Up",
    description: "At checkout, customers can round up their purchase to the nearest dollar.",
  },
  {
    step: "3",
    title: "Change Adds Up",
    description: "Those extra cents are collected and donated to PawsNClaws ATX monthly.",
  },
  {
    step: "4",
    title: "Animals Helped",
    description: "100% of round-up donations go directly to helping Austin's animals.",
  },
];

const benefits = [
  {
    emoji: "💕",
    title: "Customer Engagement",
    description: "Give customers an easy way to feel good about their purchase.",
  },
  {
    emoji: "🏆",
    title: "Community Recognition",
    description: "Featured on our website and social media as a partner business.",
  },
  {
    emoji: "📊",
    title: "Impact Reports",
    description: "Monthly reports showing exactly how much your customers raised.",
  },
  {
    emoji: "🎯",
    title: "Local Impact",
    description: "100% stays local - helping Austin animals and families.",
  },
];

const businessTypeOptions = [
  { value: "", label: "Select..." },
  { value: "restaurant", label: "Restaurant/Cafe" },
  { value: "retail", label: "Retail Store" },
  { value: "pet", label: "Pet Store/Services" },
  { value: "bar", label: "Bar/Brewery" },
  { value: "other", label: "Other" },
];

const defaultValues: RoundupPartnerFormData = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "",
  locations: "",
  posSystem: "",
  message: "",
};

export default function RoundUpPartnersPage() {
  const form = useFormValidation({
    schema: roundupPartnerSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.contactName,
          email: data.email,
          subject: `Round-Up Partner Inquiry: ${data.businessName}`,
          message: `Round-Up Partner Inquiry\n\nBusiness: ${data.businessName}\nType: ${data.businessType || "Not specified"}\nLocations: ${data.locations || "Not specified"}\nPOS System: ${data.posSystem || "Not specified"}\n\nMessage: ${data.message || "No additional message"}`,
          type: "roundup-partner",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }
    },
  });

  const totalRaised = samplePartners.reduce((sum, p) => sum + p.raised, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🪙</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Round-Up for Rescues
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner businesses let customers round up their purchases to support Austin&apos;s animals.
            Small change, big impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-amber-600">
              {samplePartners.length}
            </div>
            <div className="text-gray-600">Partner Businesses</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              ${(totalRaised / 100).toLocaleString()}
            </div>
            <div className="text-gray-600">Raised This Year</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-gray-600">Goes to Animals</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl font-bold text-amber-600 mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {samplePartners.map((partner, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-5">
                <div className="w-16 h-16 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-2xl">
                  🏪
                </div>
                <h3 className="font-bold text-gray-900">{partner.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {partner.type} • {partner.location}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  ${(partner.raised / 100).toLocaleString()} raised
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
            Why Partner With Us?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-2xl">{benefit.emoji}</span>
                <div>
                  <h3 className="font-bold text-green-900">{benefit.title}</h3>
                  <p className="text-sm text-green-800">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Signup Form */}
        {form.submitSuccess ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <span className="text-4xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thanks for Your Interest!
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ll be in touch within 2-3 business days to discuss the partnership.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Become a Partner
            </h2>
            <form onSubmit={form.handleSubmit} className="space-y-4">
              {form.submitError && (
                <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Business Name"
                  name="businessName"
                  type="text"
                  value={form.values.businessName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("businessName")}
                  touched={form.isFieldTouched("businessName")}
                  required
                />
                <FormField
                  label="Contact Name"
                  name="contactName"
                  type="text"
                  value={form.values.contactName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("contactName")}
                  touched={form.isFieldTouched("contactName")}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <SelectField
                  label="Business Type"
                  name="businessType"
                  value={form.values.businessType || ""}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("businessType")}
                  touched={form.isFieldTouched("businessType")}
                  options={businessTypeOptions}
                />
                <FormField
                  label="Number of Locations"
                  name="locations"
                  type="text"
                  value={form.values.locations || ""}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("locations")}
                  touched={form.isFieldTouched("locations")}
                  placeholder="e.g., 1, 3, 10+"
                />
              </div>
              <FormField
                label="POS System (if known)"
                name="posSystem"
                type="text"
                value={form.values.posSystem || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("posSystem")}
                touched={form.isFieldTouched("posSystem")}
                placeholder="e.g., Square, Toast, Clover"
              />
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
              <SubmitButton
                isSubmitting={form.isSubmitting}
                isValid={form.isValid}
                loadingText="Submitting..."
              >
                Request Partnership Info
              </SubmitButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
