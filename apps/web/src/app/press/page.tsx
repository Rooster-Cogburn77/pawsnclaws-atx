import Link from "next/link";

interface PressItem {
  date: string;
  outlet: string;
  title: string;
  type: "article" | "tv" | "radio" | "podcast";
  link?: string;
}

const pressItems: PressItem[] = [
  {
    date: "January 2025",
    outlet: "Austin American-Statesman",
    title: "Local Nonprofit Helps Keep Pets in Homes During Housing Crisis",
    type: "article",
  },
  {
    date: "December 2024",
    outlet: "KXAN News",
    title: "PawsNClaws ATX Expands Vet Fund to Help More Families",
    type: "tv",
  },
  {
    date: "November 2024",
    outlet: "Austin Monthly",
    title: "10 Ways to Give Back to Austin Animals This Holiday Season",
    type: "article",
  },
  {
    date: "October 2024",
    outlet: "KUT 90.5",
    title: "The Rise of Community Cat Programs in Central Texas",
    type: "radio",
  },
  {
    date: "September 2024",
    outlet: "Austin Pets Podcast",
    title: "Interview: Building a No-Kill Community",
    type: "podcast",
  },
];

const pressKitItems = [
  { name: "Logo Pack (PNG, SVG)", icon: "🎨", size: "2.4 MB" },
  { name: "Brand Guidelines", icon: "📘", size: "1.2 MB" },
  { name: "Fact Sheet 2024", icon: "📊", size: "340 KB" },
  { name: "High-Res Photos", icon: "📸", size: "15 MB" },
  { name: "Press Release Template", icon: "📝", size: "45 KB" },
];

export const metadata = {
  title: "Press & Media | PawsNClaws ATX",
  description: "Press resources, media coverage, and contact information for journalists covering PawsNClaws ATX.",
};

export default function PressPage() {
  const typeIcons = {
    article: "📰",
    tv: "📺",
    radio: "📻",
    podcast: "🎙️",
  };

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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">501(c)(3)</div>
            <div className="text-xs text-gray-600">Tax Exempt Status</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">2020</div>
            <div className="text-xs text-gray-600">Founded</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">1,000+</div>
            <div className="text-xs text-gray-600">Animals Helped</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">100+</div>
            <div className="text-xs text-gray-600">Active Volunteers</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Coverage */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Media Coverage
              </h2>
              <div className="space-y-4">
                {pressItems.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4">
                    <div className="text-2xl">{typeIcons[item.type]}</div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{item.date} • {item.outlet}</p>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      {item.link && (
                        <a href={item.link} className="text-amber-600 text-sm hover:underline">
                          Read More →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Blurb */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                About PawsNClaws ATX
              </h2>
              <div className="text-gray-600 text-sm space-y-3">
                <p>
                  PawsNClaws ATX is a 501(c)(3) nonprofit organization dedicated to keeping
                  pets and their families together in Austin, Texas. Founded in 2020, we
                  provide innovative programs that address the root causes of pet
                  surrender and support the city&apos;s no-kill initiatives.
                </p>
                <p>
                  Our programs include pet deposit assistance for renters, emergency
                  veterinary funding, surrender prevention counseling, TNR (Trap-Neuter-Return)
                  support for community cats, and foster care coordination.
                </p>
                <p>
                  To date, we have helped over 1,000 animals stay with their families or
                  find new homes, with a focus on underserved communities and families
                  facing financial hardship.
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
                <li>• 100% of donations go directly to helping Austin&apos;s animals</li>
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
                <p className="text-gray-600">press@pawsnclaws.org</p>
                <p className="text-gray-600">(512) 555-PAWS</p>
              </div>
              <hr className="my-4" />
              <p className="text-xs text-gray-500">
                We aim to respond to all media inquiries within 24 hours.
                For urgent requests, please call.
              </p>
            </div>

            {/* Press Kit */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Press Kit</h3>
              <div className="space-y-2">
                {pressKitItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <span>{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.size}</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                ))}
              </div>
              <Link
                href="/contact"
                className="block mt-4 text-center text-sm text-amber-600 hover:underline"
              >
                Request additional materials →
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
