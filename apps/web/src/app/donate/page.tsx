"use client";

import { useState } from "react";
import { donationTiers, subscriptionTiers, formatAmount, calculateFee } from "@/lib/stripe";
import { HeartIcon } from "@/components/Icons";
import { ImpactCalculator } from "@/components/ImpactCalculator";

type DonationType = "one-time" | "monthly";

export default function DonatePage() {
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [coverFees, setCoverFees] = useState(true);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    isAnonymous: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const amount = selectedAmount || (customAmount ? parseInt(customAmount) * 100 : 0);
  const fee = calculateFee(amount);
  const totalAmount = coverFees ? amount + fee : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/donations/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          donationType,
          coverFees,
          donorName: donorInfo.isAnonymous ? "Anonymous" : donorInfo.name,
          donorEmail: donorInfo.email,
          message: donorInfo.message,
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Donation error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentTiers = donationType === "one-time" ? donationTiers : subscriptionTiers;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <HeartIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Every Dollar Saves Lives
          </h1>
          <p className="text-xl text-gray-600">
            100% of your donation goes directly to helping Austin&apos;s animals.
            Emergency vet care, colony feeding, surrender prevention, and more.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Donation Type Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
              <button
                type="button"
                onClick={() => setDonationType("one-time")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  donationType === "one-time"
                    ? "bg-white shadow text-amber-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType("monthly")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  donationType === "monthly"
                    ? "bg-white shadow text-amber-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {currentTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setCustomAmount("");
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedAmount === tier.amount
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{tier.emoji}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatAmount(tier.amount)}
                      {donationType === "monthly" && (
                        <span className="text-sm font-normal text-gray-500">/mo</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-600 block mt-1">
                      {tier.description}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-lg"
                  min="1"
                />
              </div>
            </div>

            {/* Cover Fees */}
            {amount > 0 && (
              <label className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    Cover transaction fees ({formatAmount(fee)})
                  </span>
                  <span className="text-sm text-gray-600 block">
                    100% of your {formatAmount(amount)} goes directly to the animals
                  </span>
                </div>
              </label>
            )}

            {/* Donor Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Jane Doe"
                  disabled={donorInfo.isAnonymous}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (for receipt)
                </label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={donorInfo.isAnonymous}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">Make my donation anonymous</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave a message (optional)
                </label>
                <textarea
                  value={donorInfo.message}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="In memory of my cat Whiskers..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!amount || isLoading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold text-lg rounded-xl transition-colors"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Donate {formatAmount(totalAmount)}
                  {donationType === "monthly" && "/month"}
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure
              </span>
              <span>501(c)(3) Tax Deductible</span>
              <span>Powered by Stripe</span>
            </div>
          </form>

          {/* Impact Calculator */}
          <div className="mt-12">
            <ImpactCalculator />
          </div>

          {/* Other Ways to Give */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Other Ways to Give
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/donate/stock"
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">📈</span>
                <h3 className="font-bold text-gray-900">Donate Stock</h3>
                <p className="text-sm text-gray-600">Avoid capital gains tax</p>
              </a>
              <a
                href="/donate/crypto"
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">₿</span>
                <h3 className="font-bold text-gray-900">Crypto</h3>
                <p className="text-sm text-gray-600">Bitcoin, ETH, and more</p>
              </a>
              <a
                href="/donate/daf"
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">🏦</span>
                <h3 className="font-bold text-gray-900">Donor Advised Fund</h3>
                <p className="text-sm text-gray-600">Give from your DAF</p>
              </a>
            </div>
          </div>

          {/* Corporate */}
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl text-center">
            <h3 className="font-bold text-gray-900 mb-2">Corporate Giving?</h3>
            <p className="text-gray-700 mb-4">
              Become a sponsor, set up matching gifts, or partner with us.
            </p>
            <a
              href="/sponsor"
              className="inline-block px-6 py-2 bg-white rounded-full font-medium text-amber-700 hover:bg-amber-50 transition-colors"
            >
              Learn About Sponsorship
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
