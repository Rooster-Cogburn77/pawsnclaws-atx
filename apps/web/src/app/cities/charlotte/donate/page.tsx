"use client";

import { useState } from "react";
import Link from "next/link";

const donationAmounts = [
  { amount: 25, label: "$25", description: "Feeds a colony for a week" },
  { amount: 50, label: "$50", description: "One TNR surgery at HSC" },
  { amount: 100, label: "$100", description: "Emergency vet visit" },
  { amount: 150, label: "$150", description: "Sponsor a colony for a month" },
];

export default function CharlotteDonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 1) {
      alert("Please select or enter a donation amount");
      return;
    }
    // In production: redirect to Stripe checkout
    alert(`Thank you! Redirecting to donate $${amount}${isMonthly ? "/month" : ""}... (Demo - Stripe not connected)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💚</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Charlotte&apos;s Community Cats
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation helps us provide TNR, food, shelter, and emergency care
            for community cats across the Charlotte area.
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Frequency Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isMonthly
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isMonthly
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {donationAmounts.map((option) => (
              <button
                key={option.amount}
                onClick={() => {
                  setSelectedAmount(option.amount);
                  setCustomAmount("");
                }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedAmount === option.amount
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 hover:border-teal-300"
                }`}
              >
                <div className="text-2xl font-bold text-gray-900">
                  {option.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {option.description}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter a custom amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Other amount"
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ""}
            {isMonthly ? " Monthly" : ""}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            PawsNClaws is a 501(c)(3) nonprofit. Your donation is tax-deductible.
          </p>
        </div>

        {/* Impact Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Your Impact in Charlotte
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">$50</div>
              <div className="text-gray-600">= 1 TNR surgery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">$150</div>
              <div className="text-gray-600">= 1 month colony care</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">$500</div>
              <div className="text-gray-600">= 10 cats TNR&apos;d</div>
            </div>
          </div>
        </div>

        {/* Other Ways */}
        <div className="text-center">
          <h3 className="font-bold text-gray-900 mb-4">Other Ways to Help</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cities/charlotte/volunteer"
              className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:border-teal-300 transition-colors"
            >
              Volunteer Your Time
            </Link>
            <Link
              href="/cities/charlotte/foster"
              className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:border-teal-300 transition-colors"
            >
              Become a Foster
            </Link>
            <Link
              href="/cities/charlotte/map/submit"
              className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:border-teal-300 transition-colors"
            >
              Report a Colony
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
