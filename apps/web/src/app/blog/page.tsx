import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "kitten-season-survival-guide",
    title: "Kitten Season Survival Guide: What Every Foster Needs to Know",
    excerpt: "Kitten season is here! Learn the essentials of caring for neonatal kittens, from bottle feeding schedules to keeping them warm and healthy.",
    category: "Foster Care",
    author: "Dr. Sarah Martinez",
    publishedAt: "January 15, 2025",
    readTime: "8 min read",
    featured: true,
    tags: ["Kittens", "Foster", "Neonatal Care"],
  },
  {
    id: "2",
    slug: "tnr-myths-debunked",
    title: "5 Common TNR Myths Debunked",
    excerpt: "Trap-Neuter-Return is the most humane and effective way to manage community cat populations. Let's bust some common misconceptions.",
    category: "TNR",
    author: "Marcus Johnson",
    publishedAt: "January 10, 2025",
    readTime: "5 min read",
    featured: false,
    tags: ["TNR", "Community Cats", "Education"],
  },
  {
    id: "3",
    slug: "introducing-cats-dogs",
    title: "How to Successfully Introduce Cats and Dogs",
    excerpt: "Thinking of adding a cat to your dog household (or vice versa)? Follow our step-by-step guide for a peaceful introduction.",
    category: "Pet Care",
    author: "Emily Chen",
    publishedAt: "January 5, 2025",
    readTime: "6 min read",
    featured: false,
    tags: ["Multi-pet", "Training", "Behavior"],
  },
  {
    id: "4",
    slug: "winter-safety-pets",
    title: "Keeping Pets Safe in Austin's Unpredictable Winter",
    excerpt: "Texas winters can surprise us! Here's how to keep your indoor and outdoor pets safe when temperatures drop.",
    category: "Safety",
    author: "PawsNClaws Team",
    publishedAt: "December 28, 2024",
    readTime: "4 min read",
    featured: false,
    tags: ["Safety", "Winter", "Weather"],
  },
  {
    id: "5",
    slug: "senior-pet-adoption",
    title: "Why Senior Pets Make the Best Companions",
    excerpt: "Overlooked but not forgotten: senior pets offer so much love. Discover the joys of adopting an older furry friend.",
    category: "Adoption",
    author: "Amanda Collins",
    publishedAt: "December 20, 2024",
    readTime: "5 min read",
    featured: true,
    tags: ["Senior Pets", "Adoption", "Stories"],
  },
  {
    id: "6",
    slug: "low-cost-vet-resources-austin",
    title: "Complete Guide to Low-Cost Vet Care in Austin",
    excerpt: "Vet care doesn't have to break the bank. Here's every low-cost option available in the Austin area.",
    category: "Resources",
    author: "PawsNClaws Team",
    publishedAt: "December 15, 2024",
    readTime: "7 min read",
    featured: false,
    tags: ["Vet Care", "Resources", "Low-cost"],
  },
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Foster Care", count: blogPosts.filter(p => p.category === "Foster Care").length },
  { name: "TNR", count: blogPosts.filter(p => p.category === "TNR").length },
  { name: "Pet Care", count: blogPosts.filter(p => p.category === "Pet Care").length },
  { name: "Adoption", count: blogPosts.filter(p => p.category === "Adoption").length },
  { name: "Resources", count: blogPosts.filter(p => p.category === "Resources").length },
];

export const metadata = {
  title: "Blog & News | PawsNClaws ATX",
  description: "Stay updated with pet care tips, rescue stories, community news, and resources from PawsNClaws ATX.",
};

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured);
  const recentPosts = blogPosts.filter(p => !p.featured).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📰</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Blog & News
          </h1>
          <p className="text-gray-600">
            Pet care tips, rescue stories, and community updates from PawsNClaws ATX.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-amber-100 to-amber-200 h-64 md:h-auto flex items-center justify-center">
                  <span className="text-8xl opacity-30">📝</span>
                </div>
                <div className="md:w-1/2 p-8">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.publishedAt}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-block px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h3>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 h-40 md:h-auto flex items-center justify-center">
                      <span className="text-4xl opacity-30">📄</span>
                    </div>
                    <div className="md:w-2/3 p-5">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
                        {post.category}
                      </span>
                      <h4 className="font-bold text-gray-900 mb-2 hover:text-amber-600">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.publishedAt}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors text-left"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Subscribe to Updates</h3>
              <p className="text-sm text-gray-700 mb-4">
                Get the latest posts and PawsNClaws news in your inbox.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Kittens", "Foster", "TNR", "Adoption", "Senior Pets", "Training", "Vet Care", "Safety"].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
