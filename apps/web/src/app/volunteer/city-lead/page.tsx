"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { cityLeadSchema, type CityLeadFormData } from "@/lib/validations";
import { FormField, TextareaField, FormError, SubmitButton } from "@/components/FormField";

const defaultValues: CityLeadFormData = {
  name: "",
  email: "",
  city: "",
  phone: "",
  experience: "",
  whyInterested: "",
  availability: "",
};

export default function CityLeadGuidePage() {
  const form = useFormValidation({
    schema: cityLeadSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "city-lead",
          message: `City Lead Application\n\nCity: ${data.city}\nExperience: ${data.experience}\nWhy Interested: ${data.whyInterested}\nAvailability: ${data.availability}`,
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-6xl mb-6 block">🎉</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thanks for your interest in becoming a City Lead. We&apos;ll review your
            application and get back to you within a few days.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🌟</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a City Lead
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help bring PawsNClaws to your city. Lead the charge in keeping
            pets and people together in your community.
          </p>
        </div>

        {/* What's Involved */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Does a City Lead Do?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-bold text-gray-900">Local Point of Contact</h3>
                <p className="text-sm text-gray-600">
                  Be the friendly face for your city. Answer questions, connect
                  people with resources, and represent PawsNClaws locally.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">🔗</span>
              <div>
                <h3 className="font-bold text-gray-900">Build Partnerships</h3>
                <p className="text-sm text-gray-600">
                  Connect with local shelters, vets, rescues, and community
                  organizations. You know your city best.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-bold text-gray-900">Curate Resources</h3>
                <p className="text-sm text-gray-600">
                  Help us build and maintain the local resources directory.
                  Know a great low-cost vet? Add it!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">🙋</span>
              <div>
                <h3 className="font-bold text-gray-900">Coordinate Volunteers</h3>
                <p className="text-sm text-gray-600">
                  As your chapter grows, help organize local volunteers
                  and foster networks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Provide */}
        <div className="bg-amber-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What We Provide
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <span className="text-2xl mb-2 block">🌐</span>
              <h3 className="font-bold text-gray-900 mb-1">Your City Page</h3>
              <p className="text-sm text-gray-600">
                A dedicated section of the site for your city with resources,
                volunteer info, and contact forms.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <span className="text-2xl mb-2 block">📚</span>
              <h3 className="font-bold text-gray-900 mb-1">Training & Support</h3>
              <p className="text-sm text-gray-600">
                We&apos;ll walk you through everything. Templates, playbooks,
                and ongoing support from the ATX team.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <span className="text-2xl mb-2 block">💪</span>
              <h3 className="font-bold text-gray-900 mb-1">501(c)(3) Backing</h3>
              <p className="text-sm text-gray-600">
                Operate under our nonprofit status. Tax-deductible donations,
                grant eligibility, and credibility.
              </p>
            </div>
          </div>
        </div>

        {/* Who We're Looking For */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Who We&apos;re Looking For
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p className="text-gray-700">
                <strong>Passionate about animals</strong> - You don&apos;t need to be an expert,
                but you care deeply about helping pets and their people.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p className="text-gray-700">
                <strong>Connected to your community</strong> - You know (or are willing to learn)
                what resources exist locally and where the gaps are.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p className="text-gray-700">
                <strong>Reliable communicator</strong> - You can respond to inquiries within
                24-48 hours and keep things moving.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p className="text-gray-700">
                <strong>Self-starter</strong> - You&apos;re excited to build something, not just
                follow instructions.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Time commitment:</strong> ~3-5 hours/week to start, flexible schedule.
              More as your chapter grows (if you want it to).
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Apply to Become a City Lead
          </h2>
          <form onSubmit={form.handleSubmit} className="space-y-6">
            {form.submitError && (
              <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                label="Your Name"
                name="name"
                type="text"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("name")}
                touched={form.isFieldTouched("name")}
                placeholder="Jane Doe"
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
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                label="City You'd Lead"
                name="city"
                type="text"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("city")}
                touched={form.isFieldTouched("city")}
                placeholder="e.g., Denver, CO"
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
                placeholder="(555) 123-4567"
              />
            </div>

            <TextareaField
              label="Relevant Experience"
              name="experience"
              value={form.values.experience || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("experience")}
              touched={form.isFieldTouched("experience")}
              rows={3}
              placeholder="Any experience with animal rescue, nonprofits, community organizing, or just being a pet owner..."
            />

            <TextareaField
              label="Why Are You Interested?"
              name="whyInterested"
              value={form.values.whyInterested}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("whyInterested")}
              touched={form.isFieldTouched("whyInterested")}
              rows={3}
              placeholder="What draws you to this? What would you want to accomplish?"
              required
            />

            <FormField
              label="Availability"
              name="availability"
              type="text"
              value={form.values.availability || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("availability")}
              touched={form.isFieldTouched("availability")}
              placeholder="e.g., Evenings and weekends, 5 hours/week"
            />

            <SubmitButton
              isSubmitting={form.isSubmitting}
              isValid={form.isValid}
              loadingText="Submitting..."
            >
              Submit Application
            </SubmitButton>
          </form>
        </div>

        {/* Questions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions before applying?{" "}
            <Link href="/contact" className="text-amber-600 hover:underline font-medium">
              Reach out to us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
