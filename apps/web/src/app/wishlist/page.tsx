import Link from "next/link";

const wishlistCategories = [
  {
    title: "Cat Supplies",
    emoji: "🐱",
    items: [
      { name: "Kitten Formula (KMR)", priority: "high", note: "Always needed for bottle babies" },
      { name: "Wet Cat Food (pâté style)", priority: "high", note: "Fancy Feast, Friskies pâté" },
      { name: "Dry Cat Food", priority: "medium", note: "Any brand" },
      { name: "Cat Litter (non-clumping for kittens)", priority: "high", note: "" },
      { name: "Cat Litter (clumping)", priority: "medium", note: "" },
      { name: "Litter Boxes", priority: "low", note: "New or gently used" },
      { name: "Cat Carriers", priority: "medium", note: "Hard-sided preferred" },
      { name: "Heating Pads (for kittens)", priority: "high", note: "Snuggle Safe or similar" },
      { name: "Fleece Blankets", priority: "low", note: "New or gently used" },
    ],
  },
  {
    title: "Dog Supplies",
    emoji: "🐕",
    items: [
      { name: "Dry Dog Food", priority: "high", note: "Any brand" },
      { name: "Wet Dog Food", priority: "medium", note: "" },
      { name: "Dog Crates (various sizes)", priority: "medium", note: "" },
      { name: "Leashes", priority: "low", note: "Standard 6ft" },
      { name: "Collars (adjustable)", priority: "low", note: "" },
      { name: "Dog Beds", priority: "low", note: "New or gently used" },
    ],
  },
  {
    title: "Medical & Cleaning",
    emoji: "🏥",
    items: [
      { name: "Paper Towels", priority: "high", note: "Always needed!" },
      { name: "Bleach", priority: "medium", note: "For sanitization" },
      { name: "Dish Soap (Dawn)", priority: "medium", note: "For flea baths" },
      { name: "Garbage Bags", priority: "medium", note: "" },
      { name: "Latex Gloves", priority: "low", note: "" },
      { name: "Hand Sanitizer", priority: "low", note: "" },
      { name: "Newspapers", priority: "low", note: "For litter training" },
    ],
  },
  {
    title: "Colony Care",
    emoji: "🏘️",
    items: [
      { name: "Outdoor Cat Shelters", priority: "high", note: "Insulated for winter" },
      { name: "Straw (not hay)", priority: "high", note: "For shelter insulation" },
      { name: "Large Plastic Storage Bins", priority: "medium", note: "For DIY shelters" },
      { name: "Dry Cat Food (bulk)", priority: "high", note: "For feeding stations" },
      { name: "Water Bowls (heavy/tip-proof)", priority: "low", note: "" },
    ],
  },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

export const metadata = {
  title: "Supply Wishlist | PawsNClaws ATX",
  description: "See what supplies we need most to help Austin's animals. Donate items or purchase from our Amazon wishlist.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🎁</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Supply Wishlist
          </h1>
          <p className="text-gray-600 mb-6">
            These supplies help us care for animals in our foster network and community colonies.
            Every donation makes a difference!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.amazon.com/hz/wishlist/ls/EXAMPLE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Shop Amazon Wishlist
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Arrange Drop-off
            </Link>
          </div>
        </div>

        {/* Priority Legend */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-600">Urgent Need</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-sm text-gray-600">Needed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">Welcome</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {wishlistCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-amber-100 to-amber-50 px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.title}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`p-3 rounded-lg border ${priorityColors[item.priority]}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs uppercase font-bold opacity-75">
                          {item.priority}
                        </span>
                      </div>
                      {item.note && (
                        <p className="text-xs mt-1 opacity-75">{item.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drop-off Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">Drop-off Locations</h3>
          <p className="text-sm text-blue-800 mb-4">
            We accept donations at the following locations. Please contact us first for large donations.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-gray-900">Partner Vet Clinic</p>
              <p className="text-gray-600">123 Main Street, Austin</p>
              <p className="text-gray-500">Mon-Fri 9am-5pm</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-gray-900">Community Center</p>
              <p className="text-gray-600">456 Oak Avenue, Austin</p>
              <p className="text-gray-500">Sat 10am-2pm</p>
            </div>
          </div>
        </div>

        {/* Monetary Donations CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Prefer to donate money? We can purchase supplies in bulk at lower prices.
          </p>
          <Link
            href="/donate"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            Make a Financial Donation
          </Link>
        </div>
      </div>
    </div>
  );
}
