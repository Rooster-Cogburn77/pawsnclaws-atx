import Link from "next/link";

export const metadata = {
  title: "Success Stories | PawsNClaws ATX",
  description: "Real stories of animals helped and families kept together through community support.",
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">📖</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Success Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories of animals helped and families kept together through
            community support. All stories shared with permission.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-12">
          <span className="text-5xl mb-4 block">📝</span>
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            Stories Coming Soon
          </h2>
          <p className="text-blue-800 mb-4">
            We&apos;re collecting real success stories from the families and animals
            we&apos;ve helped. All stories will be shared with explicit permission
            from those involved.
          </p>
        </div>

        {/* What Stories We&apos;ll Feature */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Stories We&apos;ll Feature
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-gray-900 mb-1">Adoption Stories</h3>
              <p className="text-sm text-gray-600">
                Pets who found their forever homes through fostering and adoption
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">💕</span>
              <h3 className="font-bold text-gray-900 mb-1">Families Kept Together</h3>
              <p className="text-sm text-gray-600">
                How our programs helped families keep their beloved pets
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">✂️</span>
              <h3 className="font-bold text-gray-900 mb-1">TNR Success</h3>
              <p className="text-sm text-gray-600">
                Community cat colonies that are now healthy and stabilized
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <span className="text-2xl mb-2 block">🤝</span>
              <h3 className="font-bold text-gray-900 mb-1">Volunteer Spotlights</h3>
              <p className="text-sm text-gray-600">
                Celebrating the people who make our work possible
              </p>
            </div>
          </div>
        </div>

        {/* Share Your Story CTA */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">💬</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Have a Story to Share?
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Did PawsNClaws ATX help you, your pet, or your community?
            We&apos;d love to hear from you. With your permission, your story
            could inspire others to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  );
}
