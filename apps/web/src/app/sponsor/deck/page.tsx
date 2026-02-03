"use client";

import Link from "next/link";

// Note: metadata would go in layout.tsx for client components

export default function SponsorDeckPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Print-friendly styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
      `}</style>

      {/* Header */}
      <div className="no-print px-4 py-4 bg-gray-100 border-b">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/corporate" className="text-gray-600 hover:text-gray-900">
            ← Back to Corporate
          </Link>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Cover */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🐾</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PawsNClaws ATX
          </h1>
          <p className="text-2xl text-slate-300 mb-8">
            Corporate Partnership Opportunities
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full">
            <span className="text-slate-300">501(c)(3) Nonprofit</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Austin, Texas</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            PawsNClaws ATX keeps pets and families together. We address the root causes
            of pet surrender through financial assistance, community resources, and
            foster care coordination—supporting Austin&apos;s no-kill mission.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="text-3xl mb-2">🏠</div>
              <div className="font-bold text-gray-900">Foster Care</div>
              <p className="text-sm text-gray-600">Emergency & long-term placement</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="text-3xl mb-2">🏥</div>
              <div className="font-bold text-gray-900">Vet Fund</div>
              <p className="text-sm text-gray-600">Medical care assistance</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="text-3xl mb-2">🔑</div>
              <div className="font-bold text-gray-900">Pet Deposits</div>
              <p className="text-sm text-gray-600">Housing barrier removal</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="text-3xl mb-2">✂️</div>
              <div className="font-bold text-gray-900">TNR</div>
              <p className="text-sm text-gray-600">Community cat management</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-4 py-16 bg-gray-50 page-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-6">
                Austin&apos;s shelters face unprecedented pressure. Rising costs of living,
                housing restrictions, and economic uncertainty force families to make
                impossible choices about their pets.
              </p>
              <p className="text-gray-700">
                <strong>The result:</strong> Overcrowded shelters, stressed staff, and
                animals at risk. Prevention programs are more cost-effective and humane
                than shelter intake.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="text-2xl font-bold text-red-700">70%</div>
                <p className="text-sm text-red-600">of surrenders are due to preventable reasons</p>
              </div>
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="text-2xl font-bold text-red-700">$500+</div>
                <p className="text-sm text-red-600">average cost to shelter one animal</p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <div className="text-2xl font-bold text-green-700">$50-200</div>
                <p className="text-sm text-green-600">average cost of prevention intervention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="px-4 py-16 page-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sponsorship Tiers</h2>
          <div className="space-y-6">
            {/* Platinum */}
            <div className="border-2 border-purple-300 rounded-xl overflow-hidden">
              <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="text-sm uppercase tracking-wider">Platinum Partner</span>
                  <div className="text-2xl font-bold">$2,500/month</div>
                </div>
                <span className="text-4xl">💎</span>
              </div>
              <div className="p-6 bg-white">
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Logo on homepage hero</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Named program sponsor</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Quarterly impact reports</li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Social media features (monthly)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Event naming rights</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Executive meet & greet</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gold */}
            <div className="border-2 border-yellow-300 rounded-xl overflow-hidden">
              <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="text-sm uppercase tracking-wider">Gold Partner</span>
                  <div className="text-2xl font-bold">$1,000/month</div>
                </div>
                <span className="text-4xl">🥇</span>
              </div>
              <div className="p-6 bg-white">
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> Logo on sponsor page</li>
                    <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> Quarterly impact reports</li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> Social media features (quarterly)</li>
                    <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> Event recognition</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Silver */}
            <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
              <div className="bg-gray-500 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="text-sm uppercase tracking-wider">Silver Partner</span>
                  <div className="text-2xl font-bold">$500/month</div>
                </div>
                <span className="text-4xl">🥈</span>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><span className="text-gray-500">✓</span> Logo on sponsor page</li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">✓</span> Annual impact report</li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">✓</span> Newsletter mention</li>
                </ul>
              </div>
            </div>

            {/* Bronze */}
            <div className="border-2 border-amber-300 rounded-xl overflow-hidden">
              <div className="bg-amber-600 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="text-sm uppercase tracking-wider">Bronze Partner</span>
                  <div className="text-2xl font-bold">$250/month</div>
                </div>
                <span className="text-4xl">🥉</span>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Logo on sponsor page</li>
                  <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Tax receipt and documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Partnerships */}
      <section className="px-4 py-16 bg-gray-50 page-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Partnership Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">🛒 Round-Up Program</h3>
              <p className="text-gray-600 text-sm mb-3">
                Add &quot;Round up for pets&quot; at your POS. Customers donate spare change.
              </p>
              <p className="text-amber-600 font-medium text-sm">Zero cost to implement</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">🎯 Matching Gifts</h3>
              <p className="text-gray-600 text-sm mb-3">
                Match employee donations. We provide all tracking and reporting.
              </p>
              <p className="text-amber-600 font-medium text-sm">Double the impact</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">🤝 Volunteer Days</h3>
              <p className="text-gray-600 text-sm mb-3">
                Team building at shelters, TNR events, or supply drives.
              </p>
              <p className="text-amber-600 font-medium text-sm">Use company VTO hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">🏆 Foster Friendly Certification</h3>
              <p className="text-gray-600 text-sm mb-3">
                Get certified as a workplace that supports employee fosters.
              </p>
              <p className="text-amber-600 font-medium text-sm">Free certification program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="px-4 py-16 page-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Partner With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Transparent Impact</h3>
              <p className="text-gray-600 text-sm">
                Know exactly where your dollars go. We provide detailed reports
                showing animals helped, programs funded, and outcomes achieved.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Local Visibility</h3>
              <p className="text-gray-600 text-sm">
                Austin loves supporting businesses that give back. Your partnership
                builds brand affinity with the local community.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">Employee Engagement</h3>
              <p className="text-gray-600 text-sm">
                Pet-related causes rank among the most popular for employee giving.
                Boost morale with a cause your team cares about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Talk</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Ready to explore a partnership? We&apos;d love to learn about your company
            and discuss how we can work together.
          </p>
          <div className="inline-block bg-white text-gray-900 rounded-xl p-8">
            <p className="font-bold text-lg mb-2">PawsNClaws ATX</p>
            <p className="text-gray-600 mb-1">partnerships@pawsnclaws.org</p>
            <p className="text-gray-600 mb-4">Austin, Texas</p>
            <p className="text-sm text-gray-500">
              EIN: 41-4047996 (501(c)(3) status pending)
            </p>
          </div>
        </div>
      </section>

      {/* Footer - no print */}
      <div className="no-print px-4 py-8 bg-gray-100 text-center">
        <Link
          href="/contact?type=corporate"
          className="inline-block px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
        >
          Contact Us to Get Started
        </Link>
      </div>
    </div>
  );
}
