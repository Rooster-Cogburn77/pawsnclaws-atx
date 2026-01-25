import Link from "next/link";

export const metadata = {
  title: "Press & Media | PawsNClaws ATX",
  description: "Press resources and contact information for journalists covering PawsNClaws ATX.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">📰</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Press & Media
          </h1>
          <p className="text-gray-600">
            Resources for journalists and media professionals.
          </p>
        </div>

        {/* Organization Info */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">501(c)(3)</div>
            <div className="text-xs text-gray-600">Tax Exempt Status</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">Austin, TX</div>
            <div className="text-xs text-gray-600">Location</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Coverage - Coming Soon */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-8">
              <span className="text-4xl mb-4 block">📺</span>
              <h2 className="text-xl font-bold text-blue-900 mb-3">
                Media Coverage
              </h2>
              <p className="text-blue-800 mb-4">
                Media coverage will be listed here as it occurs.
                For press inquiries, please contact us using the information in the sidebar.
              </p>
            </div>

            {/* About Blurb */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                About PawsNClaws ATX
              </h2>
              <div className="text-gray-600 text-sm space-y-3">
                <p>
                  PawsNClaws ATX is a 501(c)(3) nonprofit organization dedicated to keeping
                  pets and their families together in Austin, Texas. We provide programs
                  that address the root causes of pet surrender and support the city&apos;s
                  no-kill initiatives.
                </p>
                <p>
                  Our programs include pet deposit assistance for renters, emergency
                  veterinary funding, surrender prevention counseling, TNR (Trap-Neuter-Return)
                  support for community cats, and foster care coordination.
                </p>
              </div>
            </div>

            {/* Key Messages */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-amber-900 mb-3">
                Key Messages
              </h2>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• We believe no one should have to give up their pet due to financial hardship</li>
                <li>• Prevention programs are more cost-effective than shelter care</li>
                <li>• Austin&apos;s no-kill status depends on community support programs</li>
                <li>• We work alongside existing shelters and rescues, not in competition</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Press Contact */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Press Contact</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Media Inquiries</p>
                <Link
                  href="/contact"
                  className="text-amber-600 hover:underline block"
                >
                  Contact us for press inquiries →
                </Link>
              </div>
              <hr className="my-4" />
              <p className="text-xs text-gray-500">
                We aim to respond to all media inquiries promptly.
              </p>
            </div>

            {/* Press Kit - Coming Soon */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Press Kit</h3>
              <p className="text-sm text-gray-600 mb-4">
                Press kit materials (logos, photos, fact sheets) available upon request.
              </p>
              <Link
                href="/contact"
                className="block text-center text-sm text-amber-600 hover:underline"
              >
                Request press materials →
              </Link>
            </div>

            {/* Interview Topics */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Interview Topics</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Pet-friendly housing challenges</li>
                <li>• The economics of pet ownership</li>
                <li>• Community cat management</li>
                <li>• Volunteer-driven nonprofits</li>
                <li>• Austin&apos;s no-kill journey</li>
                <li>• Foster care for animals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
