import Link from "next/link";

export const metadata = {
  title: "Corporate Partnerships | PawsNClaws ATX",
  description: "Partner with PawsNClaws ATX through workplace giving, matching gifts, corporate sponsorships, and volunteer programs. Make a measurable impact on Austin's animals.",
};

export default function CorporatePage() {
  const partnershipOptions = [
    {
      title: "Workplace Giving",
      description: "Enable employees to donate through payroll deduction or giving platforms like Benevity and YourCause.",
      icon: "💼",
      href: "/corporate/workplace-giving",
      highlight: "Passive recurring revenue",
    },
    {
      title: "Matching Gifts",
      description: "Double employee donations with corporate matching. We handle tracking and provide all documentation.",
      icon: "🎯",
      href: "/corporate/matching-gifts",
      highlight: "2x impact on every dollar",
    },
    {
      title: "Corporate Volunteering",
      description: "Team building that matters. Organize volunteer days at shelters, TNR events, or supply drives.",
      icon: "🤝",
      href: "/corporate/volunteer",
      highlight: "Use your VTO hours",
    },
    {
      title: "Sponsorship",
      description: "Named sponsorships with logo placement, event recognition, and quarterly impact reports.",
      icon: "⭐",
      href: "/sponsor",
      highlight: "Tax-deductible partnership",
    },
    {
      title: "Foster Friendly Workplace",
      description: "Get certified as a foster-friendly employer. Support employees who foster animals in need.",
      icon: "🏆",
      href: "/corporate/foster-friendly",
      highlight: "New program launching",
    },
    {
      title: "Round-Up Program",
      description: "Add 'Round up for pets' at your POS. Zero cost to you, customers donate spare change.",
      icon: "🛒",
      href: "/partners/roundup",
      highlight: "Zero cost to implement",
    },
  ];

  const impactAreas = [
    { label: "Foster Program", description: "Emergency foster network for at-risk animals", icon: "🏠" },
    { label: "Vet Fund", description: "Medical care for families facing financial hardship", icon: "🏥" },
    { label: "Pet Deposits", description: "Helping renters keep their pets when moving", icon: "🔑" },
    { label: "TNR Program", description: "Trap-Neuter-Return for community cats", icon: "✂️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-slate-900 text-white rounded-full text-sm font-medium mb-6">
            Corporate Partnerships
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partner With Austin&apos;s Animal Welfare Movement
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            PawsNClaws ATX works to keep pets in homes and reduce shelter intake.
            Your company can make a measurable difference through strategic partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#options"
              className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Explore Partnership Options
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600">Nonprofit</div>
                <div className="text-sm text-gray-600">501(c)(3) Pending</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">100%</div>
                <div className="text-sm text-gray-600">Volunteer Run</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">Austin</div>
                <div className="text-sm text-gray-600">Local Focus</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">Transparent</div>
                <div className="text-sm text-gray-600">Quarterly Reports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EIN Callout */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 text-white rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm mb-2">Federal Tax ID (EIN)</p>
            <p className="text-3xl font-mono font-bold tracking-wider">41-4047996</p>
            <p className="text-slate-400 text-sm mt-4">
              501(c)(3) status pending. Contact us for updates on tax-exempt status.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section id="options" className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Ways to Partner
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the partnership model that fits your company&apos;s culture and goals.
            Many partners combine multiple approaches for maximum impact.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <span className="text-4xl mb-4 block">{option.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {option.description}
                </p>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {option.highlight}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Where Funds Go */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Where Your Partnership Dollars Go
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every dollar directly supports programs that keep families together and reduce shelter burden.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area) => (
              <div key={area.label} className="bg-white rounded-xl shadow-md p-6 text-center">
                <span className="text-4xl mb-4 block">{area.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{area.label}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For CSR/HR Professionals */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  For CSR & HR Professionals
                </h2>
                <p className="text-slate-300 mb-6">
                  We make corporate partnerships easy. Get everything you need:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="text-amber-400">✓</span>
                    W-9 and 501(c)(3) determination letter
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-400">✓</span>
                    Quarterly impact reports with metrics
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-400">✓</span>
                    Logo files and co-branding guidelines
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-400">✓</span>
                    Employee engagement content
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-400">✓</span>
                    Dedicated partnership contact
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Request Partnership Info</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get our corporate partnership deck and all documentation.
                </p>
                <Link
                  href="/contact?type=corporate"
                  className="block w-full py-3 bg-amber-500 text-white text-center font-bold rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Contact Partnerships Team
                </Link>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Response within 1 business day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Is PawsNClaws ATX on Benevity / YourCause / Bright Funds?
              </h3>
              <p className="text-gray-600 text-sm">
                We are registered on major workplace giving platforms. Search for &quot;PawsNClaws ATX&quot;
                or contact us if you can&apos;t find us on your company&apos;s platform.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                What documentation do you provide for donations?
              </h3>
              <p className="text-gray-600 text-sm">
                We provide tax receipts for all donations, W-9 forms, our 501(c)(3) determination
                letter, and can customize acknowledgment letters for corporate partners.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Can we sponsor a specific program?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! Many corporate partners prefer to fund specific initiatives like our Vet Fund,
                Foster Program, or Pet Deposit Assistance. We can create a custom partnership around
                your company&apos;s priorities.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Do you support employee volunteer events?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely. We coordinate corporate volunteer days including shelter support,
                supply drives, TNR assistance, and foster orientation sessions.
                <Link href="/corporate/volunteer" className="text-amber-600 hover:underline ml-1">
                  Learn more →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-gray-600 mb-8">
            Let&apos;s discuss how your company can help Austin&apos;s animals while achieving your CSR goals.
          </p>
          <Link
            href="/contact?type=corporate"
            className="inline-block px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
