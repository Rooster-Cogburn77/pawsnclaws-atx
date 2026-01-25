import Link from "next/link";

export const metadata = {
  title: "Resources",
  description: "Charlotte-area resources for community cats - TNR programs, low-cost vets, and emergency services.",
};

const tnrResources = [
  {
    name: "Humane Society of Charlotte",
    description: "Official city TNR partner. $50 surgeries, trap rentals available Mon-Wed.",
    address: "1348 Parker Dr., Charlotte, NC 28208",
    phone: "(704) 377-0534",
    website: "https://humanesocietyofcharlotte.org/health-wellness/trap-neuter-return/",
    cost: "$50 per cat",
  },
  {
    name: "Stand For Animals",
    description: "Low-cost TNR with free trap loans. Email to schedule appointments.",
    address: "224 W. 32nd Street, Charlotte, NC 28206",
    phone: "(704) 970-2711",
    email: "tnr@standforanimals.org",
    website: "https://standforanimals.org/services-and-products/spay-neuter/community-cats",
  },
  {
    name: "Friends of Feral Felines",
    description: "All-volunteer 501(c)(3) providing TNVR education and guidance across 8 counties.",
    phone: "(704) 348-1578",
    website: "https://www.friendsofferalfelines.org/",
  },
  {
    name: "Windsor Kittens",
    description: "TNR-focused rescue serving East Charlotte. Surgery costs often subsidized.",
    website: "https://www.windsorkittens.org/",
  },
  {
    name: "SnipWell Clinic",
    description: "Low-cost spay/neuter just over the SC border in Fort Mill.",
    address: "3463 US-21 #110, Fort Mill, SC 29715",
    phone: "(803) 228-4208",
    website: "https://www.snipwell.org",
  },
];

const emergencyVets = [
  {
    name: "CARE Charlotte",
    description: "24/7 emergency and specialty care",
    phone: "(704) 457-2300",
    website: "https://carecharlotte.com/",
  },
  {
    name: "VEG Charlotte",
    description: "24/7 walk-ins welcome",
    phone: "(980) 880-6062",
    website: "https://veg.com/locations/north-carolina/charlotte",
  },
  {
    name: "Carolina Veterinary Specialists",
    description: "24/7 emergency services",
    phone: "(704) 504-9608",
    website: "https://www.charlotte.carolinavet.com/",
  },
];

const shelters = [
  {
    name: "Charlotte-Mecklenburg Animal Care & Control",
    description: "City shelter - report strays, injured animals. Call 311 for assistance.",
    phone: "311 or (704) 336-7600",
    website: "https://www.charlottenc.gov/Animal-Care-and-Control",
  },
  {
    name: "Humane Society of Charlotte",
    description: "Adoption, surrender, community cat services",
    address: "1348 Parker Dr., Charlotte, NC 28208",
    phone: "(704) 377-0534",
    website: "https://humanesocietyofcharlotte.org/",
  },
];

export default function CharlotteResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Charlotte Cat Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Local resources to help you care for community cats in the Charlotte area.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="mb-12 p-4 bg-white rounded-xl shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-2">Jump to:</div>
          <div className="flex flex-wrap gap-2">
            <a href="#tnr" className="px-3 py-1 bg-teal-50 rounded-full text-sm text-teal-700 hover:bg-teal-100">
              TNR Programs
            </a>
            <a href="#emergency" className="px-3 py-1 bg-red-50 rounded-full text-sm text-red-700 hover:bg-red-100">
              Emergency Vets
            </a>
            <a href="#shelters" className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700 hover:bg-blue-100">
              Shelters
            </a>
          </div>
        </nav>

        {/* TNR Resources */}
        <section id="tnr" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            TNR (Trap-Neuter-Return) Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tnrResources.map((resource) => (
              <div key={resource.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <div className="space-y-2 text-sm">
                  {resource.address && (
                    <p className="text-gray-500">📍 {resource.address}</p>
                  )}
                  {resource.phone && (
                    <p>
                      📞{" "}
                      <a href={`tel:${resource.phone}`} className="text-teal-600 hover:text-teal-700">
                        {resource.phone}
                      </a>
                    </p>
                  )}
                  {resource.email && (
                    <p>
                      📧{" "}
                      <a href={`mailto:${resource.email}`} className="text-teal-600 hover:text-teal-700">
                        {resource.email}
                      </a>
                    </p>
                  )}
                  {resource.cost && (
                    <p className="text-teal-600 font-medium">💲 {resource.cost}</p>
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

        {/* Emergency Vets */}
        <section id="emergency" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            24/7 Emergency Veterinarians
          </h2>
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="grid md:grid-cols-3 gap-6">
              {emergencyVets.map((vet) => (
                <div key={vet.name} className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{vet.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{vet.description}</p>
                  <a
                    href={`tel:${vet.phone}`}
                    className="text-lg font-bold text-red-600 hover:text-red-700"
                  >
                    {vet.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shelters */}
        <section id="shelters" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shelters & Animal Control
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {shelters.map((shelter) => (
              <div key={shelter.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{shelter.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{shelter.description}</p>
                <div className="space-y-2 text-sm">
                  {shelter.address && (
                    <p className="text-gray-500">📍 {shelter.address}</p>
                  )}
                  <p>
                    📞{" "}
                    <a href={`tel:${shelter.phone}`} className="text-teal-600 hover:text-teal-700">
                      {shelter.phone}
                    </a>
                  </p>
                </div>
                <a
                  href={shelter.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-teal-600 font-medium hover:text-teal-700"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Need Help CTA */}
        <div className="bg-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help With a Community Cat?</h2>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Found a stray? Need TNR assistance? Have questions about colony care?
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
