import { HeartIcon, UsersIcon, HomeIcon } from "@/components/Icons";

// Demo metrics - will come from Supabase
const metrics = {
  animals_helped: 847,
  tnr_count: 312,
  adoptions: 89,
  surrenders_prevented: 43,
  meals_provided: 15420,
  vet_bills_paid: 2847500, // in cents = $28,475
  deposits_assisted: 12,
  volunteers_active: 67,
  colonies_managed: 14,
};

const recentDonations = [
  { name: "Sarah M.", amount: 5000, message: "For the cats!", time: "2 hours ago" },
  { name: "Anonymous", amount: 10000, message: null, time: "5 hours ago" },
  { name: "Austin Pet Co.", amount: 50000, message: "Monthly sponsorship", time: "1 day ago" },
  { name: "Jake T.", amount: 2500, message: "In memory of Whiskers", time: "2 days ago" },
  { name: "Maria G.", amount: 1500, message: null, time: "3 days ago" },
];

const recentUpdates = [
  {
    title: "Luna's Surgery Success!",
    content: "Luna's leg surgery was a success! She's recovering well and will be ready for adoption in 3 weeks.",
    date: "Jan 20, 2026",
    type: "campaign",
  },
  {
    title: "New Colony Stabilized",
    content: "The East Riverside colony is now 100% TNR'd. All 18 cats are healthy and have dedicated feeders.",
    date: "Jan 15, 2026",
    type: "colony",
  },
  {
    title: "Surrender Prevented",
    content: "Thanks to our deposit assistance program, the Martinez family gets to keep their dog Max.",
    date: "Jan 12, 2026",
    type: "prevention",
  },
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Impact in Action
          </h1>
          <p className="text-xl text-gray-600">
            Every dollar you donate goes directly to helping Austin&apos;s animals.
            Here&apos;s exactly where your generosity is making a difference.
          </p>
        </div>
      </section>

      {/* Big Numbers */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              value={metrics.animals_helped}
              label="Animals Helped"
              emoji="🐾"
            />
            <StatCard
              value={metrics.tnr_count}
              label="Cats TNR'd"
              emoji="✂️"
            />
            <StatCard
              value={metrics.adoptions}
              label="Adoptions"
              emoji="🏠"
            />
            <StatCard
              value={metrics.surrenders_prevented}
              label="Surrenders Prevented"
              emoji="💕"
            />
            <StatCard
              value={metrics.colonies_managed}
              label="Colonies Managed"
              emoji="🗺️"
            />
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Where Your Money Goes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">🏥</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${(metrics.vet_bills_paid / 100).toLocaleString()}
              </div>
              <div className="text-gray-600">Emergency Vet Care</div>
              <div className="text-sm text-gray-500 mt-2">
                Surgeries, treatments, and medical care for animals in need
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">🥫</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.meals_provided.toLocaleString()}
              </div>
              <div className="text-gray-600">Meals Provided</div>
              <div className="text-sm text-gray-500 mt-2">
                Feeding community cats and pets of families in need
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">🏠</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.deposits_assisted}
              </div>
              <div className="text-gray-600">Pet Deposits Paid</div>
              <div className="text-sm text-gray-500 mt-2">
                Helping families keep their pets when moving
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column: Recent Donations + Updates */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-red-500" />
              Recent Donations
            </h2>
            <div className="bg-white rounded-xl shadow-md divide-y">
              {recentDonations.map((donation, i) => (
                <div key={i} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-900">
                        {donation.name}
                      </span>
                      <span className="text-amber-600 ml-2">
                        ${(donation.amount / 100).toFixed(0)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{donation.time}</span>
                  </div>
                  {donation.message && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      &quot;{donation.message}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
            <a
              href="/donate"
              className="block mt-4 text-center py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
            >
              Join These Donors
            </a>
          </div>

          {/* Recent Updates */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-500" />
              Recent Updates
            </h2>
            <div className="space-y-4">
              {recentUpdates.map((update, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{update.title}</h3>
                    <span className="text-xs text-gray-500">{update.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Our Sponsors
          </h2>
          <p className="text-gray-600 mb-8">
            These businesses make our work possible
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {/* Placeholder sponsor logos */}
            {["Sponsor A", "Sponsor B", "Sponsor C", "Sponsor D"].map((s) => (
              <div
                key={s}
                className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm"
              >
                {s}
              </div>
            ))}
          </div>
          <a
            href="/sponsor"
            className="inline-block mt-8 text-amber-600 hover:text-amber-700 font-medium"
          >
            Become a sponsor →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="mb-6 text-amber-100">
              Every donation, no matter the size, helps save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors"
              >
                Donate Now
              </a>
              <a
                href="/get-involved"
                className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
              >
                Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  value,
  label,
  emoji,
}: {
  value: number;
  label: string;
  emoji: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-3xl font-bold text-gray-900">
        {value.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
