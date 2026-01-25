"use client";

import { useState } from "react";
import Link from "next/link";

export default function VetFundApplicationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Info
    name: "",
    email: "",
    phone: "",
    // Pet Info
    petName: "",
    petSpecies: "dog",
    petAge: "",
    // Vet Info
    vetClinic: "",
    diagnosis: "",
    estimatedCost: "",
    // Situation
    situation: "",
    proofOfIncome: false,
    agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/help/vet-fund", {
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
          <div className="text-6xl mb-6">📬</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your emergency vet fund application. Our team will
            review it and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            If this is a life-threatening emergency and you haven&apos;t heard from
            us, please proceed with treatment and we&apos;ll work with you on
            funding.
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🏥</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emergency Vet Fund Application
          </h1>
          <p className="text-gray-600">
            We help Austin pet owners facing emergency vet bills they can&apos;t
            afford. Fill out this form and we&apos;ll review your case.
          </p>
        </div>

        {/* Eligibility Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Before You Apply</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Must be an Austin-area resident</li>
            <li>• Must be an emergency/urgent medical situation</li>
            <li>• Funds are limited - we prioritize life-threatening cases</li>
            <li>• We pay the vet directly, not the pet owner</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 ${
                      step > s ? "bg-amber-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Contact Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
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
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Pet & Vet Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Pet & Veterinary Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.petName}
                    onChange={(e) =>
                      setFormData({ ...formData, petName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Species *
                  </label>
                  <select
                    value={formData.petSpecies}
                    onChange={(e) =>
                      setFormData({ ...formData, petSpecies: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Veterinary Clinic *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vetClinic}
                  onChange={(e) =>
                    setFormData({ ...formData, vetClinic: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Name and location of the vet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis / What&apos;s Wrong *
                </label>
                <textarea
                  required
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe the medical issue and what treatment is needed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Cost *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    value={formData.estimatedCost}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedCost: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Situation & Submit */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tell Us Your Situation
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you need assistance? *
                </label>
                <textarea
                  required
                  value={formData.situation}
                  onChange={(e) =>
                    setFormData({ ...formData, situation: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={4}
                  placeholder="Please share your circumstances and why you're unable to cover this cost..."
                />
              </div>

              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.proofOfIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, proofOfIncome: e.target.checked })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    I can provide proof of income/hardship if requested
                  </span>
                  <span className="text-sm text-gray-600 block">
                    This helps us prioritize limited funds
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreedToTerms: e.target.checked })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    I understand and agree *
                  </span>
                  <span className="text-sm text-gray-600 block">
                    Funds are limited and not guaranteed. We will pay the vet
                    directly if approved. I agree to provide updates on my pet&apos;s
                    recovery.
                  </span>
                </div>
              </label>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreedToTerms}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Alternative Resources */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
          <h3 className="font-bold text-gray-900 mb-3">Other Resources</h3>
          <p className="text-sm text-gray-600 mb-4">
            While you wait for a response, here are other options:
          </p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>Emancipet</strong> - Low-cost vet care:{" "}
              <a href="https://emancipet.org" className="text-amber-600 hover:underline">
                emancipet.org
              </a>
            </li>
            <li>
              • <strong>CareCredit</strong> - Medical financing for pets
            </li>
            <li>
              • <strong>RedRover Relief</strong> - National pet assistance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
