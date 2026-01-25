import Link from "next/link";

export const metadata = {
  title: "Volunteer Appreciation | PawsNClaws ATX",
  description: "Celebrating our amazing volunteers who make our mission possible.",
};

export default function AppreciationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🙏</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Volunteer Appreciation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our volunteers are the heart of PawsNClaws ATX. Thank you for every hour,
            every foster, every colony visit, and every act of kindness.
          </p>
        </div>

        {/* Thank You Message */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            To Our Volunteers
          </h2>
          <div className="prose prose-amber max-w-2xl mx-auto text-center">
            <p className="text-gray-700">
              Whether you foster kittens at 2am, feed a colony rain or shine,
              help at adoption events, or pitch in wherever needed - you are
              making a real difference in the lives of Austin&apos;s animals.
            </p>
            <p className="text-gray-700">
              This page will soon feature volunteer spotlights and milestones,
              with the permission of those featured. Until then, please know
              how grateful we are for everything you do.
            </p>
          </div>
        </div>

        {/* Volunteer Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Volunteer Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <span className="text-3xl mb-3 block">🎉</span>
              <h3 className="font-bold text-gray-900 mb-2">Recognition Events</h3>
              <p className="text-sm text-gray-600">
                Annual appreciation parties and milestone celebrations
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <span className="text-3xl mb-3 block">👕</span>
              <h3 className="font-bold text-gray-900 mb-2">Volunteer Gear</h3>
              <p className="text-sm text-gray-600">
                T-shirts, badges, and recognition items for active volunteers
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <span className="text-3xl mb-3 block">📜</span>
              <h3 className="font-bold text-gray-900 mb-2">Service Letters</h3>
              <p className="text-sm text-gray-600">
                Documentation of hours for school, work, or court requirements
              </p>
            </div>
          </div>
        </section>

        {/* Thank You Wall - Coming Soon */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Thank You Wall
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <span className="text-4xl mb-4 block">💬</span>
            <h3 className="font-bold text-blue-900 mb-2">Coming Soon</h3>
            <p className="text-blue-800">
              This section will feature messages of gratitude from our team
              and the families we&apos;ve helped. Check back soon!
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Want to Join Our Volunteer Family?
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for passionate people to help Austin&apos;s animals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/foster"
              className="px-8 py-3 bg-white text-amber-600 font-bold rounded-xl border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Become a Foster
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
