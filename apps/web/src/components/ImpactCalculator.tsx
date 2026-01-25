"use client";

import { useState } from "react";

interface ImpactItem {
  amount: number;
  description: string;
  icon: string;
}

const impactItems: ImpactItem[] = [
  { amount: 10, description: "1 week of food for a colony cat", icon: "🥫" },
  { amount: 25, description: "Vaccines for one cat", icon: "💉" },
  { amount: 35, description: "Microchip + registration", icon: "📍" },
  { amount: 50, description: "1 TNR surgery (spay/neuter)", icon: "✂️" },
  { amount: 75, description: "Emergency vet visit co-pay", icon: "🏥" },
  { amount: 100, description: "1 month colony food supply", icon: "📦" },
  { amount: 150, description: "Pet deposit assistance loan", icon: "🏠" },
  { amount: 250, description: "Full emergency surgery fund", icon: "💊" },
  { amount: 500, description: "Sponsor a colony for 6 months", icon: "🐱" },
];

export function ImpactCalculator() {
  const [amount, setAmount] = useState(50);

  // Find what the donation covers
  const getImpact = (amt: number) => {
    const impacts: { item: ImpactItem; count: number }[] = [];
    let remaining = amt;

    // Go through items from highest to lowest
    const sorted = [...impactItems].sort((a, b) => b.amount - a.amount);

    for (const item of sorted) {
      if (remaining >= item.amount) {
        const count = Math.floor(remaining / item.amount);
        impacts.push({ item, count });
        remaining -= count * item.amount;
      }
    }

    return impacts;
  };

  const impacts = getImpact(amount);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        See Your Impact
      </h3>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Donation amount
        </label>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-amber-600">$</span>
          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="flex-1 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-2xl font-bold text-amber-600 w-16 text-right">
            {amount}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-500 font-medium">Your donation covers:</p>
        {impacts.length > 0 ? (
          impacts.map(({ item, count }) => (
            <div
              key={item.description}
              className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {count > 1 ? `${count}x ` : ""}{item.description}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.amount}{count > 1 ? ` each = $${item.amount * count}` : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            Every dollar helps animals in need.
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          100% of donations go directly to animal care programs.
        </p>
      </div>
    </div>
  );
}
