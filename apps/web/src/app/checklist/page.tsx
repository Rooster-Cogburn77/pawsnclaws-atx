"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  cost?: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  emoji: string;
  items: ChecklistItem[];
}

const newPetChecklists: Record<"cat" | "dog", ChecklistCategory[]> = {
  cat: [
    {
      id: "essentials",
      title: "Day One Essentials",
      emoji: "🏠",
      items: [
        { id: "food", label: "Quality cat food", description: "Age-appropriate wet or dry food", cost: "$15-50" },
        { id: "bowls", label: "Food and water bowls", description: "Preferably stainless steel or ceramic", cost: "$10-20" },
        { id: "litter-box", label: "Litter box", description: "One per cat plus one extra recommended", cost: "$15-40" },
        { id: "litter", label: "Cat litter", description: "Clumping, unscented recommended for most cats", cost: "$15-30" },
        { id: "carrier", label: "Cat carrier", description: "For vet trips and emergencies", cost: "$20-50" },
      ],
    },
    {
      id: "comfort",
      title: "Comfort & Safety",
      emoji: "😸",
      items: [
        { id: "bed", label: "Cat bed or blanket", description: "Cozy spots for napping", cost: "$15-40" },
        { id: "scratcher", label: "Scratching post", description: "Saves your furniture!", cost: "$15-50" },
        { id: "hiding", label: "Hiding spot", description: "Covered bed, box, or cat cave", cost: "$10-30" },
        { id: "collar", label: "Breakaway collar with ID tag", description: "Even for indoor cats", cost: "$10-15" },
      ],
    },
    {
      id: "enrichment",
      title: "Enrichment & Play",
      emoji: "🎾",
      items: [
        { id: "toys", label: "Interactive toys", description: "Wand toys, balls, mice", cost: "$10-30" },
        { id: "cat-tree", label: "Cat tree or perch", description: "Vertical space for climbing", cost: "$30-150" },
        { id: "window", label: "Window perch", description: "Cats love watching the world", cost: "$20-40" },
      ],
    },
    {
      id: "health",
      title: "Health & Grooming",
      emoji: "💊",
      items: [
        { id: "vet-visit", label: "Initial vet visit scheduled", description: "Within first week", cost: "$50-150" },
        { id: "brush", label: "Grooming brush", description: "Type depends on coat length", cost: "$10-20" },
        { id: "nail-clipper", label: "Nail clippers", description: "Cat-specific clippers", cost: "$10-15" },
        { id: "flea-prevention", label: "Flea prevention", description: "Ask your vet for recommendations", cost: "$15-30/month" },
      ],
    },
    {
      id: "prep",
      title: "Home Preparation",
      emoji: "🔒",
      items: [
        { id: "cat-proof", label: "Cat-proof dangerous areas", description: "Hide cords, secure windows", cost: "Free" },
        { id: "toxic-plants", label: "Remove toxic plants", description: "Lilies, poinsettias, etc.", cost: "Free" },
        { id: "safe-room", label: "Set up a safe room", description: "Quiet space for adjustment", cost: "Free" },
      ],
    },
  ],
  dog: [
    {
      id: "essentials",
      title: "Day One Essentials",
      emoji: "🏠",
      items: [
        { id: "food", label: "Quality dog food", description: "Age and size appropriate", cost: "$20-70" },
        { id: "bowls", label: "Food and water bowls", description: "Non-tip, size-appropriate", cost: "$10-30" },
        { id: "leash", label: "Leash (6 ft recommended)", description: "Sturdy, comfortable grip", cost: "$10-30" },
        { id: "collar", label: "Collar with ID tag", description: "Fitted but not too tight", cost: "$15-25" },
        { id: "crate", label: "Crate or kennel", description: "Sized for adult dog", cost: "$30-100" },
      ],
    },
    {
      id: "comfort",
      title: "Comfort & Safety",
      emoji: "🐕",
      items: [
        { id: "bed", label: "Dog bed", description: "Washable, size-appropriate", cost: "$20-80" },
        { id: "blanket", label: "Cozy blanket", description: "For crate and bed", cost: "$10-20" },
        { id: "harness", label: "Harness (optional)", description: "Good for dogs who pull", cost: "$20-40" },
        { id: "gates", label: "Baby gates", description: "To block off areas", cost: "$20-50" },
      ],
    },
    {
      id: "enrichment",
      title: "Enrichment & Play",
      emoji: "🎾",
      items: [
        { id: "toys", label: "Assorted toys", description: "Chew toys, balls, tug toys", cost: "$20-50" },
        { id: "kong", label: "KONG or puzzle toy", description: "Mental stimulation", cost: "$10-20" },
        { id: "treats", label: "Training treats", description: "Small, low-calorie", cost: "$5-15" },
      ],
    },
    {
      id: "health",
      title: "Health & Grooming",
      emoji: "💊",
      items: [
        { id: "vet-visit", label: "Initial vet visit scheduled", description: "Within first week", cost: "$50-150" },
        { id: "brush", label: "Grooming brush", description: "Breed-appropriate", cost: "$10-30" },
        { id: "nail-clipper", label: "Nail clippers or grinder", description: "Dog-specific", cost: "$10-25" },
        { id: "shampoo", label: "Dog shampoo", description: "Gentle, dog-safe formula", cost: "$10-20" },
        { id: "flea-prevention", label: "Flea & tick prevention", description: "Ask your vet", cost: "$20-50/month" },
        { id: "poop-bags", label: "Poop bags", description: "Biodegradable preferred", cost: "$10-20" },
      ],
    },
    {
      id: "prep",
      title: "Home Preparation",
      emoji: "🔒",
      items: [
        { id: "dog-proof", label: "Dog-proof home", description: "Remove hazards, secure trash", cost: "Free" },
        { id: "yard-check", label: "Check yard for gaps", description: "Secure fencing", cost: "Varies" },
        { id: "schedule", label: "Establish a routine", description: "Feeding, walks, potty times", cost: "Free" },
        { id: "training-plan", label: "Research training classes", description: "Positive reinforcement", cost: "$100-300" },
      ],
    },
  ],
};

export default function ChecklistPage() {
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${petType}`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    } else {
      setCheckedItems({});
    }
  }, [petType]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`checklist-${petType}`, JSON.stringify(checkedItems));
  }, [checkedItems, petType]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = newPetChecklists[petType];
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">✅</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            New Pet Checklist
          </h1>
          <p className="text-gray-600">
            Everything you need to welcome your new family member home.
          </p>
        </div>

        {/* Pet Type Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPetType("cat")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              petType === "cat"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🐱 Cat
          </button>
          <button
            onClick={() => setPetType("dog")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              petType === "dog"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🐕 Dog
          </button>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Your Progress</span>
            <span>{checkedCount} of {totalItems} items</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-green-600 font-medium mt-2">
              🎉 You&apos;re all set! Welcome home, new friend!
            </p>
          )}
        </div>

        {/* Checklists */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-amber-100 to-amber-50 px-5 py-3 border-b">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.title}
                </h2>
              </div>
              <div className="divide-y">
                {category.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${checkedItems[item.id] ? "text-gray-400 line-through" : "text-gray-900"}`}>
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-sm text-gray-500">{item.description}</div>
                      )}
                    </div>
                    {item.cost && (
                      <div className="text-sm text-gray-400">{item.cost}</div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Give your new pet time to adjust - don&apos;t rush introductions</li>
            <li>• Keep the same food they were eating to avoid tummy upset</li>
            <li>• Set up a quiet, safe space before bringing them home</li>
            <li>• Have your vet&apos;s number saved before you need it</li>
            <li>• Patience is key - the first few weeks can be challenging!</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help getting supplies?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/wishlist"
              className="px-6 py-2 bg-white text-amber-600 font-medium rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              View Wishlist
            </Link>
            <Link
              href="/calculator"
              className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Cost Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
