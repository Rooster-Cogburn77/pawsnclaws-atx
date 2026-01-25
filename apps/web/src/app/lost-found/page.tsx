"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPinIcon } from "@/components/Icons";

type ListingType = "lost" | "found" | "all";

interface Listing {
  id: string;
  type: "lost" | "found";
  species: string;
  breed?: string;
  name?: string | null;
  color: string;
  description: string;
  location_last_seen?: string;
  location_found?: string;
  contact_name: string;
  contact_phone?: string;
  contact_email?: string;
  photos: string[];
  status: "active" | "reunited" | "closed";
  created_at: string;
}

// Demo data - used when Supabase is not connected
const demoListings: Listing[] = [
  {
    id: "1",
    type: "lost" as const,
    species: "dog",
    breed: "Golden Retriever",
    name: "Buddy",
    color: "Golden",
    description: "Friendly, wearing blue collar with tags. Last seen near Zilker Park.",
    location_last_seen: "Zilker Park, Austin",
    contact_name: "Sarah",
    contact_phone: "(512) 555-0123",
    photos: [],
    status: "active" as const,
    created_at: "2026-01-23",
  },
  {
    id: "2",
    type: "found" as const,
    species: "cat",
    breed: "Tabby",
    name: null,
    color: "Orange tabby",
    description: "Very friendly orange cat found wandering. No collar. Appears well-fed.",
    location_found: "Mueller neighborhood",
    contact_name: "Mike",
    contact_email: "mike@example.com",
    photos: [],
    status: "active" as const,
    created_at: "2026-01-22",
  },
  {
    id: "3",
    type: "lost" as const,
    species: "cat",
    breed: "Siamese",
    name: "Luna",
    color: "Cream with dark points",
    description: "Indoor cat, may be scared. Microchipped. Please check garages and sheds.",
    location_last_seen: "East Austin, near 12th St",
    contact_name: "Maria",
    contact_phone: "(512) 555-0456",
    photos: [],
    status: "active" as const,
    created_at: "2026-01-20",
  },
  {
    id: "4",
    type: "found" as const,
    species: "dog",
    breed: "Chihuahua mix",
    name: null,
    color: "Brown and white",
    description: "Small dog found near busy intersection. Safe now. No chip found.",
    location_found: "S. Lamar & Oltorf",
    contact_name: "Austin Animal Center",
    contact_phone: "311",
    photos: [],
    status: "active" as const,
    created_at: "2026-01-19",
  },
];

export default function LostFoundPage() {
  const [filter, setFilter] = useState<ListingType>("all");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [listings, setListings] = useState<Listing[]>(demoListings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch("/api/lost-found");
        const data = await response.json();
        if (data.listings && data.listings.length > 0) {
          setListings(data.listings);
        }
        // If no listings from API, keep demo data
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        // Keep demo data on error
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    if (filter !== "all" && listing.type !== filter) return false;
    if (speciesFilter !== "all" && listing.species !== speciesFilter) return false;
    return listing.status === "active";
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lost & Found Pets
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Help reunite Austin pets with their families. Report a lost pet or a
            found stray.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lost-found/report?type=lost"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
            >
              🔴 Report Lost Pet
            </Link>
            <Link
              href="/lost-found/report?type=found"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
            >
              🟢 Report Found Pet
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          <div className="flex rounded-lg bg-white shadow p-1">
            {[
              { key: "all", label: "All" },
              { key: "lost", label: "🔴 Lost" },
              { key: "found", label: "🟢 Found" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as ListingType)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  filter === f.key
                    ? "bg-amber-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg bg-white shadow p-1">
            {[
              { key: "all", label: "All Pets" },
              { key: "dog", label: "🐕 Dogs" },
              { key: "cat", label: "🐈 Cats" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setSpeciesFilter(f.key)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  speciesFilter === f.key
                    ? "bg-amber-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <p className="text-gray-500 mt-4">Loading listings...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No listings match your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="font-bold text-red-900 mb-3">🔴 Lost Your Pet?</h3>
              <ul className="text-sm text-red-800 space-y-2">
                <li>• Search your neighborhood immediately - most pets are found nearby</li>
                <li>• Post on Nextdoor, Facebook groups, and Pawboost</li>
                <li>• Put out items with your scent (worn clothes, bedding)</li>
                <li>• Check Austin Animal Center daily: (512) 978-0500</li>
                <li>• Visit shelters in person - don&apos;t just call</li>
                <li>• Leave garage slightly open at night for cats</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3">🟢 Found a Pet?</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Check for a collar/tags and call the number</li>
                <li>• Take to any vet or shelter to scan for microchip (free)</li>
                <li>• Post on lost pet Facebook groups with photo</li>
                <li>• Put up flyers in the area where found</li>
                <li>• Report to Austin 311 if you can&apos;t keep temporarily</li>
                <li>• Don&apos;t post &quot;found&quot; - ask finders to describe the pet</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const isLost = listing.type === "lost";

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
        isLost ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                isLost
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isLost ? "LOST" : "FOUND"}
            </span>
            <span className="ml-2 text-xs text-gray-500">{listing.created_at}</span>
          </div>
          <span className="text-2xl">
            {listing.species === "dog" ? "🐕" : "🐈"}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-1">
          {listing.name || `${listing.color} ${listing.breed || listing.species}`}
        </h3>

        {listing.breed && (
          <p className="text-sm text-gray-600 mb-2">{listing.breed}</p>
        )}

        <p className="text-sm text-gray-700 mb-3">{listing.description}</p>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <MapPinIcon className="w-4 h-4" />
          <span>
            {isLost ? listing.location_last_seen : listing.location_found}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-900">
            Contact: {listing.contact_name}
          </p>
          {listing.contact_phone && (
            <a
              href={`tel:${listing.contact_phone}`}
              className="text-sm text-amber-600 hover:underline"
            >
              {listing.contact_phone}
            </a>
          )}
          {listing.contact_email && (
            <a
              href={`mailto:${listing.contact_email}`}
              className="text-sm text-amber-600 hover:underline block"
            >
              {listing.contact_email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
