import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Learn about PawsNClaws CLT and our mission to help Charlotte pets and people stay together.",
};

export default function CharlotteAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About PawsNClaws CLT
          </h1>
          <p className="text-xl text-gray-600">
            Helping Charlotte pets and people stay together
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              PawsNClaws CLT is dedicated to keeping pets and their families together
              in the Charlotte area. We provide emergency assistance, surrender prevention
              resources, foster programs, and community cat support through TNR coordination.
            </p>
            <p className="text-gray-700">
              We&apos;re an initiative of{" "}
              <Link href="/" className="text-teal-600 hover:text-teal-700">
                PawsNClaws ATX
              </Link>
              , an Austin-based nonprofit expanding community pet support across America.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">🏥</span>
              <h3 className="font-bold text-gray-900 mb-2">Emergency Vet Fund</h3>
              <p className="text-gray-600 text-sm">
                We help cover unexpected veterinary costs so families don&apos;t have
                to choose between their pet and their bills.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">💕</span>
              <h3 className="font-bold text-gray-900 mb-2">Surrender Prevention</h3>
              <p className="text-gray-600 text-sm">
                Before you give up your pet, talk to us. We help find solutions
                to keep families together.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">🏠</span>
              <h3 className="font-bold text-gray-900 mb-2">Pet Deposit Assistance</h3>
              <p className="text-gray-600 text-sm">
                Moving and can&apos;t afford the pet deposit? We offer 0% interest
                loans so you can keep your pet when you move.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">🐱</span>
              <h3 className="font-bold text-gray-900 mb-2">Foster Programs</h3>
              <p className="text-gray-600 text-sm">
                Temporary foster care for pets in crisis situations, giving
                families time to get back on their feet.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">✂️</span>
              <h3 className="font-bold text-gray-900 mb-2">TNR Coordination</h3>
              <p className="text-gray-600 text-sm">
                We connect caretakers with local TNR resources like the Humane
                Society of Charlotte, Stand For Animals, and other providers.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">🗺️</span>
              <h3 className="font-bold text-gray-900 mb-2">Colony Mapping</h3>
              <p className="text-gray-600 text-sm">
                We track community cat colonies across Charlotte to coordinate
                care and connect caretakers with resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Charlotte Stats */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Charlotte Pet Support
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold">4,000+</div>
                <div className="text-teal-100">Pets in shelters annually</div>
              </div>
              <div>
                <div className="text-4xl font-bold">$50</div>
                <div className="text-teal-100">TNR cost at HSC</div>
              </div>
              <div>
                <div className="text-4xl font-bold">6</div>
                <div className="text-teal-100">Counties we serve</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Help Us Help Charlotte&apos;s Pets
          </h2>
          <p className="text-gray-600 mb-8">
            Whether you can donate, volunteer, or foster - every bit helps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cities/charlotte/donate"
              className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/cities/charlotte/volunteer"
              className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
