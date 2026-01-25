"use client";

import { useState } from "react";
import Link from "next/link";

export default function DepositAssistancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    petSpecies: "dog",
    landlordName: "",
    depositAmount: "",
    monthlyRent: "",
    canRepay: true,
    situation: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/help/deposit-assistance", {
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
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to our Pet Deposit Assistance program. We&apos;ll
            review your application and contact you within 3-5 business days.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            In the meantime, don&apos;t sign a lease that would require you to give up
            your pet. We&apos;ll work with you to find a solution.
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
          <span className="text-4xl mb-4 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Deposit Assistance
          </h1>
          <p className="text-gray-600">
            Can&apos;t afford a pet deposit? We can help cover it so you don&apos;t have to
            give up your furry family member.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-3">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <div className="font-bold mb-1">1. Apply</div>
              <p>Tell us about your situation and how much you need.</p>
            </div>
            <div>
              <div className="font-bold mb-1">2. We Pay</div>
              <p>If approved, we pay the deposit directly to your landlord.</p>
            </div>
            <div>
              <div className="font-bold mb-1">3. You Repay</div>
              <p>Pay us back over time (0% interest) as you&apos;re able.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="font-bold text-gray-900 mb-4">Your Information</h3>
          <div className="space-y-4 mb-6">
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Pet Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
                Pet Type *
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

          <h3 className="font-bold text-gray-900 mb-4">Housing Details</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landlord/Property Name
              </label>
              <input
                type="text"
                value={formData.landlordName}
                onChange={(e) =>
                  setFormData({ ...formData, landlordName: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="Name of landlord or apartment complex"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Deposit Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    value={formData.depositAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, depositAmount: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyRent: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Your Situation</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about your situation *
              </label>
              <textarea
                required
                value={formData.situation}
                onChange={(e) =>
                  setFormData({ ...formData, situation: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                rows={4}
                placeholder="Why do you need assistance? What would happen to your pet without this help?"
              />
            </div>

            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={formData.canRepay}
                onChange={(e) =>
                  setFormData({ ...formData, canRepay: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">
                  I can repay this loan over time
                </span>
                <span className="text-sm text-gray-600 block">
                  We offer 0% interest repayment plans. Typical: $25-50/month.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">
                  I understand and agree *
                </span>
                <span className="text-sm text-gray-600 block">
                  Funds are limited. If approved, I agree to a repayment plan.
                  This is a loan, not a grant (though we can discuss hardship
                  cases).
                </span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.agreeToTerms}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">Common Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">
                How much can you help with?
              </p>
              <p className="text-gray-600">
                We typically assist with deposits up to $500. Larger amounts
                considered case-by-case.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                How long do I have to repay?
              </p>
              <p className="text-gray-600">
                We&apos;ll work out a plan that fits your budget. Most people repay
                within 6-12 months.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                What if I can&apos;t repay?
              </p>
              <p className="text-gray-600">
                Life happens. If your situation changes, talk to us. We&apos;d rather
                keep pets with families than stress you out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
