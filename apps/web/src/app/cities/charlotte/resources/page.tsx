import Link from "next/link";
import { charlotteResourceCategories } from "@/data/charlotte-resources";

export const metadata = {
  title: "Resources",
  description: "Charlotte-area resources for pets - TNR programs, low-cost vets, emergency services, and shelters.",
};

const iconMap: Record<string, string> = {
  scissors: "✂️",
  heart: "❤️",
  alert: "🚨",
  home: "🏠",
  food: "🍲",
  wildlife: "🦝",
  training: "🎓",
};

export default function CharlotteResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Charlotte Pet Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Local resources to help you care for pets in the Charlotte area.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="mb-12 p-4 bg-white rounded-xl shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-2">Jump to:</div>
          <div className="flex flex-wrap gap-2">
            {charlotteResourceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-3 py-1 bg-teal-50 rounded-full text-sm text-teal-700 hover:bg-teal-100"
              >
                {iconMap[category.icon] || ""} {category.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Resource Categories */}
        {charlotteResourceCategories.map((category) => (
          <section key={category.id} id={category.id} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {iconMap[category.icon] || ""} {category.title}
            </h2>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <div className={`grid ${category.id === "emergency" ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6`}>
              {category.resources.map((resource) => (
                <div
                  key={resource.name}
                  className={`rounded-xl p-6 shadow-sm ${
                    category.id === "emergency" ? "bg-red-50 border border-red-100" : "bg-white"
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <div className="space-y-2 text-sm">
                    {resource.address && (
                      <p className="text-gray-500">📍 {resource.address}</p>
                    )}
                    {resource.phone && (
                      <p>
                        📞{" "}
                        <a
                          href={`tel:${resource.phone.replace(/[^0-9+]/g, "")}`}
                          className={`${category.id === "emergency" ? "text-red-600 hover:text-red-700 font-bold" : "text-teal-600 hover:text-teal-700"}`}
                        >
                          {resource.phone}
                        </a>
                      </p>
                    )}
                    {resource.hours && (
                      <p className="text-gray-500">🕐 {resource.hours}</p>
                    )}
                  </div>
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-teal-600 font-medium hover:text-teal-700"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Need Help CTA */}
        <div className="bg-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help With a Pet?</h2>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Found a stray? Need TNR assistance? Have questions about pet care?
            We&apos;re here to help connect you with the right resources.
          </p>
          <Link
            href="/cities/charlotte/contact"
            className="inline-block px-6 py-3 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
