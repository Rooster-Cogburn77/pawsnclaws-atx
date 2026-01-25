import Link from "next/link";

export const metadata = {
  title: "Get Help",
  description: "Programs to help Charlotte pet owners and community cat caretakers.",
};

export default function CharlotteHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🆘</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Need Help?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer programs to help Charlotte pet owners and community cat
            caretakers. All services are free or low-cost.
          </p>
        </div>

        {/* Programs */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/cities/charlotte/help/vet-fund"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-teal-500"
          >
            <span className="text-3xl mb-3 block">🏥</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Emergency Vet Fund
            </h2>
            <p className="text-gray-600">
              Financial assistance for unexpected veterinary emergencies.
              We help cover costs so you don&apos;t have to choose between
              your pet and your bills.
            </p>
            <span className="inline-block mt-4 text-teal-600 font-medium">
              Apply Now →
            </span>
          </Link>

          <Link
            href="/cities/charlotte/help/surrender-prevention"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-amber-500"
          >
            <span className="text-3xl mb-3 block">💕</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Surrender Prevention
            </h2>
            <p className="text-gray-600">
              Thinking about giving up your pet? Let&apos;s talk first.
              We can often help with the underlying issue so your pet
              can stay home.
            </p>
            <span className="inline-block mt-4 text-amber-600 font-medium">
              Get Help →
            </span>
          </Link>

          <Link
            href="/cities/charlotte/help/deposit-assistance"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
          >
            <span className="text-3xl mb-3 block">🏠</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Pet Deposit Assistance
            </h2>
            <p className="text-gray-600">
              Moving and facing a large pet deposit? We offer 0% interest
              loans to help you keep your pet when relocating.
            </p>
            <span className="inline-block mt-4 text-blue-600 font-medium">
              Learn More →
            </span>
          </Link>

          <Link
            href="/cities/charlotte/resources"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500"
          >
            <span className="text-3xl mb-3 block">📋</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Local Resources
            </h2>
            <p className="text-gray-600">
              Directory of Charlotte-area TNR programs, low-cost vets,
              pet food assistance, and emergency services.
            </p>
            <span className="inline-block mt-4 text-green-600 font-medium">
              View Resources →
            </span>
          </Link>
        </div>

        {/* Community Cats */}
        <div className="bg-teal-50 rounded-xl p-8 mb-12">
          <h2 className="text-xl font-bold text-teal-900 mb-4">
            Community Cat Caretakers
          </h2>
          <p className="text-teal-800 mb-6">
            Feeding a colony? We can help with TNR coordination, food supplies,
            shelters, and emergency vet care for your community cats.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/cities/charlotte/map/submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Register Your Colony
            </Link>
            <Link
              href="/cities/charlotte/resources"
              className="px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Find TNR Help
            </Link>
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
          <h2 className="text-xl font-bold text-red-800 mb-4">
            Animal Emergency?
          </h2>
          <p className="text-red-700 mb-4">
            If an animal is injured or in immediate danger, contact:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-red-800">CARE Charlotte (24/7)</p>
              <a href="tel:704-457-2300" className="text-red-600 text-lg font-medium">
                (704) 457-2300
              </a>
            </div>
            <div>
              <p className="font-bold text-red-800">Animal Control</p>
              <a href="tel:311" className="text-red-600 text-lg font-medium">
                311
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
