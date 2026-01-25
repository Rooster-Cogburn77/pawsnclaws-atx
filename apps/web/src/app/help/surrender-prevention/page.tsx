"use client";

import { useState } from "react";
import Link from "next/link";

const surrenderReasons = [
  { id: "housing", label: "Housing issues (moving, can't find pet-friendly place)" },
  { id: "financial", label: "Can't afford pet care (food, vet bills)" },
  { id: "behavioral", label: "Behavioral problems (aggression, not house-trained)" },
  { id: "allergies", label: "Allergies in the family" },
  { id: "health", label: "Owner health issues (can't care for pet)" },
  { id: "time", label: "Not enough time for the pet" },
  { id: "new-baby", label: "New baby/family changes" },
  { id: "other", label: "Other reason" },
];

export default function SurrenderPreventionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petInfo: "",
    reasons: [] as string[],
    otherReason: "",
    timeline: "flexible",
    whatWouldHelp: "",
    triedOptions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleReason = (reasonId: string) => {
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reasonId)
        ? prev.reasons.filter((r) => r !== reasonId)
        : [...prev.reasons, reasonId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/help/surrender-prevention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
          <div className="text-6xl mb-6">💕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out before making this difficult decision.
            We&apos;ll review your situation and contact you within 24-48 hours with
            resources and options.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Remember: surrendering should be the last resort. There are often
            solutions we can find together.
          </p>
          <Link
            href="/resources"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Browse Resources
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
          <span className="text-4xl mb-4 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Need to Rehome Your Pet?
          </h1>
          <p className="text-gray-600">
            Before surrendering to a shelter, let us help. We have resources and
            can often find solutions to keep pets with their families.
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-green-900 mb-2">
            We&apos;re Not Here to Judge
          </h3>
          <p className="text-sm text-green-800">
            We understand life circumstances change. Our goal is to help you
            explore every option before separating from your pet. Many situations
            that seem impossible have solutions - temporary foster care, financial
            assistance, training help, or housing resources.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">About Your Pet</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tell us about your pet *
            </label>
            <textarea
              required
              value={formData.petInfo}
              onChange={(e) =>
                setFormData({ ...formData, petInfo: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
              rows={3}
              placeholder="Species, breed, age, name, personality, any health or behavioral notes..."
            />
          </div>

          <h3 className="font-bold text-gray-900 mb-4">
            What&apos;s making you consider this?
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {surrenderReasons.map((reason) => (
              <button
                key={reason.id}
                type="button"
                onClick={() => toggleReason(reason.id)}
                className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                  formData.reasons.includes(reason.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                {reason.label}
              </button>
            ))}
          </div>

          {formData.reasons.includes("other") && (
            <div className="mb-6">
              <input
                type="text"
                value={formData.otherReason}
                onChange={(e) =>
                  setFormData({ ...formData, otherReason: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="Please describe..."
              />
            </div>
          )}

          <h3 className="font-bold text-gray-900 mb-4">Timeline</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "urgent", label: "Urgent (days)" },
              { id: "soon", label: "Within 2 weeks" },
              { id: "month", label: "Within a month" },
              { id: "flexible", label: "Flexible / exploring options" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, timeline: option.id })
                }
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  formData.timeline === option.id
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What would help you keep your pet?
              </label>
              <textarea
                value={formData.whatWouldHelp}
                onChange={(e) =>
                  setFormData({ ...formData, whatWouldHelp: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                rows={2}
                placeholder="Financial help, training, temporary foster, housing assistance..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What have you already tried?
              </label>
              <textarea
                value={formData.triedOptions}
                onChange={(e) =>
                  setFormData({ ...formData, triedOptions: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                rows={2}
                placeholder="Rehoming through friends, pet-friendly housing search, training, etc."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Get Help"}
          </button>
        </form>

        {/* Immediate Resources */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Immediate Resources
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>Pet food help:</strong>{" "}
              <Link href="/resources" className="text-amber-600 hover:underline">
                Austin Pet Food Pantries
              </Link>
            </li>
            <li>
              <strong>Low-cost vet care:</strong>{" "}
              <a
                href="https://emancipet.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                Emancipet
              </a>
            </li>
            <li>
              <strong>Pet-friendly housing:</strong>{" "}
              <a
                href="https://www.petfriendlyaustintx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                Pet Friendly Austin
              </a>
            </li>
            <li>
              <strong>Deposit help:</strong>{" "}
              <Link
                href="/help/deposit-assistance"
                className="text-amber-600 hover:underline"
              >
                Our Deposit Assistance Program
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
