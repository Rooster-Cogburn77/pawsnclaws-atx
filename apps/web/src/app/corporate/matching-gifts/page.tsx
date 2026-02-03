"use client";

import { useState } from "react";
import Link from "next/link";

interface Company {
  name: string;
  matchRatio: string;
  maxMatch: string;
  platform: string;
  notes?: string;
}

// Major Austin employers with matching gift programs
// Note: This data should be verified and kept current
const companies: Company[] = [
  {
    name: "Google",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "Also matches volunteer hours at $10/hour",
  },
  {
    name: "Apple",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "2:1 match during certain campaigns",
  },
  {
    name: "Meta (Facebook)",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "Matches to most 501(c)(3) organizations",
  },
  {
    name: "Amazon",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "YourCause",
    notes: "Available to full-time and part-time employees",
  },
  {
    name: "Microsoft",
    matchRatio: "1:1",
    maxMatch: "$15,000/year",
    platform: "Benevity",
    notes: "One of the most generous programs",
  },
  {
    name: "Dell Technologies",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "YourCause",
    notes: "Matches for US employees",
  },
  {
    name: "Oracle",
    matchRatio: "1:1",
    maxMatch: "$1,000/year",
    platform: "Oracle Giving",
  },
  {
    name: "Indeed",
    matchRatio: "1:1",
    maxMatch: "$5,000/year",
    platform: "Benevity",
  },
  {
    name: "Tesla",
    matchRatio: "Varies",
    maxMatch: "Contact HR",
    platform: "Internal",
    notes: "Program details vary by location",
  },
  {
    name: "Atlassian",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "5 paid volunteer days per year",
  },
  {
    name: "Salesforce",
    matchRatio: "1:1",
    maxMatch: "$5,000/year",
    platform: "Benevity",
    notes: "56 hours paid volunteer time",
  },
  {
    name: "IBM",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
  },
  {
    name: "Cisco",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "Also matches volunteer hours",
  },
  {
    name: "PayPal",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
  },
  {
    name: "Visa",
    matchRatio: "2:1",
    maxMatch: "$10,000/year",
    platform: "Benevity",
    notes: "Double match on donations",
  },
  {
    name: "Capital One",
    matchRatio: "1:1",
    maxMatch: "$10,000/year",
    platform: "YourCause",
  },
  {
    name: "Charles Schwab",
    matchRatio: "1:1",
    maxMatch: "$1,000/year",
    platform: "Internal",
  },
  {
    name: "USAA",
    matchRatio: "1:1",
    maxMatch: "$3,000/year",
    platform: "Internal",
  },
  {
    name: "H-E-B",
    matchRatio: "1:1",
    maxMatch: "Varies",
    platform: "Internal",
    notes: "Texas-based, strong community focus",
  },
  {
    name: "National Instruments (NI)",
    matchRatio: "1:1",
    maxMatch: "$2,500/year",
    platform: "Internal",
  },
];

export default function MatchingGiftsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/corporate"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            ← Back to Corporate Partnerships
          </Link>
          <span className="block text-5xl mb-4">🎯</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Double Your Donation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Many employers match charitable donations. Check if your company will
            match your gift to PawsNClaws ATX.
          </p>
        </div>
      </section>

      {/* Search Tool */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Find Your Employer
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for your company..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedCompany(null);
                }}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Results */}
            {searchTerm && !selectedCompany && (
              <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 rounded-xl">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <button
                      key={company.name}
                      onClick={() => {
                        setSelectedCompany(company);
                        setSearchTerm(company.name);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-900">{company.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {company.matchRatio} match
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-gray-600 mb-2">Company not found in our database</p>
                    <p className="text-sm text-gray-500">
                      Your employer may still have a matching program.
                      Check with your HR department or benefits portal.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Selected Company Details */}
            {selectedCompany && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedCompany.name}
                    </h3>
                    <p className="text-green-700 font-medium">
                      ✓ Matching program available
                    </p>
                  </div>
                  <span className="text-3xl">🎉</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Match Ratio</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedCompany.matchRatio}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Maximum Match</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedCompany.maxMatch}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Platform</p>
                  <p className="font-medium text-gray-900">{selectedCompany.platform}</p>
                </div>
                {selectedCompany.notes && (
                  <p className="text-sm text-gray-600 italic">
                    Note: {selectedCompany.notes}
                  </p>
                )}
                <div className="mt-6 pt-4 border-t border-green-200">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>How to submit your match:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li>1. Make your donation to PawsNClaws ATX</li>
                    <li>2. Log into your company&apos;s giving platform ({selectedCompany.platform})</li>
                    <li>3. Search for &quot;PawsNClaws ATX&quot; or use EIN: 41-4047996</li>
                    <li>4. Submit your matching gift request</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Matching Gifts Work
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">You Donate</h3>
              <p className="text-sm text-gray-600">
                Make a donation to PawsNClaws ATX through our website
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Submit Request</h3>
              <p className="text-sm text-gray-600">
                Request a match through your company&apos;s giving portal
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">We Verify</h3>
              <p className="text-sm text-gray-600">
                We confirm your donation with the matching gift company
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Impact Doubled</h3>
              <p className="text-sm text-gray-600">
                Your employer sends a matching check to us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-900 text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">$4-7B</div>
                <p className="text-blue-200">
                  In matching gifts goes unclaimed annually in the US
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">65%</div>
                <p className="text-blue-200">
                  Of Fortune 500 companies offer matching programs
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2x</div>
                <p className="text-blue-200">
                  The impact of your donation at no extra cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Not Listed */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-2">
              Don&apos;t see your company?
            </h3>
            <p className="text-amber-800 text-sm mb-4">
              Our database includes major Austin employers, but many more companies
              have matching programs. Here&apos;s how to check:
            </p>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• Check your company&apos;s intranet or HR portal for &quot;matching gifts&quot;</li>
              <li>• Ask your HR or benefits team</li>
              <li>• Search for &quot;[your company] matching gifts&quot; online</li>
              <li>• Contact us and we&apos;ll help you research it</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Organization Info */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">
              Information for Matching Gift Submissions
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Organization Name</span>
                <span className="font-medium">PawsNClaws ATX</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Tax ID (EIN)</span>
                <span className="font-mono font-medium">41-4047996</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Tax Status</span>
                <span className="font-medium">501(c)(3) Public Charity</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Address</span>
                <span className="font-medium">Austin, TX</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Mission</span>
                <span className="font-medium">Animal Welfare</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need documentation?
                <Link href="/contact" className="text-amber-600 hover:underline ml-1">
                  Contact us
                </Link>
                {" "}for W-9, 501(c)(3) determination letter, or donation receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Double Your Impact?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/corporate"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Other Partnership Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
