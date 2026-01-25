import Link from "next/link";

const helpServices = [
  {
    emoji: "🏠",
    title: "Pet Deposit Assistance",
    description: "Can't afford a pet deposit? We offer 0% interest loans to help you keep your pet when moving.",
    href: "/help/deposit-assistance",
    cta: "Apply Now",
  },
  {
    emoji: "💕",
    title: "Surrender Prevention",
    description: "Thinking about giving up your pet? Let us help you explore options first. We're here to help, not judge.",
    href: "/help/surrender-prevention",
    cta: "Get Help",
  },
  {
    emoji: "🏥",
    title: "Emergency Vet Fund",
    description: "Facing a vet emergency you can't afford? Apply for assistance from our community vet fund.",
    href: "/help/vet-fund",
    cta: "Apply for Help",
  },
  {
    emoji: "🔍",
    title: "Lost & Found Pets",
    description: "Lost your pet or found a stray? Check our community board and report sightings.",
    href: "/lost-found",
    cta: "View Board",
  },
  {
    emoji: "🍲",
    title: "Pet Food Assistance",
    description: "Need pet food? Find free pet food stations around Austin or request delivery.",
    href: "/food-stations",
    cta: "Find Food",
  },
  {
    emoji: "🏠",
    title: "Foster a Pet",
    description: "Open your home temporarily to a pet in need. We provide all supplies and vet care.",
    href: "/foster",
    cta: "Learn More",
  },
];

const additionalResources = [
  {
    title: "Low-Cost Vet Clinics",
    description: "Emancipet, ASPCA, and other affordable vet options in Austin.",
    href: "/resources#vet-care",
  },
  {
    title: "Pet-Friendly Housing",
    description: "Resources for finding apartments and rentals that allow pets.",
    href: "/resources#housing",
  },
  {
    title: "Behavior Help",
    description: "Free and low-cost training resources for common pet issues.",
    href: "/resources#training",
  },
  {
    title: "Spay/Neuter Programs",
    description: "Low-cost and free spay/neuter services in the Austin area.",
    href: "/resources#spay-neuter",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🤝</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            How Can We Help?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer various programs to help keep pets with their families and
            support animals in need. All services are free or low-cost.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {helpServices.map((service, idx) => (
            <Link
              key={idx}
              href={service.href}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <span className="text-3xl mb-3 block">{service.emoji}</span>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <span className="text-amber-600 font-medium text-sm">
                {service.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Additional Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {additionalResources.map((resource, idx) => (
              <Link
                key={idx}
                href={resource.href}
                className="border-2 border-gray-100 rounded-lg p-4 hover:border-amber-200 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-1">
                  {resource.title}
                </h4>
                <p className="text-xs text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-red-900 mb-2">
            Emergency Situations
          </h3>
          <p className="text-sm text-red-800 mb-4">
            If you&apos;ve found an injured animal or are witnessing animal cruelty,
            contact Austin Animal Center immediately.
          </p>
          <a
            href="tel:311"
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors mr-4"
          >
            Call 311
          </a>
          <a
            href="https://www.austintexas.gov/department/report-animal-issue"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-red-600 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
          >
            Report Online
          </a>
        </div>

        {/* Volunteer CTA */}
        <div className="mt-8 bg-amber-100 rounded-xl p-6 text-center">
          <h3 className="font-bold text-amber-900 mb-2">
            Want to Help Others?
          </h3>
          <p className="text-sm text-amber-800 mb-4">
            Join our team of volunteers who make these programs possible.
          </p>
          <Link
            href="/volunteer"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </div>
  );
}
