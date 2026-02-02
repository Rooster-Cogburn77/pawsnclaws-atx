"use client";

import Link from "next/link";
import { useFormValidation } from "@/hooks";
import { cityRequestSchema, type CityRequestFormData } from "@/lib/validations";
import { FormField, TextareaField, FormError, SubmitButton } from "@/components/FormField";

const defaultValues: CityRequestFormData = {
  name: "",
  city: "",
  state: "",
  email: "",
  interest: "just-interested",
  message: "",
};

export default function RequestCityPage() {
  const form = useFormValidation({
    schema: cityRequestSchema,
    initialValues: defaultValues,
    onSubmit: async (data) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `City Request: ${data.city}, ${data.state}`,
          message: `City Request\n\nCity: ${data.city}, ${data.state}\nInterest Level: ${data.interest}\n\nMessage: ${data.message || "No additional message"}`,
          type: "city-request",
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-6xl mb-6 block">🗺️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thanks for letting us know about <strong>{form.values.city}, {form.values.state}</strong>.
            We&apos;ll keep you posted on expansion plans.
          </p>
          <p className="text-gray-500 mb-8">
            The more requests we get from a city, the higher priority it becomes!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/volunteer/city-lead"
              className="px-6 py-3 bg-white text-amber-600 font-medium rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Become a City Lead
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🌎</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request Your City
          </h1>
          <p className="text-xl text-gray-600">
            Don&apos;t see your city on PawsNClaws yet?
            Let us know where you&apos;d like to see us expand.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3">How Expansion Works</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>1. Demand:</strong> We track city requests to prioritize where to expand next.
            </p>
            <p>
              <strong>2. Local Lead:</strong> Each city needs at least one local volunteer to coordinate.
            </p>
            <p>
              <strong>3. Resources:</strong> We research and build out local resource directories.
            </p>
            <p>
              <strong>4. Launch:</strong> Once ready, your city gets a dedicated page under the PawsNClaws umbrella.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={form.handleSubmit} className="space-y-6">
            {form.submitError && (
              <FormError error={form.submitError} onDismiss={form.clearSubmitError} />
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                label="City"
                name="city"
                type="text"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("city")}
                touched={form.isFieldTouched("city")}
                placeholder="Denver"
                required
              />
              <FormField
                label="State"
                name="state"
                type="text"
                value={form.values.state}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.getFieldError("state")}
                touched={form.isFieldTouched("state")}
                placeholder="CO"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Interest Level
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="interest"
                    value="just-interested"
                    checked={form.values.interest === "just-interested"}
                    onChange={() => form.setValue("interest", "just-interested")}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Just interested</p>
                    <p className="text-sm text-gray-500">I&apos;d use the resources if available</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="interest"
                    value="want-to-lead"
                    checked={form.values.interest === "want-to-lead"}
                    onChange={() => form.setValue("interest", "want-to-lead")}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">I want to lead this city!</p>
                    <p className="text-sm text-gray-500">I&apos;m interested in being the local coordinator</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="interest"
                    value="know-someone"
                    checked={form.values.interest === "know-someone"}
                    onChange={() => form.setValue("interest", "know-someone")}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">I know someone who could lead</p>
                    <p className="text-sm text-gray-500">I can connect you with a potential city lead</p>
                  </div>
                </label>
              </div>
            </div>

            <TextareaField
              label="Anything else?"
              name="message"
              value={form.values.message || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.getFieldError("message")}
              touched={form.isFieldTouched("message")}
              rows={3}
              placeholder="Know of great local resources? Have ideas for the city chapter?"
            />

            <SubmitButton
              isSubmitting={form.isSubmitting}
              isValid={form.isValid}
              loadingText="Submitting..."
            >
              Submit City Request
            </SubmitButton>
          </form>
        </div>

        {/* Current Cities */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Currently serving:</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-medium hover:bg-amber-200"
            >
              Austin, TX
            </Link>
            <Link
              href="/cities/charlotte"
              className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium hover:bg-teal-200"
            >
              Charlotte, NC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
