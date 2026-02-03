"use client";

import Link from "next/link";
import { cities } from "@/config/cities";
import { CityRepresentatives } from "@/components/CityRepresentatives";

const city = cities.charlotte;

export default function CharlottePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              PawsNClaws <span className="text-teal-600">CLT</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {city.tagline}. Emergency vet assistance, surrender prevention,
              foster programs, and TNR coordination for the Queen City.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cities/charlotte/help"
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Get Help
              </Link>
              <Link
                href="/cities/charlotte/resources"
                className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors"
              >
                View Resources
              </Link>
              <Link
                href="/cities/charlotte/volunteer"
                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </div>
          <div>
            <CityRepresentatives city={city} />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            How Can We Help?
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/cities/charlotte/help/vet-fund"
              className="p-6 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition-colors"
            >
              <span className="text-3xl mb-2 block">🏥</span>
              <h3 className="font-bold text-gray-900">Emergency Vet Fund</h3>
              <p className="text-sm text-gray-600 mt-1">Help with vet bills</p>
            </Link>
            <Link
              href="/cities/charlotte/help/surrender-prevention"
              className="p-6 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition-colors"
            >
              <span className="text-3xl mb-2 block">🏠</span>
              <h3 className="font-bold text-gray-900">Keep Your Pet</h3>
              <p className="text-sm text-gray-600 mt-1">Surrender prevention</p>
            </Link>
            <Link
              href="/cities/charlotte/resources#tnr"
              className="p-6 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition-colors"
            >
              <span className="text-3xl mb-2 block">✂️</span>
              <h3 className="font-bold text-gray-900">TNR Help</h3>
              <p className="text-sm text-gray-600 mt-1">Community cats</p>
            </Link>
            <Link
              href="/cities/charlotte/foster"
              className="p-6 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition-colors"
            >
              <span className="text-3xl mb-2 block">💕</span>
              <h3 className="font-bold text-gray-900">Foster</h3>
              <p className="text-sm text-gray-600 mt-1">Open your home</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Charlotte Stats */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Charlotte&apos;s Pet Support Landscape
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-teal-600 mb-2">35+</div>
              <p className="text-gray-600">Local resources in our directory</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-teal-600 mb-2">$50</div>
              <p className="text-gray-600">TNR surgery cost at HSC</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-teal-600 mb-2">6+</div>
              <p className="text-gray-600">Counties we aim to serve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Vets */}
      <section className="bg-red-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            24/7 Emergency Vets in Charlotte
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {city.emergency.map((vet, i) => (
              <div key={i} className="bg-white rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900">{vet.name}</h4>
                <a
                  href={`tel:${vet.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-lg font-bold text-red-600 hover:text-red-700"
                >
                  {vet.phone}
                </a>
              </div>
            ))}
            <div className="bg-white rounded-lg p-4 text-center">
              <h4 className="font-bold text-gray-900">Carolina Vet Specialists</h4>
              <a
                href="tel:7045049608"
                className="text-lg font-bold text-red-600 hover:text-red-700"
              >
                (704) 504-9608
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Involved in Charlotte
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Join our growing team of volunteers, fosters, and community cat caretakers.
            Every bit of help makes a difference for Charlotte&apos;s pets.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cities/charlotte/volunteer"
              className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/cities/charlotte/foster"
              className="px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              Become a Foster
            </Link>
            <Link
              href="/cities/charlotte/donate"
              className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
