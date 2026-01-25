import Link from "next/link";

export const metadata = {
  title: "Blog & News | PawsNClaws ATX",
  description: "Pet care tips, community news, and resources from PawsNClaws ATX.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📰</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Blog & News
          </h1>
          <p className="text-gray-600">
            Pet care tips, community updates, and resources from PawsNClaws ATX.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-12">
          <span className="text-5xl mb-4 block">📝</span>
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            Blog Coming Soon
          </h2>
          <p className="text-blue-800 mb-4">
            We&apos;re working on helpful articles about pet care, local resources,
            and community updates. Check back soon!
          </p>
        </div>

        {/* What to Expect */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            What You&apos;ll Find Here
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">🐱</span>
              <h3 className="font-bold text-gray-900 mb-1">Cat Care Tips</h3>
              <p className="text-sm text-gray-600">
                From kitten care to senior cats, TNR info, and more
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">🐕</span>
              <h3 className="font-bold text-gray-900 mb-1">Dog Care Tips</h3>
              <p className="text-sm text-gray-600">
                Training, nutrition, and keeping your pup happy
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">📍</span>
              <h3 className="font-bold text-gray-900 mb-1">Local Resources</h3>
              <p className="text-sm text-gray-600">
                Low-cost vet care, pet-friendly spots, and more in Austin
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">📢</span>
              <h3 className="font-bold text-gray-900 mb-1">Community Updates</h3>
              <p className="text-sm text-gray-600">
                News about our programs, events, and impact
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">📬</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Get Updates in Your Inbox
          </h2>
          <p className="text-gray-700 mb-6">
            Subscribe to our newsletter to be notified when new content is published.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  );
}
