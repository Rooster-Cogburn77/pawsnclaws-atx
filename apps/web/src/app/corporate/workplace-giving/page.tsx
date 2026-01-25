import Link from "next/link";

export const metadata = {
  title: "Workplace Giving | PawsNClaws ATX",
  description: "Support PawsNClaws ATX through your employer's workplace giving program. Find us on Benevity, YourCause, and other platforms.",
};

export default function WorkplaceGivingPage() {
  const platforms = [
    {
      name: "Benevity",
      logo: "🟦",
      description: "Used by Google, Apple, Meta, Microsoft, Atlassian, and many more tech companies.",
      searchTip: "Search for 'PawsNClaws ATX' or our EIN",
      companies: ["Google", "Apple", "Meta", "Microsoft", "Atlassian", "Salesforce", "Cisco", "PayPal"],
    },
    {
      name: "YourCause (Blackbaud)",
      logo: "🟧",
      description: "Used by Amazon, Dell, Capital One, and other major employers.",
      searchTip: "Search by organization name or EIN",
      companies: ["Amazon", "Dell", "Capital One", "FedEx", "Target"],
    },
    {
      name: "Bright Funds",
      logo: "🟩",
      description: "Used by tech companies and financial services firms.",
      searchTip: "Search our organization name",
      companies: ["Various tech startups", "Financial services"],
    },
    {
      name: "Givinga",
      logo: "🟪",
      description: "Growing platform used by many mid-size employers.",
      searchTip: "Search for 'PawsNClaws'",
      companies: ["Various employers"],
    },
    {
      name: "Network for Good",
      logo: "🟥",
      description: "Donation processing for many employer giving programs.",
      searchTip: "Search by name or EIN",
      companies: ["Various employers"],
    },
  ];

  const givingMethods = [
    {
      title: "Payroll Deduction",
      icon: "💳",
      description: "Set up automatic donations from each paycheck. Small amounts add up to big impact over time.",
      benefit: "Set it and forget it",
    },
    {
      title: "One-Time Gifts",
      icon: "🎁",
      description: "Make donations during giving campaigns, matching periods, or whenever you choose.",
      benefit: "Flexibility to give when you can",
    },
    {
      title: "Volunteer Grants",
      icon: "⏰",
      description: "Some employers donate money based on volunteer hours. Log your volunteer time with us.",
      benefit: "Your time = their money",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/corporate"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
          >
            ← Back to Corporate Partnerships
          </Link>
          <span className="block text-5xl mb-4">💼</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workplace Giving Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Donate to PawsNClaws ATX through your employer&apos;s giving platform.
            Easy, automatic, and often matched by your company.
          </p>
        </div>
      </section>

      {/* EIN Callout */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-purple-900 text-white rounded-2xl p-8 text-center">
            <p className="text-purple-300 text-sm mb-2">Search for us using our EIN</p>
            <p className="text-4xl font-mono font-bold tracking-wider mb-2">XX-XXXXXXX</p>
            <p className="text-purple-300 text-sm">
              or search &quot;PawsNClaws ATX&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Find Us On Your Platform
          </h2>
          <div className="space-y-4">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{platform.logo}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {platform.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {platform.companies.slice(0, 5).map((company) => (
                        <span
                          key={company}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-purple-600">
                      💡 {platform.searchTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Ways to Give Through Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {givingMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <span className="text-4xl mb-4 block">{method.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {method.description}
                </p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {method.benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How to Set Up Workplace Giving
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-600">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Find Your Company&apos;s Giving Portal
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check your company intranet, HR portal, or benefits site.
                    Search for &quot;charitable giving,&quot; &quot;workplace giving,&quot; or &quot;employee donations.&quot;
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Search for PawsNClaws ATX
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Use our name &quot;PawsNClaws ATX&quot; or EIN: XX-XXXXXXX.
                    We&apos;re registered on most major platforms.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Choose Your Giving Amount
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Set up a recurring donation (as little as $5/month makes a difference)
                    or make a one-time gift.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-600">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Check for Matching
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Many employers match donations. If yours does, your impact could be
                    doubled at no extra cost to you!
                    <Link href="/corporate/matching-gifts" className="text-purple-600 hover:underline ml-1">
                      Check matching programs →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Can't Find Us */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-2">
              Can&apos;t find us on your platform?
            </h3>
            <p className="text-amber-800 text-sm mb-4">
              Some platforms require nonprofits to be specifically added.
              Contact us with your company&apos;s giving platform name, and we&apos;ll
              make sure we&apos;re registered.
            </p>
            <Link
              href="/contact?subject=Workplace%20Giving%20Platform"
              className="inline-block px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Let Us Know
            </Link>
          </div>
        </div>
      </section>

      {/* For HR */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  HR & Benefits Administrators
                </h2>
                <p className="text-purple-200 mb-4">
                  Want to add PawsNClaws ATX to your company&apos;s giving program?
                  We can provide all necessary documentation.
                </p>
                <ul className="text-purple-200 text-sm space-y-2">
                  <li>✓ 501(c)(3) determination letter</li>
                  <li>✓ W-9 form</li>
                  <li>✓ Organization profile</li>
                  <li>✓ Impact reports</li>
                </ul>
              </div>
              <div className="text-center">
                <Link
                  href="/contact?type=hr"
                  className="inline-block px-6 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-100 transition-colors"
                >
                  Contact for Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Every Dollar Helps Austin&apos;s Animals
          </h2>
          <p className="text-gray-600 mb-8">
            Can&apos;t give through work? You can always donate directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Donate Directly
            </Link>
            <Link
              href="/corporate"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Other Ways to Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
