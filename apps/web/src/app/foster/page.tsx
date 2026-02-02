"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { fosterSchema, type FosterFormData } from "@/lib/validations";
import { FormField, TextareaField, SelectField, FormError, SubmitButton } from "@/components/FormField";

const fosterBenefits = [
  {
    emoji: "🏥",
    title: "We Cover Vet Care",
    description: "All medical expenses, vaccinations, and spay/neuter are covered.",
  },
  {
    emoji: "🍲",
    title: "Food & Supplies Provided",
    description: "We provide food, litter, crates, beds - everything you need.",
  },
  {
    emoji: "📞",
    title: "24/7 Support",
    description: "Our team is always available to answer questions and help.",
  },
  {
    emoji: "💕",
    title: "Save Lives",
    description: "Every foster home opens a shelter spot for another animal in need.",
  },
];

const fosterTypes = [
  {
    id: "short-term",
    title: "Short-Term Foster",
    duration: "1-2 weeks",
    description: "Perfect for vacations, emergencies, or trying fostering for the first time.",
    ideal: "Great for: Beginners, busy schedules",
  },
  {
    id: "medical",
    title: "Medical Foster",
    duration: "2-6 weeks",
    description: "Care for animals recovering from surgery or illness. Training provided.",
    ideal: "Great for: Those with some pet experience",
  },
  {
    id: "socialization",
    title: "Socialization Foster",
    duration: "2-4 weeks",
    description: "Help shy or undersocialized pets learn to trust humans.",
    ideal: "Great for: Patient, calm households",
  },
  {
    id: "bottle-baby",
    title: "Bottle Baby Foster",
    duration: "4-8 weeks",
    description: "Care for orphaned kittens or puppies. Requires feeding every 2-4 hours.",
    ideal: "Great for: Work-from-home, flexible schedules",
  },
  {
    id: "hospice",
    title: "Hospice Foster",
    duration: "Varies",
    description: "Provide comfort and love to pets in their final days or weeks.",
    ideal: "Great for: Compassionate souls, experienced pet owners",
  },
];

const otherPetsOptions = [
  { value: "none", label: "No pets" },
  { value: "dogs", label: "Dogs only" },
  { value: "cats", label: "Cats only" },
  { value: "both", label: "Dogs and cats" },
  { value: "other", label: "Other pets" },
];

const hasKidsOptions = [
  { value: "none", label: "No children" },
  { value: "under5", label: "Under 5 years" },
  { value: "5to12", label: "5-12 years" },
  { value: "teens", label: "Teenagers" },
];

const housingOptions = [
  { value: "house-owned", label: "House (owned)" },
  { value: "house-rented", label: "House (rented)" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo/Townhouse" },
];

const defaultValues: FosterFormData = {
  name: "",
  email: "",
  phone: "",
  fosterTypes: [],
  hasOtherPets: "",
  hasKids: "",
  housingType: "",
  experience: "",
  whyFoster: "",
};

export default function FosterPage() {
  const form = useFormValidation({
    schema: fosterSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/foster", {
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

  const toggleFosterType = (typeId: string) => {
    const currentTypes = form.values.fosterTypes || [];
    const newTypes = currentTypes.includes(typeId)
      ? currentTypes.filter((t) => t !== typeId)
      : [...currentTypes, typeId];
    form.setValue("fosterTypes", newTypes);
    form.setTouched("fosterTypes");
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in fostering! We&apos;ll review your
            application and contact you within 2-3 business days to discuss
            next steps.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            In the meantime, join our Foster Facebook group to connect with
            other fosters and see available animals.
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Foster
          </h1>
          <p className="text-gray-600">
            Open your home, save a life. Fostering is one of the most impactful
            ways to help animals in need.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {fosterBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 text-center"
            >
              <span className="text-3xl mb-2 block">{benefit.emoji}</span>
              <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Foster Types Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Types of Fostering
          </h2>
          <div className="space-y-4">
            {fosterTypes.map((type) => (
              <div
                key={type.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-amber-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{type.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {type.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                <p className="text-xs text-amber-600">{type.ideal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <form
          onSubmit={form.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Foster Application
          </h2>

          {form.submitError && (
            <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
          )}

          <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
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

          <h3 className="font-bold text-gray-900 mb-4">
            What type of fostering interests you?
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 mb-2">
            {fosterTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleFosterType(type.id)}
                className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                  form.values.fosterTypes?.includes(type.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <span className="font-medium">{type.title}</span>
                <span className="text-gray-500 block text-xs">
                  {type.duration}
                </span>
              </button>
            ))}
          </div>
          {form.isFieldTouched("fosterTypes") && form.getFieldError("fosterTypes") && (
            <p className="text-red-500 text-sm mb-6">
              {form.getFieldError("fosterTypes")}
            </p>
          )}
          <div className="mb-6" />

          <h3 className="font-bold text-gray-900 mb-4">About Your Home</h3>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Other pets in home?"
                name="hasOtherPets"
                value={form.values.hasOtherPets || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("hasOtherPets")}
                touched={form.isFieldTouched("hasOtherPets")}
                options={otherPetsOptions}
                placeholder="Select..."
              />
              <SelectField
                label="Children in home?"
                name="hasKids"
                value={form.values.hasKids || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("hasKids")}
                touched={form.isFieldTouched("hasKids")}
                options={hasKidsOptions}
                placeholder="Select..."
              />
            </div>
            <SelectField
              label="Housing type"
              name="housingType"
              value={form.values.housingType || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("housingType")}
              touched={form.isFieldTouched("housingType")}
              options={housingOptions}
              placeholder="Select..."
            />
          </div>

          <div className="space-y-4 mb-6">
            <TextareaField
              label="Pet experience"
              name="experience"
              value={form.values.experience || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("experience")}
              touched={form.isFieldTouched("experience")}
              rows={3}
              placeholder="Tell us about your experience with pets..."
            />
            <TextareaField
              label="Why do you want to foster?"
              name="whyFoster"
              value={form.values.whyFoster || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("whyFoster")}
              touched={form.isFieldTouched("whyFoster")}
              rows={3}
              placeholder="What draws you to fostering?"
            />
          </div>

          <SubmitButton
            isSubmitting={form.isSubmitting}
            isValid={form.isValid}
            loadingText="Submitting..."
          >
            Submit Application
          </SubmitButton>
        </form>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">
                What if I fall in love and want to adopt?
              </p>
              <p className="text-gray-600">
                Foster fails are celebrated! You&apos;ll have first dibs on adopting
                your foster pet.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                What if it doesn&apos;t work out?
              </p>
              <p className="text-gray-600">
                No guilt! We&apos;ll find another placement. Your wellbeing matters
                too.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Can I foster if I rent?
              </p>
              <p className="text-gray-600">
                Yes! We just need landlord approval (we can help with that).
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                How long until I get my first foster?
              </p>
              <p className="text-gray-600">
                After approval and orientation (usually 1-2 weeks), you could
                have a foster within days!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
