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
