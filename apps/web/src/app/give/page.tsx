import Link from "next/link";

const givingOptions = [
  {
    emoji: "💳",
    title: "One-Time Donation",
    description: "Make an immediate impact with a single gift of any amount.",
    href: "/donate",
    cta: "Donate Now",
    highlight: false,
  },
  {
    emoji: "🔄",
    title: "Monthly Giving",
    description: "Join our Pack of monthly supporters. Predictable funding helps us plan and save more lives.",
    href: "/donate?type=monthly",
    cta: "Become Monthly Donor",
    highlight: true,
  },
  {
    emoji: "🐱",
    title: "Sponsor a Colony",
    description: "Adopt a community cat colony. Your monthly gift feeds and cares for cats in a specific location.",
    href: "/map",
    cta: "Find a Colony",
    highlight: false,
  },
  {
    emoji: "🏥",
    title: "Fund a Vet Bill",
    description: "Contribute to active emergency vet campaigns. See exactly where your money goes.",
    href: "/campaigns",
    cta: "View Campaigns",
    highlight: false,
  },
];

const alternativeGiving = [
  {
    emoji: "📈",
    title: "Donate Stock",
    description: "Donate appreciated stock and avoid capital gains tax while supporting our mission. Often the most tax-efficient way to give.",
    details: "We accept stock transfers through our fiscal sponsor. Contact us for transfer instructions.",
  },
  {
    emoji: "₿",
    title: "Cryptocurrency",
    description: "Donate Bitcoin, Ethereum, or other cryptocurrencies. Great for long-term holders looking to give tax-efficiently.",
    details: "We accept crypto donations through Every.org. All major cryptocurrencies supported.",
  },
  {
    emoji: "🏦",
    title: "Donor Advised Fund (DAF)",
    description: "Recommend a grant from your DAF. We're a registered 501(c)(3) nonprofit.",
    details: "EIN: [Pending] - Search for 'PawsNClaws ATX' in your DAF portal.",
  },
  {
    emoji: "📜",
    title: "Planned Giving / Bequests",
    description: "Include PawsNClaws ATX in your estate plans and leave a lasting legacy for Austin's animals.",
    details: "Contact us to discuss planned giving options and recognition.",
  },
  {
    emoji: "🎁",
    title: "Matching Gifts",
    description: "Many employers match charitable donations. Double or triple your impact!",
    details: "Check with your HR department or use a matching gift database to see if your company participates.",
  },
  {
    emoji: "🛒",
    title: "Amazon Smile / Wish List",
    description: "Shop and give at the same time. We have wish lists for supplies we need.",
    details: "View our Amazon Wish List for current needs: food, medical supplies, transport crates, and more.",
  },
];

const businessPrograms = [
  {
    emoji: "🪙",
    title: "Round-Up Program",
    description: "Partner businesses let customers round up purchases to donate the change.",
    href: "/partners/roundup",
  },
  {
    emoji: "🏢",
    title: "Corporate Sponsorship",
    description: "Become a corporate sponsor with logo placement and employee engagement opportunities.",
    href: "/sponsor",
  },
  {
    emoji: "🎉",
    title: "Cause Marketing",
    description: "Run a campaign where a portion of sales benefits PawsNClaws ATX.",
    href: "/sponsor",
  },
  {
    emoji: "📦",
    title: "In-Kind Donations",
    description: "Donate pet food, supplies, services, or venue space for events.",
    href: "/sponsor",
  },
];

export default function GivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">💝</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ways to Give
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every gift makes a difference. Choose the giving method that works best for you -
            from quick one-time donations to tax-smart stock transfers.
          </p>
        </div>

        {/* Main Giving Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {givingOptions.map((option, idx) => (
            <Link
              key={idx}
              href={option.href}
              className={`rounded-xl p-6 transition-all hover:shadow-lg ${
                option.highlight
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-white shadow-md hover:shadow-xl"
              }`}
            >
              <span className="text-3xl mb-3 block">{option.emoji}</span>
              <h3 className={`font-bold text-xl mb-2 ${option.highlight ? "text-white" : "text-gray-900"}`}>
                {option.title}
              </h3>
              <p className={`text-sm mb-4 ${option.highlight ? "text-amber-100" : "text-gray-600"}`}>
                {option.description}
              </p>
              <span className={`font-medium ${option.highlight ? "text-white" : "text-amber-600"}`}>
                {option.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Alternative Giving */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tax-Smart & Alternative Giving
          </h2>
          <p className="text-gray-600 mb-6">
            Maximize your impact with these giving strategies that may offer tax advantages.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {alternativeGiving.map((option, idx) => (
              <div key={idx} className="border-2 border-gray-100 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    <p className="text-xs text-gray-500">{option.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Programs */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Business & Corporate Giving
          </h2>
          <p className="text-gray-600 mb-6">
            Partner with us to engage your customers and employees while supporting Austin&apos;s animals.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessPrograms.map((program, idx) => (
              <Link
                key={idx}
                href={program.href}
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2 block">{program.emoji}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{program.title}</h3>
                <p className="text-xs text-gray-600">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-green-900 mb-3">Your Gift at Work</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-green-800">
            <div>
              <span className="font-bold text-2xl text-green-700">$25</span>
              <p>Feeds a community cat colony for a week</p>
            </div>
            <div>
              <span className="font-bold text-2xl text-green-700">$75</span>
              <p>Covers TNR surgery for one cat</p>
            </div>
            <div>
              <span className="font-bold text-2xl text-green-700">$150</span>
              <p>Provides emergency vet care assistance</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Questions about giving? We&apos;re here to help.
          </p>
          <a
            href="mailto:giving@pawsnclaws.org"
            className="inline-block px-6 py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-xl hover:bg-amber-50 transition-colors"
          >
            Contact Us About Giving
          </a>
        </div>
      </div>
    </div>
  );
}
