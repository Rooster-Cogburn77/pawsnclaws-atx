import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "Terms of Service | PawsNClaws ATX",
  description: "Terms and conditions for using PawsNClaws ATX services and website.",
};

export default function TermsOfServicePage() {
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

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-amber max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using the PawsNClaws ATX website ({siteConfig.url}) and services,
              you agree to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About Our Organization</h2>
            <p className="text-gray-700">
              PawsNClaws ATX is a nonprofit organization (501(c)(3) status pending) dedicated to keeping pets
              and people together in Austin, Texas. Our services include volunteer coordination,
              foster programs, financial assistance for pet-related needs, lost and found pet
              services, and community resources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Services</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Financial Assistance Programs</h3>
            <p className="text-gray-700 mb-3">
              Our assistance programs (pet deposit loans, emergency vet fund, surrender prevention)
              are subject to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Available funding</li>
              <li>Eligibility requirements</li>
              <li>Review and approval by our team</li>
              <li>Specific terms for each program type</li>
            </ul>
            <p className="text-gray-700">
              Submitting an application does not guarantee approval. We reserve the right to
              approve or deny applications at our discretion based on available resources and
              program guidelines.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Pet Deposit Loans</h3>
            <p className="text-gray-700">
              Pet deposit assistance is provided as a loan. Recipients may be asked to repay
              the loan amount over time to help us assist more families. Specific repayment
              terms will be provided upon approval.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Volunteer & Foster Programs</h3>
            <p className="text-gray-700">
              Volunteers and fosters agree to follow our guidelines, attend required training,
              and maintain communication with our coordinators. We reserve the right to end
              volunteer or foster relationships if guidelines are not followed.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Lost & Found Services</h3>
            <p className="text-gray-700">
              Our lost and found board is provided as a community service. We do not verify
              the accuracy of listings and are not responsible for the outcome of pet reunifications.
              Users are responsible for exercising caution when meeting strangers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Donations</h2>
            <p className="text-gray-700 mb-3">
              All donations to PawsNClaws ATX are tax-deductible to the extent allowed by law.
              By making a donation, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Donations are voluntary and non-refundable</li>
              <li>Tax receipts will be provided for donations of $10 or more</li>
              <li>Recurring donations may be cancelled at any time</li>
              <li>Funds will be used to support our mission at our discretion</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">User Responsibilities</h2>
            <p className="text-gray-700 mb-3">When using our services, you agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide accurate and truthful information</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not misrepresent your identity or circumstances</li>
              <li>Not submit fraudulent applications</li>
              <li>Respect our volunteers, staff, and other users</li>
              <li>Not use our platform for spam or harassment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Intellectual Property</h2>
            <p className="text-gray-700">
              All content on our website, including text, graphics, logos, and images, is the
              property of PawsNClaws ATX or our content providers and is protected by copyright
              laws. You may not reproduce, distribute, or create derivative works without our
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              Our services are provided &quot;as is&quot; without warranties of any kind. We do not
              guarantee that our website will be uninterrupted, secure, or error-free. We
              make no warranties regarding the accuracy or reliability of any information
              provided through our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, PawsNClaws ATX shall not be liable for
              any indirect, incidental, special, or consequential damages arising from your
              use of our services. Our total liability shall not exceed the amount you paid
              to us, if any, in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless PawsNClaws ATX, its officers, directors,
              volunteers, and employees from any claims, damages, or expenses arising from
              your use of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms of Service at any time. Changes will
              be effective when posted on this page. Your continued use of our services after
              changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Governing Law</h2>
            <p className="text-gray-700">
              These Terms of Service shall be governed by the laws of the State of Texas,
              without regard to its conflict of law provisions. Any disputes shall be resolved
              in the courts of Travis County, Texas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-gray-800 font-medium">{siteConfig.name}</p>
              <p className="text-gray-700">Austin, TX</p>
              <p className="text-gray-700">
                Email:{" "}
                <a
                  href="mailto:info@pawsnclaws.org"
                  className="text-amber-600 hover:underline"
                >
                  info@pawsnclaws.org
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
