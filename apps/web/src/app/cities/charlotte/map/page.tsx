"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues with Leaflet
const ColonyMap = dynamic(() => import("@/components/ColonyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

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

// Charlotte colonies - coming soon, will be populated from database
// For now showing empty state with Charlotte center
const colonies: Colony[] = [];
const foodStations: FoodStation[] = [];

type ViewType = "colonies" | "food-stations";

export default function CharlotteMapPage() {
  const [view, setView] = useState<ViewType>("colonies");
  const [selectedColony, setSelectedColony] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([35.2271, -80.8431]); // Charlotte center

  const handleMarkerClick = (id: string, lat: number, lng: number) => {
    setSelectedColony(id);
    setMapCenter([lat, lng]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Charlotte Community Cat Map
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
                      ? "bg-teal-500 text-white"
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

      <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white border-r overflow-y-auto">
          {view === "colonies" && (
            <div className="p-4 space-y-4">
              {/* Report Colony CTA */}
              <Link
                href="/cities/charlotte/map/submit"
                className="block bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-4 text-white hover:from-teal-600 hover:to-cyan-600 transition-all"
              >
                <h3 className="font-bold mb-1 flex items-center gap-2">
                  <span>📍</span> Report a Colony
                </h3>
                <p className="text-sm text-teal-100">
                  Know of a cat colony? Help us track and support them.
                </p>
              </Link>

              {/* Sponsor CTA */}
              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-bold text-teal-800 mb-1">
                  Sponsor a Colony
                </h3>
                <p className="text-sm text-teal-700 mb-3">
                  Your monthly donation feeds and cares for an entire colony.
                </p>
                <Link
                  href="/cities/charlotte/donate"
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Learn more →
                </Link>
              </div>

              {colonies.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">🐱</span>
                  <h3 className="font-bold text-gray-900 mb-2">Building Our Map</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We&apos;re building our Charlotte colony database. Know of a
                    community cat colony?
                  </p>
                  <Link
                    href="/cities/charlotte/map/submit"
                    className="inline-block px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
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
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <h3 className="font-bold text-gray-900">{colony.name}</h3>
                    <p className="text-sm text-gray-500">{colony.location_name}</p>
                    <p className="text-sm text-gray-600">🐱 {colony.cat_count} cats</p>
                  </button>
                ))
              )}
            </div>
          )}

          {view === "food-stations" && (
            <div className="p-4 space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-1">
                  Host a Food Station
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  Have a business? Host a pet food donation box.
                </p>
                <Link
                  href="/cities/charlotte/contact?subject=food-station"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Get in touch →
                </Link>
              </div>

              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">🥫</span>
                <h3 className="font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We&apos;re setting up food stations across Charlotte.
                </p>
                <Link
                  href="/cities/charlotte/contact?subject=food-station"
                  className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Become a Host
                </Link>
              </div>
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
            showColonies={view === "colonies"}
            showFoodStations={view === "food-stations"}
            onMarkerClick={handleMarkerClick}
          />

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
            <div className="text-xs text-gray-500 mb-2">Legend</div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
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
            href="/cities/charlotte/map/submit"
            className="absolute bottom-4 right-4 px-4 py-3 bg-teal-500 text-white font-bold rounded-xl shadow-lg hover:bg-teal-600 transition-colors z-10 flex items-center gap-2"
          >
            <span>📍</span> Report a Colony
          </Link>
        </div>
      </div>
    </div>
  );
}
