import Link from "next/link";

const categories = [
  {
    id: "shelters",
    title: "Shelters & Rescues",
    emoji: "🏠",
    resources: [
      {
        name: "Austin Animal Center",
        description: "City of Austin's municipal shelter. Open-intake, no-kill shelter.",
        address: "7201 Levander Loop",
        phone: "(512) 978-0500",
        website: "https://www.austintexas.gov/department/animal-services",
        services: ["Adoptions", "Lost & Found", "Microchipping", "Low-cost services"],
      },
      {
        name: "Austin Pets Alive!",
        description: "Rescue organization focused on saving animals at risk of euthanasia.",
        address: "1156 W Cesar Chavez St",
        phone: "(512) 961-6519",
        website: "https://www.austinpetsalive.org",
        services: ["Adoptions", "Foster program", "Medical program"],
      },
      {
        name: "Austin Humane Society",
        description: "No-kill shelter offering adoptions and community programs.",
        address: "124 W Anderson Ln",
        phone: "(512) 646-7387",
        website: "https://www.austinhumanesociety.org",
        services: ["Adoptions", "Low-cost vet care", "Training classes"],
      },
    ],
  },
  {
    id: "vet-care",
    title: "Veterinary Care",
    emoji: "🏥",
    resources: [
      {
        name: "Emancipet",
        description: "High-quality, low-cost veterinary care for everyone.",
        address: "Multiple Austin locations",
        phone: "(512) 587-7729",
        website: "https://emancipet.org",
        services: ["Vaccines", "Spay/neuter", "Wellness exams", "Dental"],
      },
      {
        name: "PAWS Shelter",
        description: "Low-cost vet services and community programs in Kyle.",
        address: "107 Victor St, Kyle",
        phone: "(512) 268-7297",
        website: "https://pawsshelter.org",
        services: ["Low-cost vet care", "TNR", "Adoptions"],
      },
      {
        name: "Texas Litter Control",
        description: "Low-cost spay/neuter clinic.",
        address: "2054 S Lamar Blvd",
        phone: "(512) 343-8531",
        website: "https://www.texaslittercontrol.org",
        services: ["Spay/neuter", "Vaccines"],
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Vets",
    emoji: "🚨",
    resources: [
      {
        name: "Austin Vet Emergency & Specialty",
        description: "24/7 emergency and specialty veterinary care.",
        address: "7300 Ranch Road 2222",
        phone: "(512) 343-2837",
        website: "https://austinvets.com",
        services: ["24/7 Emergency", "Surgery", "Specialty care"],
      },
      {
        name: "Emergency Pet Care of Texas",
        description: "24/7 emergency veterinary hospital.",
        address: "8012 Brodie Ln",
        phone: "(512) 899-0955",
        website: "https://emergencypetcare.net",
        services: ["24/7 Emergency", "Critical care"],
      },
    ],
  },
  {
    id: "pet-food",
    title: "Pet Food Assistance",
    emoji: "🍽️",
    resources: [
      {
        name: "Austin Pets Alive! Pet Food Pantry",
        description: "Free pet food for families in need.",
        address: "2807 S 1st St",
        phone: "(512) 961-6519",
        website: "https://www.austinpetsalive.org/resources/pet-food-bank",
        services: ["Free pet food", "No questions asked"],
      },
      {
        name: "Central Texas Food Bank",
        description: "Occasionally offers pet food at distributions.",
        address: "Various locations",
        phone: "(512) 282-2111",
        website: "https://www.centraltexasfoodbank.org",
        services: ["Food assistance", "Occasional pet food"],
      },
    ],
  },
  {
    id: "tnr",
    title: "TNR (Trap-Neuter-Return)",
    emoji: "✂️",
    resources: [
      {
        name: "Austin Animal Center TNR Program",
        description: "Free TNR services for community cats in Austin.",
        address: "7201 Levander Loop",
        phone: "(512) 978-0500",
        website: "https://www.austintexas.gov/tnr",
        services: ["Free TNR", "Trap loans", "Colony registration"],
      },
      {
        name: "Shadow Cats",
        description: "TNR support and colony management resources.",
        address: "Austin area",
        phone: "N/A",
        website: "https://shadowcats.net",
        services: ["TNR support", "Education", "Colony caretaker resources"],
      },
    ],
  },
  {
    id: "training",
    title: "Training & Behavior",
    emoji: "🎓",
    resources: [
      {
        name: "Austin Humane Society Training",
        description: "Positive reinforcement training classes.",
        address: "124 W Anderson Ln",
        phone: "(512) 646-7387",
        website: "https://www.austinhumanesociety.org/training",
        services: ["Puppy classes", "Basic obedience", "Behavior help"],
      },
      {
        name: "Zoom Room Dog Training",
        description: "Indoor dog training facility.",
        address: "Multiple Austin locations",
        phone: "(512) 593-2275",
        website: "https://zoomroom.com/austin",
        services: ["Agility", "Obedience", "Puppy socialization"],
      },
    ],
  },
];

export const metadata = {
  title: "Pet Resources Directory | PawsNClaws ATX",
  description: "Comprehensive directory of pet resources in Austin - shelters, vet care, emergency services, food assistance, TNR, and more.",
};

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📚</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Austin Pet Resources Directory
          </h1>
          <p className="text-gray-600">
            Your comprehensive guide to pet services and support in Austin.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-amber-100 transition-colors shadow-sm"
            >
              {cat.emoji} {cat.title}
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.id} id={category.id}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.emoji}</span>
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.resources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {resource.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {resource.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {resource.services.map((service, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>📍 {resource.address}</p>
                          {resource.phone !== "N/A" && (
                            <p>
                              📞{" "}
                              <a
                                href={`tel:${resource.phone.replace(/\D/g, "")}`}
                                className="text-amber-600 hover:underline"
                              >
                                {resource.phone}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Add Resource CTA */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-blue-900 mb-2">
            Know a Resource We Should Add?
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Help us keep this directory comprehensive and up-to-date.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Suggest a Resource
          </Link>
        </div>
      </div>
    </div>
  );
}
