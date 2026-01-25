import Link from "next/link";

export const metadata = {
  title: "Success Stories | PawsNClaws ATX",
  description: "Real adoption success stories from PawsNClaws ATX. Coming soon!",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Success Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every adoption creates a forever home. This page will feature
            real stories from families who have adopted or fostered with us.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-12">
          <span className="text-4xl mb-4 block">📸</span>
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            Stories Coming Soon
          </h2>
          <p className="text-blue-800 mb-4">
            We&apos;re collecting real success stories from our adopters and fosters.
            All stories will be shared with explicit permission from the families involved.
          </p>
        </div>

        {/* Share Your Story CTA */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">🐾</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share Your Story!
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Adopted or fostered through PawsNClaws ATX? We&apos;d love to hear about
            your experience and share your story (with your permission).
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Write Your Own Success Story?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/foster"
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Become a Foster
            </Link>
            <Link
              href="/quiz"
              className="px-6 py-3 bg-white text-amber-600 font-bold rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Take the Pet Match Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
