"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon } from "@/components/Icons";

// Demo colonies - will come from Supabase
const demoColonies = [
  {
    id: "1",
    name: "Riverside Colony",
    location_name: "Behind HEB on Riverside",
    cat_count: 23,
    all_tnr: true,
    monthly_food_cost: 15000, // $150
    status: "active" as const,
    description: "Well-established colony with dedicated caretaker. All cats are TNR'd and healthy.",
  },
  {
    id: "2",
    name: "Mueller Park Colony",
    location_name: "East side of Mueller Lake Park",
    cat_count: 8,
    all_tnr: true,
    monthly_food_cost: 6000,
    status: "active" as const,
    description: "Small colony near the park. Friendly cats, some are adoptable.",
  },
  {
    id: "3",
    name: "South Lamar Colony",
    location_name: "Behind the shopping center",
    cat_count: 15,
    all_tnr: false,
    monthly_food_cost: 10000,
    status: "active" as const,
    description: "Growing colony - 5 cats still need TNR. Urgent need for trapping help.",
  },
];

const demoFoodStations = [
  {
    id: "1",
    name: "Barton Springs Pet Pantry",
    host_business: "Austin Java",
    address: "1206 Parkway, Austin",
    needs_restock: false,
  },
  {
    id: "2",
    name: "East Austin Pet Food Box",
    host_business: "Quickie Pickie",
    address: "1208 E 11th St, Austin",
    needs_restock: true,
  },
];

type ViewType = "colonies" | "food-stations" | "all";

export default function MapPage() {
  const [view, setView] = useState<ViewType>("colonies");
  const [selectedColony, setSelectedColony] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Community Cat Map
              </h1>
              <p className="text-gray-600 text-sm">
                Colonies we manage, food stations, and more
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { key: "colonies", label: "🐱 Colonies", count: demoColonies.length },
                { key: "food-stations", label: "🥫 Food Stations", count: demoFoodStations.length },
              ].map((v) => (
                <button
                  key={v.key}
                  onClick={() => setView(v.key as ViewType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === v.key
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {v.label} ({v.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white border-r overflow-y-auto">
          {view === "colonies" && (
            <div className="p-4 space-y-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-bold text-amber-800 mb-1">
                  Sponsor a Colony
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  Your monthly donation feeds and cares for an entire colony.
                </p>
                <Link
                  href="/donate?type=colony"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Learn more →
                </Link>
              </div>

              {demoColonies.map((colony) => (
                <button
                  key={colony.id}
                  onClick={() => setSelectedColony(colony.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedColony === colony.id
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{colony.name}</h3>
                    {!colony.all_tnr && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                        Needs TNR
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {colony.location_name}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      🐱 {colony.cat_count} cats
                    </span>
                    <span className="text-amber-600 font-medium">
                      ${colony.monthly_food_cost / 100}/mo to sponsor
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {view === "food-stations" && (
            <div className="p-4 space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-1">
                  Host a Food Station
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  Have a business? Host a pet food donation box for the
                  community.
                </p>
                <Link
                  href="/contact?subject=food-station"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Get in touch →
                </Link>
              </div>

              {demoFoodStations.map((station) => (
                <div
                  key={station.id}
                  className="p-4 rounded-lg border-2 border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{station.name}</h3>
                    {station.needs_restock && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Needs Restock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {station.host_business}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {station.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map Area (placeholder) */}
        <div className="flex-1 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
              <span className="text-6xl mb-4 block">🗺️</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Interactive Map Coming Soon
              </h2>
              <p className="text-gray-600 mb-4">
                We&apos;re building an interactive map showing all colonies, food
                stations, and resources across Austin.
              </p>
              <p className="text-sm text-gray-500">
                For now, browse the list on the left to see our managed
                locations.
              </p>
            </div>
          </div>

          {/* Map pins preview */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
            <div className="text-xs text-gray-500 mb-2">Legend</div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                Colony (TNR complete)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Colony (needs TNR)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Food Station
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
