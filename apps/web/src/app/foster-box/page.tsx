"use client";

import { useState } from "react";
import Link from "next/link";

const boxTiers = [
  {
    name: "Kitten Box",
    emoji: "🐱",
    price: 2500, // cents
    description: "Everything a foster kitten needs for a month",
    items: [
      "KMR kitten formula (if needed)",
      "Wet kitten food (12 cans)",
      "Dry kitten food (small bag)",
      "Litter (10 lbs)",
      "Disposable litter trays",
      "Toys and enrichment",
      "Cleaning supplies",
    ],
    popular: true,
  },
  {
    name: "Puppy Box",
    emoji: "🐶",
    price: 3500,
    description: "Supplies for foster puppies to thrive",
    items: [
      "Puppy food (quality brand)",
      "Training treats",
      "Pee pads",
      "Chew toys",
      "Collar and leash",
      "Cleaning supplies",
      "Grooming basics",
    ],
    popular: false,
  },
  {
    name: "Recovery Box",
    emoji: "🏥",
    price: 4000,
    description: "For animals recovering from surgery or illness",
    items: [
      "Prescription diet food",
      "Soft bedding",
      "E-collar if needed",
      "Wound care supplies",
      "Heating pad",
      "Quiet enrichment toys",
      "Extra cleaning supplies",
    ],
    popular: false,
  },
  {
    name: "Senior Care Box",
    emoji: "👴",
    price: 3000,
    description: "Comfort items for senior foster animals",
    items: [
      "Senior formula food",
      "Joint supplements",
      "Orthopedic bed pad",
      "Gentle grooming supplies",
      "Low-sodium treats",
      "Calming aids",
      "Soft toys",
    ],
    popular: false,
  },
];

const impactStats = [
  { number: "150+", label: "Boxes Sent", description: "To foster homes this year" },
  { number: "45", label: "Active Fosters", description: "Currently caring for animals" },
  { number: "$0", label: "Foster Cost", description: "We cover all supplies" },
];

export default function FosterBoxPage() {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📦</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Foster Supply Box
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sponsor a box of supplies for our foster families. Every box keeps a foster home
            stocked and ready to save lives.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-amber-600">{stat.number}</div>
              <div className="font-medium text-gray-900">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
          <h2 className="font-bold text-green-900 mb-4 text-center">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl mb-2 block">1️⃣</span>
              <p className="text-sm text-green-800">
                <strong>You Sponsor</strong> - Choose a box type and frequency
              </p>
            </div>
            <div>
              <span className="text-2xl mb-2 block">2️⃣</span>
              <p className="text-sm text-green-800">
                <strong>We Assemble</strong> - We pack supplies based on current foster needs
              </p>
            </div>
            <div>
              <span className="text-2xl mb-2 block">3️⃣</span>
              <p className="text-sm text-green-800">
                <strong>Fosters Receive</strong> - A foster home gets everything they need
              </p>
            </div>
          </div>
        </div>

        {/* Frequency Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setFrequency("one-time")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              frequency === "one-time"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            One-Time Gift
          </button>
          <button
            onClick={() => setFrequency("monthly")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              frequency === "monthly"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Monthly Subscription
          </button>
        </div>

        {/* Box Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {boxTiers.map((box, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl shadow-md overflow-hidden ${
                selectedBox === box.name ? "ring-2 ring-amber-500" : ""
              }`}
            >
              {box.popular && (
                <div className="bg-amber-500 text-white text-xs font-bold py-1 text-center">
                  MOST NEEDED
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-3xl mr-2">{box.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-900 inline">{box.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-600">
                      ${(box.price / 100).toFixed(0)}
                    </div>
                    {frequency === "monthly" && (
                      <div className="text-xs text-gray-500">/month</div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{box.description}</p>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">What&apos;s included:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {box.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setSelectedBox(box.name)}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    selectedBox === box.name
                      ? "bg-amber-500 text-white"
                      : "border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {selectedBox === box.name ? "Selected" : "Select This Box"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout CTA */}
        {selectedBox && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-600">
                  You selected: <strong>{selectedBox}</strong>
                  {frequency === "monthly" && " (Monthly)"}
                </p>
                <p className="text-sm text-gray-500">
                  {frequency === "monthly"
                    ? "You can cancel anytime. We'll email you each month when a box is sent."
                    : "Your one-time gift will supply one foster home."}
                </p>
              </div>
              <Link
                href={`/donate?box=${selectedBox}&frequency=${frequency}`}
                className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap"
              >
                Continue to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* Updates Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Stay Connected</h3>
          <p className="text-sm text-blue-800 mb-4">
            Monthly subscribers receive updates including:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Photo of the foster animal your box supported</li>
            <li>• Updates on their journey (adoption, medical progress, etc.)</li>
            <li>• Quarterly impact report on all foster program outcomes</li>
          </ul>
        </div>

        {/* Become a Foster CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Want to become a foster yourself? We provide all supplies!
          </p>
          <Link
            href="/foster"
            className="inline-block px-6 py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-xl hover:bg-amber-50 transition-colors"
          >
            Apply to Foster
          </Link>
        </div>
      </div>
    </div>
  );
}
