"use client";

import { useState } from "react";
import Link from "next/link";

export default function CityLeadGuidePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    experience: "",
    whyInterested: "",
    availability: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "city-lead",
          message: `City Lead Application\n\nCity: ${formData.city}\nExperience: ${formData.experience}\nWhy Interested: ${formData.whyInterested}\nAvailability: ${formData.availability}`,
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
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City You&apos;d Lead *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Denver, CO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relevant Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Any experience with animal rescue, nonprofits, community organizing, or just being a pet owner..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why Are You Interested? *
              </label>
              <textarea
                required
                value={formData.whyInterested}
                onChange={(e) => setFormData({ ...formData, whyInterested: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="What draws you to this? What would you want to accomplish?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="e.g., Evenings and weekends, 5 hours/week"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold text-lg rounded-xl transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
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
