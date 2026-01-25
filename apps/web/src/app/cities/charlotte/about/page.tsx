import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Learn about PawsNClaws CLT and our mission to help Charlotte's community cats.",
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
            Bringing community cat support to the Queen City
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              PawsNClaws CLT is dedicated to supporting Charlotte&apos;s community cats
              and the people who care for them. We believe in humane, effective
              management of community cat populations through TNR (Trap-Neuter-Return),
              colony support, and community education.
            </p>
            <p className="text-gray-700">
              We&apos;re an extension of{" "}
              <Link href="/" className="text-teal-600 hover:text-teal-700">
                PawsNClaws ATX
              </Link>
              , bringing proven programs and resources to the Charlotte area.
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
              <span className="text-3xl mb-3 block">🗺️</span>
              <h3 className="font-bold text-gray-900 mb-2">Colony Mapping</h3>
              <p className="text-gray-600 text-sm">
                We track and map community cat colonies across Charlotte and
                Mecklenburg County to coordinate care and prevent duplication.
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
              <span className="text-3xl mb-3 block">🍲</span>
              <h3 className="font-bold text-gray-900 mb-2">Colony Support</h3>
              <p className="text-gray-600 text-sm">
                We help caretakers with food, supplies, and shelters to keep
                their colonies healthy and well-fed.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-3xl mb-3 block">🏥</span>
              <h3 className="font-bold text-gray-900 mb-2">Emergency Support</h3>
              <p className="text-gray-600 text-sm">
                Our emergency vet fund helps cover unexpected medical costs for
                community cats and pets in need.
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
              Charlotte&apos;s Community Cat Challenge
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold">4,000+</div>
                <div className="text-teal-100">Cats in shelters annually</div>
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
            Help Us Help Charlotte&apos;s Cats
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
