import Link from "next/link";

// Sample volunteer stats - would come from Supabase
const volunteerSpotlights = [
  {
    name: "Amanda C.",
    role: "Foster Coordinator",
    since: "2023",
    impact: "50+ kittens fostered",
    quote: "Every kitten I foster is one more life saved. It's exhausting but so rewarding.",
    emoji: "🏠",
  },
  {
    name: "Marcus T.",
    role: "Colony Caretaker",
    since: "2022",
    impact: "3 colonies managed",
    quote: "These cats rely on us. Seeing them healthy and thriving makes every early morning worth it.",
    emoji: "🐱",
  },
  {
    name: "Dr. Sarah K.",
    role: "TNR Volunteer Vet",
    since: "2024",
    impact: "100+ surgeries",
    quote: "TNR is the most humane way to manage community cat populations. I'm proud to help.",
    emoji: "🏥",
  },
];

const milestones = [
  { name: "1 Year", icon: "⭐", count: 24 },
  { name: "2 Years", icon: "🌟", count: 12 },
  { name: "5 Years", icon: "💫", count: 4 },
  { name: "100 Hours", icon: "🎯", count: 18 },
  { name: "500 Hours", icon: "🏆", count: 6 },
  { name: "1000 Hours", icon: "👑", count: 2 },
];

const impactStats = [
  { label: "Active Volunteers", value: "127", icon: "🤝" },
  { label: "Hours This Month", value: "842", icon: "⏰" },
  { label: "Fosters Placed", value: "45", icon: "🏠" },
  { label: "Colonies Managed", value: "12", icon: "🐱" },
];

export const metadata = {
  title: "Volunteer Appreciation | PawsNClaws ATX",
  description: "Celebrating our amazing volunteers who make our mission possible. Meet our volunteer spotlights and milestones.",
};

export default function AppreciationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🙏</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Volunteer Appreciation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our volunteers are the heart of PawsNClaws ATX. Thank you for every hour,
            every foster, every colony visit, and every act of kindness.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-5 text-center">
              <span className="text-3xl block mb-2">{stat.icon}</span>
              <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Volunteer Spotlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Volunteer Spotlights
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {volunteerSpotlights.map((volunteer, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-center">
                  <span className="text-5xl">{volunteer.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg">{volunteer.name}</h3>
                  <p className="text-amber-600 text-sm font-medium">{volunteer.role}</p>
                  <p className="text-gray-500 text-xs mb-3">Volunteer since {volunteer.since}</p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-amber-800 font-medium">{volunteer.impact}</p>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    &quot;{volunteer.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Milestone Achievements
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-3xl block mb-2">{milestone.icon}</span>
                  <div className="text-2xl font-bold text-gray-900">{milestone.count}</div>
                  <div className="text-xs text-gray-600">{milestone.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Thank You Wall */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Thank You Wall
          </h2>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 rounded-lg p-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;To our colony caretakers who brave the heat and cold - the cats
                  know and appreciate you even if they can&apos;t say it!&quot;
                </p>
                <p className="text-sm text-amber-600 font-medium">— The PawsNClaws Team</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Our fosters are literally saving lives. Every bottle baby fed,
                  every scared cat socialized - you are heroes.&quot;
                </p>
                <p className="text-sm text-amber-600 font-medium">— Foster Coordinator</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Thank you to everyone who showed up for our TNR blitz weekend.
                  28 cats fixed means hundreds prevented!&quot;
                </p>
                <p className="text-sm text-amber-600 font-medium">— TNR Team Lead</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Our admin volunteers keep everything running behind the scenes.
                  You make our work possible!&quot;
                </p>
                <p className="text-sm text-amber-600 font-medium">— Operations</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Want to Join Our Volunteer Family?
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for passionate people to help Austin&apos;s animals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/foster"
              className="px-8 py-3 bg-white text-amber-600 font-bold rounded-xl border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Become a Foster
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
