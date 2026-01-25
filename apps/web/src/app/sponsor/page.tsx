"use client";

import { useState } from "react";
import { sponsorTiers, formatAmount } from "@/lib/stripe";

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sponsors/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your sponsorship inquiry and will be in touch within
            2 business days to discuss partnership opportunities.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Corporate Partnerships
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partner With PawsNClaws ATX
          </h1>
          <p className="text-xl text-gray-600">
            Align your brand with animal welfare, get real marketing value, and
            make a measurable impact in our community.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">📊</span>
              <h3 className="font-bold text-gray-900 mb-2">
                Transparent Impact
              </h3>
              <p className="text-gray-600 text-sm">
                Know exactly where your dollars go. Quarterly reports with real
                numbers: animals helped, meals served, lives saved.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">🎯</span>
              <h3 className="font-bold text-gray-900 mb-2">Local Visibility</h3>
              <p className="text-gray-600 text-sm">
                Your logo on our site, maps, events, and social media. Austin
                loves supporting businesses that give back.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl mb-4 block">💼</span>
              <h3 className="font-bold text-gray-900 mb-2">Tax Benefits</h3>
              <p className="text-gray-600 text-sm">
                501(c)(3) tax-deductible donations. We provide all documentation
                for your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sponsorship Tiers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sponsorTiers).map(([key, tier]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTier(key)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedTier === key
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 bg-white hover:border-amber-300"
                }`}
              >
                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    key === "platinum"
                      ? "text-purple-600"
                      : key === "gold"
                      ? "text-yellow-600"
                      : key === "silver"
                      ? "text-gray-500"
                      : "text-amber-700"
                  }`}
                >
                  {tier.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {formatAmount(tier.minAmount)}
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </div>
                <ul className="space-y-2">
                  {tier.perks.map((perk, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-amber-500 mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Other Partnership Options */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Other Ways to Partner
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
              <h3 className="font-bold text-gray-900 mb-2">
                🛒 Round-Up Partner
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Add &quot;Round up for pets&quot; at your POS. Customers donate spare
                change, you get goodwill.
              </p>
              <span className="text-xs text-amber-600 font-medium">
                Zero cost to you
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-900 mb-2">
                🤝 Matching Gifts
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Match employee donations. We handle tracking and reporting.
              </p>
              <span className="text-xs text-blue-600 font-medium">
                Double the impact
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-2">
                📦 In-Kind Donations
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Donate products or services. Pet food, supplies, printing,
                catering for events.
              </p>
              <span className="text-xs text-green-600 font-medium">
                Full FMV deduction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Start the Conversation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What interests you?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={4}
                  placeholder="Tell us about your company and what type of partnership interests you..."
                />
              </div>

              {selectedTier && (
                <div className="p-4 bg-amber-50 rounded-xl">
                  <span className="text-sm text-amber-700">
                    Selected tier:{" "}
                    <strong className="capitalize">{selectedTier}</strong> (
                    {formatAmount(sponsorTiers[selectedTier as keyof typeof sponsorTiers].minAmount)}
                    /month)
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
