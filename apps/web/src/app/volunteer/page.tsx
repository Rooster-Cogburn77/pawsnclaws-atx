"use client";

import Link from "next/link";
import { UsersIcon } from "@/components/Icons";
import { useFormValidation } from "@/hooks";
import { volunteerSchema, type VolunteerFormData } from "@/lib/validations";
import { FormField, TextareaField, CheckboxField, FormError, SubmitButton } from "@/components/FormField";

const volunteerRoles = [
  {
    id: "colony-feeder",
    title: "Colony Feeder",
    emoji: "🍽️",
    commitment: "Regular",
    description:
      "Feed and monitor a community cat colony on a regular schedule. We provide food and supplies.",
    requirements: ["Reliable transportation", "Consistent schedule", "Basic cat knowledge"],
  },
  {
    id: "tnr-helper",
    title: "TNR Volunteer",
    emoji: "✂️",
    commitment: "Occasional",
    description:
      "Help trap community cats for spay/neuter and return them to their colonies.",
    requirements: ["Can lift 20+ lbs", "Available mornings", "Training provided"],
  },
  {
    id: "foster",
    title: "Foster Parent",
    emoji: "🏠",
    commitment: "Varies",
    description:
      "Provide temporary homes for cats or dogs until they find their forever families.",
    requirements: ["Safe indoor space", "Other pets must be vaccinated", "Time for socialization"],
  },
  {
    id: "transport",
    title: "Transport Driver",
    emoji: "🚗",
    commitment: "Flexible",
    description:
      "Help transport animals to vet appointments, foster homes, or adoption events.",
    requirements: ["Reliable vehicle", "Flexible schedule", "Comfortable with animals in car"],
  },
  {
    id: "events",
    title: "Event Volunteer",
    emoji: "🎉",
    commitment: "Occasional",
    description:
      "Help at adoption events, fundraisers, and community outreach activities.",
    requirements: ["Good with people", "Weekend availability sometimes", "Enthusiastic!"],
  },
  {
    id: "admin",
    title: "Admin Support",
    emoji: "💻",
    commitment: "Flexible",
    description:
      "Help with social media, data entry, phone calls, or other administrative tasks.",
    requirements: ["Computer skills", "Can work remotely", "Detail-oriented"],
  },
];

const defaultValues: VolunteerFormData = {
  name: "",
  email: "",
  phone: "",
  roles: [],
  availability: "",
  experience: "",
  hasVehicle: false,
  canFoster: false,
  message: "",
};

export default function VolunteerPage() {
  const form = useFormValidation({
    schema: volunteerSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/volunteer", {
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

  const toggleRole = (roleId: string) => {
    const currentRoles = form.values.roles || [];
    const newRoles = currentRoles.includes(roleId)
      ? currentRoles.filter((r) => r !== roleId)
      : [...currentRoles, roleId];
    form.setValue("roles", newRoles);
    form.setTouched("roles");
  };

  if (form.submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Team!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for signing up to volunteer! We&apos;ll review your
            application and reach out within a few days to get you started.
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <UsersIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer With Us
          </h1>
          <p className="text-xl text-gray-600">
            Join our community of animal lovers making a real difference for
            Austin&apos;s cats and dogs.
          </p>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ways to Help
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteerRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => toggleRole(role.id)}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  form.values.roles?.includes(role.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 bg-white hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{role.emoji}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      role.commitment === "Regular"
                        ? "bg-purple-100 text-purple-700"
                        : role.commitment === "Occasional"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {role.commitment}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="text-xs text-gray-500">
                  {role.requirements.slice(0, 2).join(" • ")}
                </div>
              </button>
            ))}
          </div>
          {form.isFieldTouched("roles") && form.getFieldError("roles") && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {form.getFieldError("roles")}
            </p>
          )}
        </div>
      </section>

      {/* Signup Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={form.handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Sign Up to Volunteer
            </h2>

            <div className="space-y-4 mb-6">
              {form.submitError && (
                <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
              )}

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
                  value={form.values.phone || ""}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.getFieldError("phone")}
                  touched={form.isFieldTouched("phone")}
                />
              </div>

              <FormField
                label="Availability"
                name="availability"
                type="text"
                value={form.values.availability || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("availability")}
                touched={form.isFieldTouched("availability")}
                placeholder="e.g. Weekday mornings, weekends"
              />

              <TextareaField
                label="Experience with animals"
                name="experience"
                value={form.values.experience || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("experience")}
                touched={form.isFieldTouched("experience")}
                rows={3}
                placeholder="Tell us about your experience with pets, volunteering, etc."
              />

              <div className="flex flex-col gap-3">
                <CheckboxField
                  label="I have reliable transportation"
                  name="hasVehicle"
                  checked={form.values.hasVehicle || false}
                  onChange={form.handleChange}
                />
                <CheckboxField
                  label="I'm interested in fostering animals"
                  name="canFoster"
                  checked={form.values.canFoster || false}
                  onChange={form.handleChange}
                />
              </div>

              {form.values.roles && form.values.roles.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-xl">
                  <span className="text-sm font-medium text-amber-800">
                    Interested in:{" "}
                    {form.values.roles
                      .map(
                        (id) => volunteerRoles.find((r) => r.id === id)?.title
                      )
                      .join(", ")}
                  </span>
                </div>
              )}

              <TextareaField
                label="Anything else we should know?"
                name="message"
                value={form.values.message || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("message")}
                touched={form.isFieldTouched("message")}
                rows={2}
              />
            </div>

            <SubmitButton
              isSubmitting={form.isSubmitting}
              isValid={form.isValid}
              loadingText="Submitting..."
            >
              Join the Team
            </SubmitButton>
          </form>
        </div>
      </section>
    </div>
  );
}
