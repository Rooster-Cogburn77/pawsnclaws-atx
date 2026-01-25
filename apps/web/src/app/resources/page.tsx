import { Metadata } from "next";
import { resourceCategories, Resource } from "@/data/resources";
import { MapPinIcon, PhoneIcon, GlobeIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Austin-area resources for pet owners - low-cost vets, pet food assistance, TNR programs, and emergency services.",
};

export default function ResourcesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Austin Animal Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Local resources to help you care for pets and community animals.
            Most services are free or low-cost.
          </p>
        </div>

        {/* Quick Jump */}
        <nav className="mb-12 p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Jump to:
          </div>
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 border border-gray-200 transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Categories */}
        <div className="space-y-16">
          {resourceCategories.map((category) => (
            <section key={category.id} id={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.resources.map((resource, i) => (
                  <ResourceCard key={i} resource={resource} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-amber-50 rounded-xl border border-amber-200">
          <h3 className="font-semibold text-amber-800">
            Before You Visit
          </h3>
          <p className="mt-2 text-sm text-amber-700">
            Hours, services, and pricing may change. Please call ahead or check
            websites to confirm current information. We do our best to keep this
            list accurate but cannot guarantee availability.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-200 hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
      <p className="mt-2 text-gray-600 text-sm">{resource.description}</p>

      <div className="mt-4 space-y-2">
        {resource.address && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
            <span>{resource.address}</span>
          </div>
        )}

        {resource.phone && (
          <div className="flex items-center gap-2 text-sm">
            <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a
              href={`tel:${resource.phone.replace(/[^0-9+]/g, "")}`}
              className="text-amber-600 hover:text-amber-700"
            >
              {resource.phone}
            </a>
          </div>
        )}

        {resource.website && (
          <div className="flex items-center gap-2 text-sm">
            <GlobeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 truncate"
            >
              {resource.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {resource.hours && (
          <div className="text-sm text-gray-500 font-medium">
            {resource.hours}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
