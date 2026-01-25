import Link from "next/link";

export const metadata = {
  title: "Our Impact | PawsNClaws ATX",
  description: "Learn about the impact PawsNClaws ATX is making for Austin's animals.",
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl mb-4 block">📊</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Impact
          </h1>
          <p className="text-xl text-gray-600">
            At PawsNClaws ATX, we&apos;re committed to transparency.
            This page will display real-time impact data once our programs are fully operational.
          </p>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <span className="text-4xl mb-4 block">🚧</span>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              Impact Dashboard Coming Soon
            </h2>
            <p className="text-blue-800 mb-6">
              We&apos;re building a real-time dashboard that will show verified statistics
              from our programs. Check back soon to see the difference your support makes.
            </p>
            <p className="text-sm text-blue-700">
              Want to be notified when this page is live?{" "}
              <Link href="/contact" className="underline font-medium">
                Contact us
              </Link>{" "}
              to join our mailing list.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">🏠</span>
              <h3 className="font-bold text-gray-900 mb-2">Pet Deposit Assistance</h3>
              <p className="text-gray-600 text-sm">
                We help families cover pet deposits when moving to new housing,
                preventing surrenders due to financial barriers.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">🏥</span>
              <h3 className="font-bold text-gray-900 mb-2">Emergency Vet Fund</h3>
              <p className="text-gray-600 text-sm">
                Our vet fund helps families facing unexpected veterinary emergencies
                who might otherwise have to surrender their pets.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">✂️</span>
              <h3 className="font-bold text-gray-900 mb-2">TNR Support</h3>
              <p className="text-gray-600 text-sm">
                We support Trap-Neuter-Return efforts for community cats,
                helping manage colonies humanely and effectively.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">💕</span>
              <h3 className="font-bold text-gray-900 mb-2">Surrender Prevention</h3>
              <p className="text-gray-600 text-sm">
                We connect families with resources to keep their pets at home,
                addressing the root causes of surrender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">
              Our Transparency Commitment
            </h2>
            <ul className="space-y-3 text-amber-800">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>All statistics on this site will be verified and real</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>We will publish annual financial reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>100% of donations go directly to helping animals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>We only share stories with permission from the families involved</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Help Us Make an Impact
            </h2>
            <p className="mb-6 text-amber-100">
              Your support helps Austin&apos;s animals and the families who love them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
