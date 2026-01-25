"use client";

import { useState } from "react";
import Link from "next/link";

// Sample tributes - would come from Supabase
const sampleTributes = [
  {
    id: "1",
    petName: "Max",
    petType: "dog",
    message: "In loving memory of Max, the best golden retriever who ever lived. He brought joy to everyone he met.",
    donorName: "The Johnson Family",
    amount: 10000, // cents
    date: "2025-01-20",
    photo: null,
  },
  {
    id: "2",
    petName: "Whiskers",
    petType: "cat",
    message: "For Whiskers, who was rescued from the streets and gave us 15 wonderful years of purrs and love.",
    donorName: "Sarah M.",
    amount: 5000,
    date: "2025-01-18",
    photo: null,
  },
  {
    id: "3",
    petName: "Luna",
    petType: "cat",
    message: "Luna was the sweetest cat. This donation helps other cats find the love she gave us.",
    donorName: "Anonymous",
    amount: 2500,
    date: "2025-01-15",
    photo: null,
  },
];

export default function TributePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    petType: "cat",
    message: "",
    donorName: "",
    isAnonymous: false,
    amount: "25",
  });

  const petEmojis: Record<string, string> = {
    cat: "🐱",
    dog: "🐕",
    bird: "🐦",
    rabbit: "🐰",
    other: "🐾",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🕯️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Memorial & Tribute Gifts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Honor a beloved pet or celebrate a special person with a donation that helps
            animals in need. Your tribute will be displayed in our memorial garden.
          </p>
        </div>

        {/* Create Tribute Button */}
        {!showForm && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors text-lg"
            >
              Create a Tribute Gift
            </button>
          </div>
        )}

        {/* Tribute Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Create Your Tribute
            </h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    In Memory/Honor of *
                  </label>
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    placeholder="Pet's name or person's name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.petType}
                    onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="cat">Cat 🐱</option>
                    <option value="dog">Dog 🐕</option>
                    <option value="bird">Bird 🐦</option>
                    <option value="rabbit">Rabbit 🐰</option>
                    <option value="other">Other Pet 🐾</option>
                    <option value="person">Person 💜</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tribute Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a memory or message..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                    disabled={formData.isAnonymous}
                  />
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="rounded text-purple-600"
                    />
                    <span className="text-sm text-gray-600">Make this tribute anonymous</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount
                  </label>
                  <div className="flex gap-2">
                    {["25", "50", "100", "250"].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setFormData({ ...formData, amount: amt })}
                        className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                          formData.amount === amt
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Other amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500"
                    min="5"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <Link
                  href={`/donate?amount=${formData.amount}&tribute=${encodeURIComponent(formData.petName)}`}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white text-center font-bold rounded-xl hover:bg-purple-700"
                >
                  Continue to Donation →
                </Link>
              </div>
            </form>
          </div>
        )}

        {/* Memorial Garden */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Memorial Garden
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTributes.map((tribute) => (
              <div
                key={tribute.id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-400"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl mr-2">
                      {petEmojis[tribute.petType] || "🐾"}
                    </span>
                    <span className="font-bold text-gray-900">{tribute.petName}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(tribute.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">
                  &quot;{tribute.message}&quot;
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">— {tribute.donorName}</span>
                  <span className="text-purple-600 font-medium">
                    ${(tribute.amount / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-purple-900 mb-2">
            Your Tribute Makes a Difference
          </h3>
          <p className="text-sm text-purple-800 mb-4">
            100% of tribute donations support our programs helping animals in need.
            You&apos;ll receive a tax receipt and acknowledgment letter for your records.
          </p>
          <p className="text-xs text-purple-600">
            Want to notify someone of your tribute gift? Include their email during checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
