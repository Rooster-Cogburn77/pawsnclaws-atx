import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "Privacy Policy | PawsNClaws ATX",
  description: "How PawsNClaws ATX collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-amber-600 hover:underline text-sm"
          >
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-amber max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction</h2>
            <p className="text-gray-700 mb-4">
              PawsNClaws ATX (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website at {siteConfig.url} or
              use our services.
            </p>
            <p className="text-gray-700">
              As a nonprofit organization (501(c)(3) status pending), we are dedicated to transparency in how
              we handle your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Personal Information</h3>
            <p className="text-gray-700 mb-3">
              We may collect personal information that you voluntarily provide when:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Submitting volunteer or foster applications</li>
              <li>Requesting assistance (deposit loans, vet fund, surrender prevention)</li>
              <li>Reporting lost or found pets</li>
              <li>Making donations</li>
              <li>Signing up for our newsletter</li>
              <li>Contacting us through forms</li>
            </ul>
            <p className="text-gray-700">
              This may include: name, email address, phone number, mailing address, and
              information about your pets or housing situation relevant to our services.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Payment Information</h3>
            <p className="text-gray-700">
              When you make a donation, your payment information is processed securely by
              Stripe. We do not store your credit card numbers on our servers.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Automatically Collected Information</h3>
            <p className="text-gray-700">
              We may automatically collect certain information when you visit our website,
              including your IP address, browser type, operating system, and pages visited.
              This information helps us improve our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Process volunteer and foster applications</li>
              <li>Provide assistance services (deposit loans, vet fund, etc.)</li>
              <li>Facilitate lost and found pet reunifications</li>
              <li>Process donations and send tax receipts</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>With service providers who assist in our operations (e.g., payment processing, email services)</li>
              <li>With your consent, such as when sharing lost pet information publicly</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your
              personal information. However, no method of transmission over the Internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Unsubscribe from marketing communications at any time</li>
              <li>Opt out of certain data processing activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies</h2>
            <p className="text-gray-700">
              Our website may use cookies and similar technologies to enhance your experience.
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under 13 years of age. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new policy on this page and updating the &quot;Last updated&quot;
              date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices,
              please contact us:
            </p>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-gray-800 font-medium">{siteConfig.name}</p>
              <p className="text-gray-700">Austin, TX</p>
              <p className="text-gray-700">
                Email:{" "}
                <a
                  href="mailto:privacy@pawsandclawsatx.com"
                  className="text-amber-600 hover:underline"
                >
                  privacy@pawsandclawsatx.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <Link href="/contact" className="text-amber-600 hover:underline">
                  Contact Form &rarr;
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
