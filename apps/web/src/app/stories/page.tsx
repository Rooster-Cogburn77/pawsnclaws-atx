import Link from "next/link";

// Sample success stories - will be dynamic from CMS/Supabase
const stories = [
  {
    id: "1",
    title: "Luna's Journey: From Street Cat to Spoiled Princess",
    excerpt: "Luna was found living under a dumpster, scared and malnourished. Six months later, she's ruling her forever home.",
    category: "adoption",
    image: null,
    date: "2025-01-15",
    readTime: "3 min",
  },
  {
    id: "2",
    title: "How a Deposit Loan Saved Max's Family",
    excerpt: "When Sarah faced eviction, she thought she'd have to give up her dog Max. Our deposit assistance program changed everything.",
    category: "deposit-assistance",
    image: null,
    date: "2025-01-10",
    readTime: "4 min",
  },
  {
    id: "3",
    title: "The North Loop Colony: 2 Years of TNR Success",
    excerpt: "From 40+ cats to a stable, healthy colony of 12. Here's how community caretakers made it happen.",
    category: "tnr",
    image: null,
    date: "2024-12-28",
    readTime: "5 min",
  },
  {
    id: "4",
    title: "Meet the Volunteer Who's Fostered 50 Kittens",
    excerpt: "Amanda started fostering 'just one litter' three years ago. She hasn't stopped since.",
    category: "volunteer",
    image: null,
    date: "2024-12-15",
    readTime: "4 min",
  },
  {
    id: "5",
    title: "Emergency Fund Saves Whiskers After Car Accident",
    excerpt: "When Whiskers was hit by a car, his family couldn't afford the $2,000 surgery. The community stepped up.",
    category: "vet-fund",
    image: null,
    date: "2024-12-01",
    readTime: "3 min",
  },
];

const categories = [
  { id: "all", label: "All Stories" },
  { id: "adoption", label: "Adoptions" },
  { id: "tnr", label: "TNR Success" },
  { id: "volunteer", label: "Volunteer Spotlights" },
  { id: "vet-fund", label: "Vet Fund" },
  { id: "deposit-assistance", label: "Housing Help" },
];

const categoryColors: Record<string, string> = {
  adoption: "bg-pink-100 text-pink-700",
  tnr: "bg-green-100 text-green-700",
  volunteer: "bg-blue-100 text-blue-700",
  "vet-fund": "bg-red-100 text-red-700",
  "deposit-assistance": "bg-purple-100 text-purple-700",
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📖</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Success Stories
          </h1>
          <p className="text-gray-600">
            Real stories of animals helped and families kept together through
            community support.
          </p>
        </div>

        {/* Featured Story */}
        {stories[0] && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-48 flex items-center justify-center">
              <span className="text-8xl opacity-50">🐱</span>
            </div>
            <div className="p-6">
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  categoryColors[stories[0].category]
                }`}
              >
                {stories[0].category.replace("-", " ")}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                {stories[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{stories[0].excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(stories[0].date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {stories[0].readTime} read
                </span>
                <button className="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors">
                  Read Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-amber-100 transition-colors border border-gray-200"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {stories.slice(1).map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gray-100 h-32 flex items-center justify-center">
                <span className="text-5xl opacity-30">
                  {story.category === "adoption"
                    ? "🏠"
                    : story.category === "tnr"
                    ? "✂️"
                    : story.category === "volunteer"
                    ? "🤝"
                    : story.category === "vet-fund"
                    ? "🏥"
                    : "💰"}
                </span>
              </div>
              <div className="p-5">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    categoryColors[story.category]
                  }`}
                >
                  {story.category.replace("-", " ")}
                </span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {story.readTime} read
                  </span>
                  <button className="text-amber-600 text-sm font-medium hover:underline">
                    Read more &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Story CTA */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-green-900 mb-2">
            Have a Story to Share?
          </h3>
          <p className="text-sm text-green-800 mb-4">
            Did we help you or your pet? We&apos;d love to feature your story and
            inspire others.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  );
}
