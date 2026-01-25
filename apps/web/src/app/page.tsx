import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { ArrowRightIcon } from "@/components/Icons";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              {siteConfig.hero.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              {siteConfig.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={siteConfig.hero.cta.primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-amber-600 transition-all hover:scale-105"
              >
                {siteConfig.hero.cta.primary.label}
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.hero.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-md border border-gray-200 hover:bg-gray-50 transition-all"
              >
                {siteConfig.hero.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative paw prints */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-[-15deg]">
          🐾
        </div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-10 rotate-[20deg]">
          🐾
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.facts.map((fact, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors"
              >
                <div className="text-4xl font-bold text-amber-600">
                  {fact.stat}
                </div>
                <div className="mt-2 text-lg font-semibold text-gray-900">
                  {fact.label}
                </div>
                <div className="mt-1 text-sm text-gray-600">{fact.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Need Help With Your Pet?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer programs to help keep pets with their families. All services are free or low-cost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              emoji="🏠"
              title="Pet Deposit Help"
              description="0% interest loans to cover pet deposits when moving."
              href="/help/deposit-assistance"
            />
            <FeatureCard
              emoji="💕"
              title="Surrender Prevention"
              description="Explore options before giving up your pet. We can help."
              href="/help/surrender-prevention"
            />
            <FeatureCard
              emoji="🏥"
              title="Emergency Vet Fund"
              description="Financial help for unexpected vet emergencies."
              href="/help/vet-fund"
            />
            <FeatureCard
              emoji="🍲"
              title="Free Pet Food"
              description="Pet food stations around Austin. No questions asked."
              href="/food-stations"
            />
          </div>
          <div className="text-center mt-8">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700"
            >
              See all help programs
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ways to Help
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Every action makes a difference. Find the way that works for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              emoji="🤝"
              title="Volunteer"
              description="Join our team - help with food stations, transport, events, and more."
              href="/volunteer"
            />
            <FeatureCard
              emoji="🏠"
              title="Foster a Pet"
              description="Open your home temporarily. We provide all supplies and vet care."
              href="/foster"
            />
            <FeatureCard
              emoji="💰"
              title="Donate"
              description="Support our programs or donate to specific campaigns."
              href="/donate"
            />
            <FeatureCard
              emoji="🔍"
              title="Lost & Found"
              description="Report or search for lost and found pets in the Austin area."
              href="/lost-found"
            />
            <FeatureCard
              emoji="🗺️"
              title="Colony Map"
              description="View and support managed community cat colonies."
              href="/map"
            />
            <FeatureCard
              emoji="📖"
              title="Resources"
              description="Low-cost vets, TNR info, emergency contacts, and more."
              href="/resources"
            />
          </div>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">
                For Businesses
              </span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">
                Corporate Partnership Opportunities
              </h2>
              <p className="text-gray-300 mb-6">
                Partner with PawsNClaws ATX to make a meaningful impact on animal
                welfare while engaging your employees and community. We offer
                flexible partnership options for companies of all sizes.
              </p>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Matching gift programs & workplace giving
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Team volunteer events & foster programs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Colony sponsorship & naming opportunities
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Foster Friendly Workplace certification
                </li>
              </ul>
              <Link
                href="/corporate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
              >
                Explore Partnerships
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🏢</div>
                <div className="text-2xl font-bold text-amber-400">2:1</div>
                <p className="text-sm text-gray-400 mt-1">Avg employer match</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-amber-400">100%</div>
                <p className="text-sm text-gray-400 mt-1">Tax deductible</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🐱</div>
                <div className="text-2xl font-bold text-amber-400">$150</div>
                <p className="text-sm text-gray-400 mt-1">Sponsors 1 colony/mo</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💼</div>
                <div className="text-2xl font-bold text-amber-400">ESG</div>
                <p className="text-sm text-gray-400 mt-1">Impact reporting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Partners */}
      <section className="py-16 bg-white border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Community Partners
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Working together to support Austin&apos;s community cats
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://www.austintexas.gov/page/community-cats"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors text-center"
            >
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="font-bold text-gray-900">Austin Animal Center</h3>
              <p className="text-sm text-gray-600 mt-1">Official city TNR program partner</p>
            </a>
            <a
              href="https://thedailytexan.com/2015/11/25/ut-policies-control-campus-cat-colonies/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors text-center"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-bold text-gray-900">Campus Cat Coalition</h3>
              <p className="text-sm text-gray-600 mt-1">UT Austin campus colony caretakers</p>
            </a>
            <a
              href="https://austinhumanesociety.org/programs/community-cat-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors text-center"
            >
              <div className="text-3xl mb-3">💙</div>
              <h3 className="font-bold text-gray-900">Austin Humane Society</h3>
              <p className="text-sm text-gray-600 mt-1">Community cat program since 2007</p>
            </a>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Want to partner with us?{" "}
            <Link href="/contact?subject=partnership" className="text-amber-600 hover:text-amber-700">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-500">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Help Austin&apos;s Animals?
          </h2>
          <p className="mt-4 text-lg text-amber-100">
            Whether you have 5 minutes or 5 hours, there&apos;s a way to make a
            difference.
          </p>
          <Link
            href="/get-involved"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-amber-600 shadow-lg hover:bg-amber-50 transition-all"
          >
            Find Your Way to Help
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
  href,
}: {
  emoji: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all"
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 text-amber-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more
        <ArrowRightIcon className="w-4 h-4" />
      </div>
    </Link>
  );
}
