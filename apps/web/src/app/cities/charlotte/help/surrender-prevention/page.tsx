"use client";

import { useState } from "react";
import Link from "next/link";

const reasons = [
  { id: "cost", label: "Can't afford pet care (vet, food, etc.)" },
  { id: "moving", label: "Moving and can't take pet" },
  { id: "landlord", label: "Landlord issues" },
  { id: "behavior", label: "Behavior problems" },
  { id: "allergies", label: "Allergies" },
  { id: "time", label: "Not enough time" },
  { id: "health", label: "My health issues" },
  { id: "baby", label: "New baby / family changes" },
  { id: "other", label: "Other reason" },
];

export default function CharlotteSurrenderPreventionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    petName: "",
    reasons: [] as string[],
    timeline: "",
    message: "",
  });
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
    console.log("Charlotte surrender prevention:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out before making a decision. Our team will
            contact you within 24-48 hours to discuss options. There&apos;s often
            a solution we can find together.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💕</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Before You Surrender
          </h1>
          <p className="text-xl text-gray-600">
            Let&apos;s talk. There&apos;s often a solution we can find together.
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-amber-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-amber-900 mb-3">We&apos;re Not Here to Judge</h2>
          <p className="text-amber-800">
            Life happens. Circumstances change. We understand. Our goal is simply
            to explore all options with you. Sometimes the solution is easier than
            you think. And if rehoming truly is best, we can help with that too.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tell Us What&apos;s Going On</h2>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Pet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Type *
              </label>
              <select
                required
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="multiple">Multiple pets</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name(s)
              </label>
              <input
                type="text"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Reasons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What&apos;s making you consider surrender? (select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => toggleReason(reason.id)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    formData.reasons.includes(reason.id)
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How urgent is this?
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="immediate">Immediate (within days)</option>
              <option value="week">Within a week</option>
              <option value="month">Within a month</option>
              <option value="exploring">Just exploring options</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us more about your situation
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
              placeholder="The more details you share, the better we can help..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-amber-500 text-white text-lg font-bold rounded-xl hover:bg-amber-600 transition-colors"
          >
            Get Help
          </button>
        </form>

        {/* Resources */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            You can also explore our other programs:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cities/charlotte/help/vet-fund"
              className="text-teal-600 hover:text-teal-700"
            >
              Emergency Vet Fund →
            </Link>
            <Link
              href="/cities/charlotte/help/deposit-assistance"
              className="text-teal-600 hover:text-teal-700"
            >
              Pet Deposit Help →
            </Link>
            <Link
              href="/cities/charlotte/resources"
              className="text-teal-600 hover:text-teal-700"
            >
              Local Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
