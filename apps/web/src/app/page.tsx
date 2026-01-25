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

      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How We Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              emoji="📍"
              title="Connect to Resources"
              description="Find low-cost vets, pet food assistance, and emergency services in Austin."
              href="/resources"
            />
            <FeatureCard
              emoji="🐱"
              title="Community Cat Care"
              description="Learn about TNR programs and how to help feral and stray cats humanely."
              href="/resources#tnr"
            />
            <FeatureCard
              emoji="🤝"
              title="Volunteer Opportunities"
              description="Links to local shelters and rescues that need your help."
              href="/get-involved"
            />
            <FeatureCard
              emoji="🏠"
              title="Foster & Adopt"
              description="Open your home to an animal in need - even temporarily."
              href="/get-involved#foster"
            />
            <FeatureCard
              emoji="💰"
              title="Donate Wisely"
              description="Direct links to trusted local rescues and shelters."
              href="/get-involved#donate"
            />
            <FeatureCard
              emoji="📞"
              title="Know Who to Call"
              description="Emergency numbers and what to do when you find a stray."
              href="/resources#emergency"
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
