"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestCityPage() {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    name: "",
    email: "",
    interest: "just-interested", // just-interested | want-to-lead | know-someone
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `City Request: ${formData.city}, ${formData.state}`,
          message: `City Request\n\nCity: ${formData.city}, ${formData.state}\nInterest Level: ${formData.interest}\n\nMessage: ${formData.message || "No additional message"}`,
          type: "city-request",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-6xl mb-6 block">🗺️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thanks for letting us know about <strong>{formData.city}, {formData.state}</strong>.
            We'll keep you posted on expansion plans.
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
            Don't see your city on PawsNClaws yet?
            Let us know where you'd like to see us expand.
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="Denver"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="CO"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="jane@example.com"
                />
              </div>
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
                    checked={formData.interest === "just-interested"}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Just interested</p>
                    <p className="text-sm text-gray-500">I'd use the resources if available</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="interest"
                    value="want-to-lead"
                    checked={formData.interest === "want-to-lead"}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">I want to lead this city!</p>
                    <p className="text-sm text-gray-500">I'm interested in being the local coordinator</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="interest"
                    value="know-someone"
                    checked={formData.interest === "know-someone"}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">I know someone who could lead</p>
                    <p className="text-sm text-gray-500">I can connect you with a potential city lead</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anything else? (optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Know of great local resources? Have ideas for the city chapter?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold text-lg rounded-xl transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit City Request"}
            </button>
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
