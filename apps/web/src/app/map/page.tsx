"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPinIcon } from "@/components/Icons";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues with Leaflet
const ColonyMap = dynamic(() => import("@/components/ColonyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

// Approved colonies will come from Supabase
// For now, showing empty state until database is connected
interface Colony {
  id: string;
  name: string;
  location_name: string;
  latitude: number;
  longitude: number;
  cat_count: number;
  all_tnr: boolean;
  monthly_food_cost: number;
  status: "active" | "inactive";
  description?: string;
}

interface FoodStation {
  id: string;
  name: string;
  host_business: string;
  address: string;
  latitude: number;
  longitude: number;
  needs_restock: boolean;
}

// Seed data from research - known community cat areas in Austin
// These are general area markers, not exact locations (for cat safety)
// Real colony data will come from Supabase once submissions are approved
const colonies: Colony[] = [
  {
    id: "ut-campus",
    name: "UT Campus / Waller Creek Area",
    location_name: "University of Texas Campus",
    latitude: 30.2849,
    longitude: -97.7341,
    cat_count: 40,
    all_tnr: true,
    monthly_food_cost: 15000, // $150
    status: "active",
    description: "Managed by Campus Cat Coalition since 2000s. Waller Creek corridor provides habitat. Population reduced from 100+ to ~40 through TNR.",
  },
  {
    id: "west-campus",
    name: "West Campus Cats",
    location_name: "West Campus neighborhood",
    latitude: 30.2891,
    longitude: -97.7467,
    cat_count: 25,
    all_tnr: false,
    monthly_food_cost: 12500, // $125
    status: "active",
    description: "Student volunteers from Meow Mates help care for strays in the West Campus area near UT.",
  },
  {
    id: "dessau-estates",
    name: "Dessau Estates Colony",
    location_name: "Dessau Estates, North Austin",
    latitude: 30.3847,
    longitude: -97.6521,
    cat_count: 93,
    all_tnr: true,
    monthly_food_cost: 25000, // $250
    status: "active",
    description: "Large colony TNR'd by Austin Animal Center community cat program. 93 cats fixed and returned.",
  },
  {
    id: "east-austin",
    name: "East Austin Community Cats",
    location_name: "East Austin",
    latitude: 30.2621,
    longitude: -97.7131,
    cat_count: 30,
    all_tnr: false,
    monthly_food_cost: 15000, // $150
    status: "active",
    description: "Historic colony presence in East Austin neighborhoods. Multiple caretakers feed daily.",
  },
];

// Food stations - coming soon, these will be real partner locations
const foodStations: FoodStation[] = [];

type ViewType = "colonies" | "food-stations" | "all";

export default function MapPage() {
  const [view, setView] = useState<ViewType>("colonies");
  const [selectedColony, setSelectedColony] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.2672, -97.7431]); // Austin center

  const handleMarkerClick = (id: string, lat: number, lng: number) => {
    setSelectedColony(id);
    setMapCenter([lat, lng]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Community Cat Map
              </h1>
              <p className="text-gray-600 text-sm">
                Colonies we support, food stations, and resources
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { key: "colonies", label: "🐱 Colonies", count: colonies.length },
                { key: "food-stations", label: "🥫 Food Stations", count: foodStations.length },
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
              {/* Report Colony CTA */}
              <Link
                href="/map/submit"
                className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-4 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>📍</span> Report a Colony
                </h3>
                <p className="text-sm text-amber-100">
                  Know of a cat colony? Help us track and support them.
                </p>
              </Link>

              {/* Sponsor CTA */}
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

              {colonies.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">🐱</span>
                  <h3 className="font-bold text-gray-900 mb-2">No Colonies Yet</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We&apos;re building our colony database. Know of a community cat colony?
                  </p>
                  <Link
                    href="/map/submit"
                    className="inline-block px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Report a Colony
                  </Link>
                </div>
              ) : (
                colonies.map((colony) => (
                  <button
                    key={colony.id}
                    onClick={() => handleMarkerClick(colony.id, colony.latitude, colony.longitude)}
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
                ))
              )}
            </div>
          )}

          {view === "food-stations" && (
            <div className="p-4 space-y-4">
              {/* Host CTA */}
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

              {foodStations.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">🥫</span>
                  <h3 className="font-bold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We&apos;re setting up food stations across Austin. Want to host one?
                  </p>
                  <Link
                    href="/contact?subject=food-station"
                    className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Become a Host
                  </Link>
                </div>
              ) : (
                foodStations.map((station) => (
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
                ))
              )}
            </div>
          )}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <ColonyMap
            colonies={colonies}
            foodStations={foodStations}
            center={mapCenter}
            selectedId={selectedColony}
            showColonies={view === "colonies" || view === "all"}
            showFoodStations={view === "food-stations" || view === "all"}
            onMarkerClick={handleMarkerClick}
          />

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
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

          {/* Submit button on map */}
          <Link
            href="/map/submit"
            className="absolute bottom-4 right-4 px-4 py-3 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-colors z-10 flex items-center gap-2"
          >
            <span>📍</span> Report a Colony
          </Link>
        </div>
      </div>
    </div>
  );
}
