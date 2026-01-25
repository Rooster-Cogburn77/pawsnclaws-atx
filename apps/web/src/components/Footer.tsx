import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="font-semibold text-gray-900">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {siteConfig.footer.mission}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Animal Emergency?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Austin 311:</strong> Stray/injured animals
              </li>
              <li>
                <strong>Animal Poison Control:</strong>{" "}
                <a href="tel:1-888-426-4435" className="hover:text-gray-900">
                  (888) 426-4435
                </a>
              </li>
              <li>
                <Link href="/resources#emergency" className="text-amber-600 hover:text-amber-700">
                  24/7 Emergency Vets →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {siteConfig.footer.disclaimer}
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            © {new Date().getFullYear()} {siteConfig.name}. Made with ❤️ for
            Austin&apos;s animals.
          </p>
        </div>
      </div>
    </footer>
  );
}
