"use client";

import { useState } from "react";
import Link from "next/link";

// Sample food stations - will be dynamic from Supabase
const sampleStations = [
  {
    id: "1",
    name: "South Austin Community Center",
    host_business: "Community Partner",
    address: "2508 Durwood St, Austin, TX 78704",
    needs_restock: false,
    last_restocked: "2025-01-22",
    is_active: true,
    has_cat_food: true,
    has_dog_food: true,
  },
  {
    id: "2",
    name: "East Austin Pet Pantry",
    host_business: "Cherrywood Veterinary Clinic",
    address: "1423 E 38th St, Austin, TX 78722",
    needs_restock: true,
    last_restocked: "2025-01-18",
    is_active: true,
    has_cat_food: true,
    has_dog_food: true,
  },
  {
    id: "3",
    name: "North Loop Station",
    host_business: "Local Coffee Shop",
    address: "4631 Airport Blvd, Austin, TX 78751",
    needs_restock: false,
    last_restocked: "2025-01-21",
    is_active: true,
    has_cat_food: true,
    has_dog_food: false,
  },
  {
    id: "4",
    name: "Del Valle Library Station",
    host_business: "Del Valle Library",
    address: "5901 Ross Rd, Del Valle, TX 78617",
    needs_restock: false,
    last_restocked: "2025-01-20",
    is_active: true,
    has_cat_food: true,
    has_dog_food: true,
  },
];

export default function FoodStationsPage() {
  const [filter, setFilter] = useState<"all" | "dog" | "cat" | "needs-stock">("all");

  const filteredStations = sampleStations.filter((station) => {
    if (!station.is_active) return false;
    if (filter === "dog") return station.has_dog_food;
    if (filter === "cat") return station.has_cat_food;
    if (filter === "needs-stock") return station.needs_restock;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🍲</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Food Stations
          </h1>
          <p className="text-gray-600">
            Free pet food available at community locations around Austin.
            No paperwork, no judgment - just grab what you need.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-green-900 mb-2">How It Works</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Visit any active station during business hours</li>
            <li>• Take what you need for your pets (please be considerate)</li>
            <li>• Stations are restocked weekly by volunteers</li>
            <li>• Want to donate food? Drop it at any station!</li>
          </ul>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "all", label: "All Stations" },
            { id: "dog", label: "Dog Food" },
            { id: "cat", label: "Cat Food" },
            { id: "needs-stock", label: "Needs Restock" },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id as typeof filter)}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                filter === option.id
                  ? "border-amber-500 bg-amber-50 text-amber-900"
                  : "border-gray-200 hover:border-amber-300 text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Station Cards */}
        <div className="space-y-4 mb-8">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{station.name}</h3>
                  {station.host_business && (
                    <p className="text-sm text-gray-500">
                      Hosted by {station.host_business}
                    </p>
                  )}
                </div>
                {station.needs_restock ? (
                  <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Stocked
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-3">{station.address}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {station.has_dog_food && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    Dog Food
                  </span>
                )}
                {station.has_cat_food && (
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                    Cat Food
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  Last restocked: {new Date(station.last_restocked).toLocaleDateString()}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:underline font-medium"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No stations found matching your filter.
          </div>
        )}

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-2">Want to Donate?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Drop off pet food at any station, or contact us for pickup of
              larger donations.
            </p>
            <Link
              href="/donate"
              className="inline-block text-amber-600 hover:underline font-medium text-sm"
            >
              Donate Food or Funds
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-2">Host a Station</h3>
            <p className="text-sm text-gray-600 mb-4">
              Business or community center? Partner with us to host a pet food
              station at your location.
            </p>
            <Link
              href="/volunteer"
              className="inline-block text-amber-600 hover:underline font-medium text-sm"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        {/* Volunteer CTA */}
        <div className="mt-8 bg-amber-100 rounded-xl p-6 text-center">
          <h3 className="font-bold text-amber-900 mb-2">
            Help Keep Stations Stocked
          </h3>
          <p className="text-sm text-amber-800 mb-4">
            We need volunteers to help restock stations weekly. It&apos;s a great
            way to make a direct impact!
          </p>
          <Link
            href="/volunteer"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Volunteer to Restock
          </Link>
        </div>
      </div>
    </div>
  );
}
