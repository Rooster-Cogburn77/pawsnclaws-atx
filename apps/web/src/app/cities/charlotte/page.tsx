"use client";

import Link from "next/link";
import { useState } from "react";

export default function CharlottePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: save to Supabase
    console.log("Charlotte interest:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-amber-600 hover:text-amber-700 text-sm">
            ← PawsNClaws ATX
          </Link>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
            Coming Soon
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          PawsNClaws <span className="text-teal-600">CLT</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Bringing community pet support to Charlotte, North Carolina.
          Helping pets and people stay together through emergency assistance,
          foster programs, and TNR coordination for the Queen City.
        </p>

        {/* Notify Form */}
        {!submitted ? (
          <form onSubmit={handleNotify} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Notify Me
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-4 bg-teal-50 rounded-lg">
            <p className="text-teal-700 font-medium">
              Thanks! We&apos;ll let you know when PawsNClaws CLT launches.
            </p>
          </div>
        )}
      </section>

      {/* Charlotte Stats */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Charlotte&apos;s Pet Support Needs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-teal-600 mb-2">4,000+</div>
              <p className="text-gray-600">Cats entering shelters annually</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-teal-600 mb-2">$50</div>
              <p className="text-gray-600">TNR surgery cost at HSC</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-teal-600 mb-2">6+</div>
              <p className="text-gray-600">Counties we aim to serve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Resources */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Charlotte TNR Resources
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            While we get PawsNClaws CLT ready, here are the amazing organizations
            already helping Charlotte&apos;s community cats.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Humane Society of Charlotte */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Humane Society of Charlotte
              </h3>
              <p className="text-gray-600 mb-4">
                Official TNR program partner with the city. $50 TNR surgeries,
                trap rentals, and dedicated Community Cat Coordinator.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>📍 1348 Parker Dr., Charlotte, NC 28208</p>
                <p>📞 (704) 377-0534</p>
                <p>💉 Spay/Neuter Clinic: (704) 333-4130</p>
              </div>
              <a
                href="https://humanesocietyofcharlotte.org/health-wellness/trap-neuter-return/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Visit Website →
              </a>
            </div>

            {/* Stand For Animals */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Stand For Animals
              </h3>
              <p className="text-gray-600 mb-4">
                Low-cost TNR services with free trap loans.
                Email to schedule surgery appointments.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>📍 224 W. 32nd Street, Charlotte, NC 28206</p>
                <p>📞 (704) 970-2711</p>
                <p>📧 tnr@standforanimals.org</p>
              </div>
              <a
                href="https://standforanimals.org/services-and-products/spay-neuter/community-cats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Visit Website →
              </a>
            </div>

            {/* Friends of Feral Felines */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Friends of Feral Felines
              </h3>
              <p className="text-gray-600 mb-4">
                All-volunteer 501(c)(3) providing education and guidance for TNVR
                across Mecklenburg and surrounding counties.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>📞 (704) 348-1578</p>
                <p>📧 info@friendsofferalfelines.org</p>
                <p>🗺️ Serves 8 counties in NC/SC</p>
              </div>
              <a
                href="https://www.friendsofferalfelines.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Visit Website →
              </a>
            </div>

            {/* Windsor Kittens */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Windsor Kittens
              </h3>
              <p className="text-gray-600 mb-4">
                TNR-focused rescue serving underserved East Charlotte neighborhoods.
                Surgery costs can be fully subsidized.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>🏠 Foster-based rescue</p>
                <p>📍 East Charlotte focus</p>
                <p>🐱 138 cats adopted in 2024</p>
              </div>
              <a
                href="https://www.windsorkittens.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Visit Website →
              </a>
            </div>
          </div>

          {/* Emergency Vets */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              24/7 Emergency Vets in Charlotte
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900">CARE Charlotte</h4>
                <p className="text-sm text-gray-600">24/7 Emergency + Specialists</p>
                <p className="text-red-600 font-medium">(704) 457-2300</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900">VEG Charlotte</h4>
                <p className="text-sm text-gray-600">24/7 Walk-ins Welcome</p>
                <p className="text-red-600 font-medium">(980) 880-6062</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900">Carolina Vet Specialists</h4>
                <p className="text-sm text-gray-600">24/7 Emergency</p>
                <p className="text-red-600 font-medium">(704) 504-9608</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Help Us Launch in Charlotte
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            We&apos;re looking for local volunteers, caretakers, and partners to help
            bring PawsNClaws to Charlotte. Already caring for a colony? We want to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer?city=charlotte"
              className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              Volunteer Interest Form
            </Link>
            <Link
              href="/contact?subject=charlotte-partnership"
              className="px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              Partnership Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            PawsNClaws CLT is an initiative of{" "}
            <Link href="/" className="text-amber-400 hover:text-amber-300">
              PawsNClaws ATX
            </Link>
            , an Austin-based 501(c)(3) nonprofit.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Expanding community pet support across America.
          </p>
        </div>
      </footer>
    </div>
  );
}
