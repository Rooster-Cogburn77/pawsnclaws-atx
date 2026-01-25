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
            Real numbers from real work. We&apos;re committed to transparency
            and only sharing verified statistics.
          </p>
        </div>
      </section>

      {/* Founder's Story - Real Impact */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">
                How It Started
              </h2>
              <p className="text-amber-100">
                Before PawsNClaws ATX was official, one person started helping
              </p>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6">
                Our founder has been caring for community cats and rescuing strays
                for years - long before this became an organization. This personal
                commitment is the foundation of everything we do.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">15+</div>
                  <div className="text-sm text-gray-600 mt-1">Outdoor cats fed daily</div>
                  <div className="text-xs text-gray-400 mt-1">For several years</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">2</div>
                  <div className="text-sm text-gray-600 mt-1">Cat shelters placed</div>
                  <div className="text-xs text-gray-400 mt-1">For outdoor colonies</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">3+</div>
                  <div className="text-sm text-gray-600 mt-1">Stray dogs placed</div>
                  <div className="text-xs text-gray-400 mt-1">Found homes for rescues</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">2</div>
                  <div className="text-sm text-gray-600 mt-1">Personal rescues</div>
                  <div className="text-xs text-gray-400 mt-1">Buster (dog) + colony cat</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-3">The Backstory</h3>
                <p className="text-gray-600 text-sm">
                  What became PawsNClaws started with one person noticing hungry cats in
                  the neighborhood. That turned into regular feeding runs, then placing
                  shelters for harsh weather, then helping neighbors with their strays.
                  One rescue dog (Buster) and one colony cat now live indoors as part of
                  the family. The outdoor feeding continues daily. Now we&apos;re turning
                  these personal efforts into an organization that can help more animals
                  across Austin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stats - Coming Soon */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Program Impact
          </h2>
          <p className="text-center text-gray-600 mb-8">
            As our programs launch, we&apos;ll track and share real metrics here.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon="🏠"
              stat="--"
              label="Pet Deposits Funded"
              status="Launching Soon"
            />
            <StatCard
              icon="🏥"
              stat="--"
              label="Vet Fund Grants"
              status="Launching Soon"
            />
            <StatCard
              icon="✂️"
              stat="4"
              label="Colonies Mapped"
              status="Live"
            />
            <StatCard
              icon="💕"
              stat="--"
              label="Surrenders Prevented"
              status="Tracking"
            />
          </div>
        </div>
      </section>

      {/* Colony Map Stats */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Colony Map</h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold">4</div>
                <div className="text-teal-100">Colonies Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">~188</div>
                <div className="text-teal-100">Cats Documented</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">2</div>
                <div className="text-teal-100">Fully TNR&apos;d</div>
              </div>
            </div>
            <p className="text-teal-100 text-sm">
              Data from known Austin colonies including UT Campus, West Campus,
              Dessau Estates, and East Austin. Help us map more at{" "}
              <Link href="/map/submit" className="underline">
                /map/submit
              </Link>
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
              <span className="inline-block mt-3 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                Coming Soon
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">🏥</span>
              <h3 className="font-bold text-gray-900 mb-2">Emergency Vet Fund</h3>
              <p className="text-gray-600 text-sm">
                Our vet fund helps families facing unexpected veterinary emergencies
                who might otherwise have to surrender their pets.
              </p>
              <span className="inline-block mt-3 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                Coming Soon
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">✂️</span>
              <h3 className="font-bold text-gray-900 mb-2">TNR Support</h3>
              <p className="text-gray-600 text-sm">
                We support Trap-Neuter-Return efforts for community cats,
                helping manage colonies humanely and effectively.
              </p>
              <span className="inline-block mt-3 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                Active
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <span className="text-3xl mb-3 block">💕</span>
              <h3 className="font-bold text-gray-900 mb-2">Surrender Prevention</h3>
              <p className="text-gray-600 text-sm">
                We connect families with resources to keep their pets at home,
                addressing the root causes of surrender.
              </p>
              <span className="inline-block mt-3 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                Coming Soon
              </span>
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
                <span>All statistics on this site are verified and real</span>
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
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>No fake data, inflated numbers, or fabricated testimonials - ever</span>
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
              Help Us Grow Our Impact
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

function StatCard({
  icon,
  stat,
  label,
  status,
}: {
  icon: string;
  stat: string;
  label: string;
  status: string;
}) {
  const statusColors: Record<string, string> = {
    "Launching Soon": "bg-amber-100 text-amber-700",
    "Live": "bg-green-100 text-green-700",
    "Tracking": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{stat}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${statusColors[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    </div>
  );
}
