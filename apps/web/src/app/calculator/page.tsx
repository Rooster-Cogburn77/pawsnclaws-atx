"use client";

import { useState } from "react";
import Link from "next/link";

type PetType = "cat" | "small-dog" | "medium-dog" | "large-dog";
type CareLevel = "basic" | "standard" | "premium";

interface CostBreakdown {
  category: string;
  monthly: number;
  annual: number;
  notes: string;
}

const baseCosts: Record<PetType, Record<CareLevel, CostBreakdown[]>> = {
  cat: {
    basic: [
      { category: "Food", monthly: 30, annual: 360, notes: "Standard dry food" },
      { category: "Litter", monthly: 15, annual: 180, notes: "Basic clumping litter" },
      { category: "Vet Care", monthly: 25, annual: 300, notes: "Annual checkup + vaccines" },
      { category: "Supplies", monthly: 5, annual: 60, notes: "Basic toys, bowls" },
    ],
    standard: [
      { category: "Food", monthly: 50, annual: 600, notes: "Quality wet/dry mix" },
      { category: "Litter", monthly: 25, annual: 300, notes: "Premium clumping litter" },
      { category: "Vet Care", monthly: 40, annual: 480, notes: "Checkups + preventatives" },
      { category: "Supplies", monthly: 15, annual: 180, notes: "Cat tree, toys, scratchers" },
      { category: "Grooming", monthly: 10, annual: 120, notes: "Nail trims, brushing tools" },
    ],
    premium: [
      { category: "Food", monthly: 80, annual: 960, notes: "Premium/prescription diet" },
      { category: "Litter", monthly: 40, annual: 480, notes: "Automatic litter system" },
      { category: "Vet Care", monthly: 60, annual: 720, notes: "Wellness plan + dental" },
      { category: "Supplies", monthly: 25, annual: 300, notes: "Cat furniture, enrichment" },
      { category: "Grooming", monthly: 30, annual: 360, notes: "Professional grooming" },
      { category: "Pet Insurance", monthly: 25, annual: 300, notes: "Basic coverage" },
    ],
  },
  "small-dog": {
    basic: [
      { category: "Food", monthly: 35, annual: 420, notes: "Standard kibble" },
      { category: "Vet Care", monthly: 30, annual: 360, notes: "Annual checkup + vaccines" },
      { category: "Supplies", monthly: 10, annual: 120, notes: "Leash, bowls, basic toys" },
      { category: "Waste Bags", monthly: 5, annual: 60, notes: "Basic poop bags" },
    ],
    standard: [
      { category: "Food", monthly: 50, annual: 600, notes: "Quality dog food" },
      { category: "Vet Care", monthly: 50, annual: 600, notes: "Checkups + preventatives + dental" },
      { category: "Supplies", monthly: 20, annual: 240, notes: "Bed, crate, toys" },
      { category: "Grooming", monthly: 40, annual: 480, notes: "Monthly professional groom" },
      { category: "Training", monthly: 25, annual: 300, notes: "Basic training classes" },
    ],
    premium: [
      { category: "Food", monthly: 75, annual: 900, notes: "Premium/fresh food" },
      { category: "Vet Care", monthly: 70, annual: 840, notes: "Comprehensive wellness" },
      { category: "Supplies", monthly: 30, annual: 360, notes: "Premium gear, enrichment" },
      { category: "Grooming", monthly: 60, annual: 720, notes: "Bi-weekly grooming" },
      { category: "Training", monthly: 50, annual: 600, notes: "Ongoing training" },
      { category: "Pet Insurance", monthly: 35, annual: 420, notes: "Comprehensive coverage" },
      { category: "Daycare/Walking", monthly: 100, annual: 1200, notes: "Part-time care" },
    ],
  },
  "medium-dog": {
    basic: [
      { category: "Food", monthly: 50, annual: 600, notes: "Standard kibble" },
      { category: "Vet Care", monthly: 35, annual: 420, notes: "Annual checkup + vaccines" },
      { category: "Supplies", monthly: 15, annual: 180, notes: "Leash, bowls, basic toys" },
      { category: "Waste Bags", monthly: 8, annual: 96, notes: "Basic poop bags" },
    ],
    standard: [
      { category: "Food", monthly: 70, annual: 840, notes: "Quality dog food" },
      { category: "Vet Care", monthly: 60, annual: 720, notes: "Checkups + preventatives + dental" },
      { category: "Supplies", monthly: 25, annual: 300, notes: "Bed, crate, toys" },
      { category: "Grooming", monthly: 50, annual: 600, notes: "Monthly professional groom" },
      { category: "Training", monthly: 30, annual: 360, notes: "Basic training classes" },
    ],
    premium: [
      { category: "Food", monthly: 100, annual: 1200, notes: "Premium/fresh food" },
      { category: "Vet Care", monthly: 80, annual: 960, notes: "Comprehensive wellness" },
      { category: "Supplies", monthly: 40, annual: 480, notes: "Premium gear, enrichment" },
      { category: "Grooming", monthly: 70, annual: 840, notes: "Bi-weekly grooming" },
      { category: "Training", monthly: 60, annual: 720, notes: "Ongoing training" },
      { category: "Pet Insurance", monthly: 45, annual: 540, notes: "Comprehensive coverage" },
      { category: "Daycare/Walking", monthly: 150, annual: 1800, notes: "Regular care" },
    ],
  },
  "large-dog": {
    basic: [
      { category: "Food", monthly: 70, annual: 840, notes: "Standard kibble" },
      { category: "Vet Care", monthly: 40, annual: 480, notes: "Annual checkup + vaccines" },
      { category: "Supplies", monthly: 20, annual: 240, notes: "Large bed, crate, toys" },
      { category: "Waste Bags", monthly: 10, annual: 120, notes: "Extra-large poop bags" },
    ],
    standard: [
      { category: "Food", monthly: 90, annual: 1080, notes: "Quality dog food" },
      { category: "Vet Care", monthly: 70, annual: 840, notes: "Checkups + preventatives + dental" },
      { category: "Supplies", monthly: 30, annual: 360, notes: "XL bed, crate, toys" },
      { category: "Grooming", monthly: 60, annual: 720, notes: "Monthly professional groom" },
      { category: "Training", monthly: 35, annual: 420, notes: "Basic training classes" },
    ],
    premium: [
      { category: "Food", monthly: 130, annual: 1560, notes: "Premium/fresh food" },
      { category: "Vet Care", monthly: 100, annual: 1200, notes: "Comprehensive wellness" },
      { category: "Supplies", monthly: 50, annual: 600, notes: "Premium gear, enrichment" },
      { category: "Grooming", monthly: 80, annual: 960, notes: "Bi-weekly grooming" },
      { category: "Training", monthly: 70, annual: 840, notes: "Ongoing training" },
      { category: "Pet Insurance", monthly: 60, annual: 720, notes: "Comprehensive coverage" },
      { category: "Daycare/Walking", monthly: 200, annual: 2400, notes: "Regular care" },
    ],
  },
};

const firstYearCosts: Record<PetType, number> = {
  cat: 500, // Spay/neuter, initial supplies, microchip
  "small-dog": 800,
  "medium-dog": 900,
  "large-dog": 1000,
};

export default function CalculatorPage() {
  const [petType, setPetType] = useState<PetType>("cat");
  const [careLevel, setCareLevel] = useState<CareLevel>("standard");

  const costs = baseCosts[petType][careLevel];
  const monthlyTotal = costs.reduce((sum, cost) => sum + cost.monthly, 0);
  const annualTotal = costs.reduce((sum, cost) => sum + cost.annual, 0);
  const firstYearTotal = annualTotal + firstYearCosts[petType];

  const petLabels: Record<PetType, string> = {
    cat: "Cat",
    "small-dog": "Small Dog (under 20 lbs)",
    "medium-dog": "Medium Dog (20-60 lbs)",
    "large-dog": "Large Dog (60+ lbs)",
  };

  const careLevelLabels: Record<CareLevel, { label: string; description: string }> = {
    basic: { label: "Basic", description: "Essential care only" },
    standard: { label: "Standard", description: "Recommended care level" },
    premium: { label: "Premium", description: "Comprehensive care" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-4xl mb-4 block">🧮</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Cost Calculator
          </h1>
          <p className="text-gray-600">
            Estimate the monthly and annual costs of pet ownership to help you plan.
          </p>
        </div>

        {/* Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pet Type
              </label>
              <div className="space-y-2">
                {(Object.keys(petLabels) as PetType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPetType(type)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                      petType === type
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="mr-2">
                      {type === "cat" ? "🐱" : "🐕"}
                    </span>
                    {petLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Care Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Care Level
              </label>
              <div className="space-y-2">
                {(Object.keys(careLevelLabels) as CareLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCareLevel(level)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                      careLevel === level
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{careLevelLabels[level].label}</div>
                    <div className="text-sm text-gray-500">
                      {careLevelLabels[level].description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Summary */}
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Estimated Costs</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">${monthlyTotal}</div>
                <div className="text-amber-100 text-sm">Per Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">${annualTotal.toLocaleString()}</div>
                <div className="text-amber-100 text-sm">Per Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">${firstYearTotal.toLocaleString()}</div>
                <div className="text-amber-100 text-sm">First Year*</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              {costs.map((cost, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-medium text-gray-900">{cost.category}</div>
                    <div className="text-sm text-gray-500">{cost.notes}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${cost.monthly}/mo</div>
                    <div className="text-sm text-gray-500">${cost.annual}/yr</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * First year includes one-time costs: adoption fees, spay/neuter, initial supplies, microchip (~${firstYearCosts[petType]})
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-3">💡 Money-Saving Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Low-cost vet care:</strong> Emancipet and Texas Litter Control offer affordable services</li>
            <li>• <strong>Pet food assistance:</strong> Austin Pets Alive! has a free pet food pantry</li>
            <li>• <strong>DIY grooming:</strong> Learn basic grooming at home to reduce costs</li>
            <li>• <strong>Buy in bulk:</strong> Stock up on food and litter when on sale</li>
            <li>• <strong>Pet insurance:</strong> Can save thousands in emergency situations</li>
            <li>• <strong>Preventative care:</strong> Regular checkups prevent expensive emergencies</li>
          </ul>
        </div>

        {/* Emergency Fund */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-amber-900 mb-2">🚨 Emergency Fund Recommendation</h3>
          <p className="text-amber-800 mb-3">
            We recommend setting aside an emergency fund of <strong>$1,000 - $2,000</strong> for unexpected
            vet visits. Emergencies can cost anywhere from a few hundred to several thousand dollars.
          </p>
          <p className="text-sm text-amber-700">
            Can&apos;t afford an emergency? Our <Link href="/help/vet-fund" className="underline font-medium">Vet Fund</Link> may be able to help Austin pet owners in crisis.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Adopt?
          </h3>
          <p className="text-gray-600 mb-6">
            If the costs feel manageable, you might be ready for a furry friend!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quiz"
              className="px-6 py-3 bg-white text-amber-600 font-bold rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Take the Pet Match Quiz
            </Link>
            <Link
              href="/foster"
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
            >
              See Adoptable Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
