import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PawsNClaws CLT - Charlotte Community Cat Support",
    template: "%s | PawsNClaws CLT",
  },
  description: "Supporting Charlotte's community cats through TNR, foster programs, and colony care.",
};

export default function CharlotteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Charlotte Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/cities/charlotte" className="flex items-center gap-2">
              <span className="text-2xl">🐱</span>
              <span className="font-bold text-gray-900">
                PawsNClaws <span className="text-teal-600">CLT</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/cities/charlotte/map"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Map
              </Link>
              <Link
                href="/cities/charlotte/resources"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/cities/charlotte/volunteer"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Volunteer
              </Link>
              <Link
                href="/cities/charlotte/foster"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Foster
              </Link>
              <Link
                href="/cities/charlotte/help"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Get Help
              </Link>
              <Link
                href="/cities/charlotte/donate"
                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Donate
              </Link>
            </nav>

            {/* Mobile menu button - simplified for now */}
            <Link
              href="/cities/charlotte/donate"
              className="md:hidden px-4 py-2 bg-teal-600 text-white font-medium rounded-lg"
            >
              Donate
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Charlotte Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PawsNClaws CLT</h3>
              <p className="text-gray-400 text-sm">
                Supporting Charlotte&apos;s community cats through TNR, colony care,
                and community support.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                A chapter of{" "}
                <Link href="/" className="text-teal-400 hover:text-teal-300">
                  PawsNClaws ATX
                </Link>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/cities/charlotte/map" className="hover:text-white">
                    Colony Map
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/foster" className="hover:text-white">
                    Foster Program
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/help/vet-fund" className="hover:text-white">
                    Emergency Vet Fund
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/resources" className="hover:text-white">
                    Local Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/cities/charlotte/volunteer" className="hover:text-white">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/donate" className="hover:text-white">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/map/submit" className="hover:text-white">
                    Report a Colony
                  </Link>
                </li>
                <li>
                  <Link href="/cities/charlotte/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-400">
                  <p className="font-medium text-white">CARE Charlotte</p>
                  <p>(704) 457-2300</p>
                </div>
                <div className="text-gray-400">
                  <p className="font-medium text-white">VEG Charlotte</p>
                  <p>(980) 880-6062</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PawsNClaws. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
