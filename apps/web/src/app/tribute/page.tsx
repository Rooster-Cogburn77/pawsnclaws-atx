"use client";

import { useState } from "react";
import Link from "next/link";

export default function TributePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    petType: "cat",
    message: "",
    donorName: "",
    isAnonymous: false,
    amount: "25",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🕯️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Memorial & Tribute Gifts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Honor a beloved pet or celebrate a special person with a donation that helps
            animals in need.
          </p>
        </div>

        {/* Donation Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Memorial */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <span className="text-4xl">🌈</span>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                In Memory Of
              </h2>
              <p className="text-gray-600 text-sm">
                Honor a beloved pet or person who has passed
              </p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                Personalized acknowledgment sent to you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                Optional notification to the family
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                100% goes to helping animals
              </li>
            </ul>
            <Link
              href="/donate?type=memorial"
              className="block w-full py-3 bg-gray-800 text-white text-center font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Make a Memorial Gift
            </Link>
          </div>

          {/* Honor */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <span className="text-4xl">🎉</span>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                In Honor Of
              </h2>
              <p className="text-gray-600 text-sm">
                Celebrate a birthday, holiday, or special occasion
              </p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                Perfect for pet lovers who have everything
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                Beautiful e-card sent to the honoree
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                100% goes to helping animals
              </li>
            </ul>
            <Link
              href="/donate?type=honor"
              className="block w-full py-3 bg-purple-600 text-white text-center font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Make an Honor Gift
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-purple-900 mb-3">How It Works</h3>
          <ol className="space-y-2 text-sm text-purple-800 list-decimal list-inside">
            <li>Choose whether to make an &quot;In Memory Of&quot; or &quot;In Honor Of&quot; donation</li>
            <li>Enter the name of the person or pet you&apos;re honoring</li>
            <li>Select your donation amount</li>
            <li>Optionally include a personal message</li>
            <li>We&apos;ll send a beautiful acknowledgment to you and/or the honoree&apos;s family</li>
          </ol>
        </div>

        {/* Tribute Wall - Coming Soon */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-12">
          <span className="text-4xl mb-4 block">💫</span>
          <h3 className="font-bold text-blue-900 mb-2">Tribute Wall Coming Soon</h3>
          <p className="text-blue-800 text-sm">
            With donor permission, we&apos;ll display tribute donations on a memorial wall
            to honor those remembered. Check back soon.
          </p>
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">
            Your Tribute Makes a Difference
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            100% of tribute donations support our programs helping animals in need.
            You&apos;ll receive a tax receipt and acknowledgment letter for your records.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 text-purple-600 font-medium hover:underline"
          >
            Questions? Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}
