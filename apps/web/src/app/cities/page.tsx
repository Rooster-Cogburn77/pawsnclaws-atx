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
    stats: { colonies: 4, cats: 188 },
  },
  {
    id: "charlotte",
    name: "Charlotte",
    state: "NC",
    status: "coming-soon",
    color: "teal",
    url: "/cities/charlotte",
    stats: null,
  },
];

const upcomingCities = [
  { name: "Denver", state: "CO" },
  { name: "Portland", state: "OR" },
  { name: "Phoenix", state: "AZ" },
  { name: "San Antonio", state: "TX" },
];

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-amber-600 hover:text-amber-700 text-sm">
            ← Back to PawsNClaws ATX
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            PawsNClaws Cities
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Community cat support is expanding across America.
            Find your city or help us launch in a new location.
          </p>
        </div>
      </section>

      {/* Active & Coming Soon Cities */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Cities</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={city.url}
                className={`block bg-white rounded-xl shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                  city.status === "active"
                    ? "border-amber-200 hover:border-amber-400"
                    : "border-teal-200 hover:border-teal-400"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {city.name}, {city.state}
                    </h3>
                    <p className={`text-sm font-medium ${
                      city.status === "active" ? "text-green-600" : "text-teal-600"
                    }`}>
                      {city.status === "active" ? "Active" : "Coming Soon"}
                    </p>
                  </div>
                  <span className={`text-4xl`}>
                    {city.status === "active" ? "🐱" : "🚀"}
                  </span>
                </div>

                {city.stats && (
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span>{city.stats.colonies} colonies mapped</span>
                    <span>{city.stats.cats} cats supported</span>
                  </div>
                )}

                {city.status === "coming-soon" && (
                  <p className="text-sm text-gray-500">
                    Sign up to be notified when we launch →
                  </p>
                )}
              </Link>
            ))}
          </div>

          {/* Upcoming */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">On Our Radar</h2>
          <p className="text-gray-600 mb-6">
            These cities are on our expansion wishlist. Want to help launch one?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {upcomingCities.map((city) => (
              <div
                key={city.name}
                className="bg-white rounded-lg border p-4 text-center"
              >
                <p className="font-medium text-gray-900">{city.name}</p>
                <p className="text-sm text-gray-500">{city.state}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start a Chapter */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start PawsNClaws in Your City
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our open-source playbook and code make it easy to launch community cat
            support anywhere. We provide the tools, you provide the passion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?subject=new-city"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Express Interest
            </Link>
            <a
              href="https://github.com/pawsnclaws/pawsnclaws-template"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
