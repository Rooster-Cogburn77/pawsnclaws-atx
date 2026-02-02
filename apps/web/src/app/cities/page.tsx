"use client";

import Link from "next/link";

const cities = [
  {
    id: "austin",
    name: "Austin",
    state: "TX",
    status: "active",
    color: "amber",
    url: "/",
    tagline: "Our founding chapter",
    stats: { resources: 50, colonies: 4 },
  },
  {
    id: "charlotte",
    name: "Charlotte",
    state: "NC",
    status: "active",
    color: "teal",
    url: "/cities/charlotte",
    tagline: "The Queen City chapter",
    stats: { resources: 35 },
  },
];

const upcomingCities = [
  { name: "Denver", state: "CO" },
  { name: "Portland", state: "OR" },
  { name: "Phoenix", state: "AZ" },
  { name: "San Antonio", state: "TX" },
  { name: "Nashville", state: "TN" },
  { name: "Raleigh", state: "NC" },
];

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            PawsNClaws Cities
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Community pet support is expanding across America.
            Find your city or help us launch in a new location.
          </p>
        </div>
      </section>

      {/* Active Cities */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Active Cities</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={city.url}
                className={`block bg-white rounded-xl shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                  city.color === "amber"
                    ? "border-amber-200 hover:border-amber-400"
                    : "border-teal-200 hover:border-teal-400"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {city.name}, {city.state}
                    </h3>
                    <p className="text-sm text-gray-600">{city.tagline}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    city.color === "amber"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-teal-100 text-teal-700"
                  }`}>
                    ACTIVE
                  </span>
                </div>

                {city.stats && (
                  <div className="flex gap-6 text-sm text-gray-600">
                    {city.stats.resources && (
                      <span>{city.stats.resources}+ resources listed</span>
                    )}
                    {city.stats.colonies && (
                      <span>{city.stats.colonies} colonies mapped</span>
                    )}
                  </div>
                )}

                <p className={`mt-4 text-sm font-medium ${
                  city.color === "amber" ? "text-amber-600" : "text-teal-600"
                }`}>
                  View {city.name} →
                </p>
              </Link>
            ))}
          </div>

          {/* On Our Radar */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">On Our Radar</h2>
          <p className="text-gray-600 mb-6">
            These cities are on our expansion wishlist. Want to help launch one?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {upcomingCities.map((city) => (
              <Link
                key={city.name}
                href={`/cities/request?city=${encodeURIComponent(city.name)}&state=${encodeURIComponent(city.state)}`}
                className="bg-white rounded-lg border p-4 text-center hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-gray-900">{city.name}</p>
                <p className="text-sm text-gray-500">{city.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Request Your City */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🌎</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us know where you&apos;d like to see PawsNClaws next.
            The more requests we get, the higher priority a city becomes.
          </p>
          <Link
            href="/cities/request"
            className="inline-block px-8 py-4 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition-colors"
          >
            Request Your City
          </Link>
        </div>
      </section>

      {/* Start a Chapter */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Lead?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Each city needs a local champion. If you&apos;re passionate about helping
            pets and people in your community, we&apos;d love to talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer/city-lead"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Become a City Lead
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
