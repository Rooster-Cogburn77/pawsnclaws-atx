"use client";

import { useState } from "react";
import Link from "next/link";

// Sample partner businesses
const samplePartners = [
  {
    name: "Cosmic Coffee + Beer Garden",
    type: "Coffee Shop",
    location: "North Loop",
    logo: null,
    raised: 234500, // cents
  },
  {
    name: "Bouldin Creek Cafe",
    type: "Restaurant",
    location: "South Austin",
    logo: null,
    raised: 187300,
  },
  {
    name: "Bark & Co Pet Supply",
    type: "Pet Store",
    location: "East Austin",
    logo: null,
    raised: 412000,
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Partner Joins",
    description: "Local businesses sign up to participate in our Round-Up program.",
  },
  {
    step: "2",
    title: "Customers Round Up",
    description: "At checkout, customers can round up their purchase to the nearest dollar.",
  },
  {
    step: "3",
    title: "Change Adds Up",
    description: "Those extra cents are collected and donated to PawsNClaws ATX monthly.",
  },
  {
    step: "4",
    title: "Animals Helped",
    description: "100% of round-up donations go directly to helping Austin's animals.",
  },
];

const benefits = [
  {
    emoji: "💕",
    title: "Customer Engagement",
    description: "Give customers an easy way to feel good about their purchase.",
  },
  {
    emoji: "🏆",
    title: "Community Recognition",
    description: "Featured on our website and social media as a partner business.",
  },
  {
    emoji: "📊",
    title: "Impact Reports",
    description: "Monthly reports showing exactly how much your customers raised.",
  },
  {
    emoji: "🎯",
    title: "Local Impact",
    description: "100% stays local - helping Austin animals and families.",
  },
];

export default function RoundUpPartnersPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    locations: "",
    posSystem: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Round-up partner inquiry:", formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const totalRaised = samplePartners.reduce((sum, p) => sum + p.raised, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🪙</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Round-Up for Rescues
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner businesses let customers round up their purchases to support Austin&apos;s animals.
            Small change, big impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-amber-600">
              {samplePartners.length}
            </div>
            <div className="text-gray-600">Partner Businesses</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              ${(totalRaised / 100).toLocaleString()}
            </div>
            <div className="text-gray-600">Raised This Year</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-gray-600">Goes to Animals</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl font-bold text-amber-600 mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {samplePartners.map((partner, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-5">
                <div className="w-16 h-16 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-2xl">
                  🏪
                </div>
                <h3 className="font-bold text-gray-900">{partner.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {partner.type} • {partner.location}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  ${(partner.raised / 100).toLocaleString()} raised
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
            Why Partner With Us?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-2xl">{benefit.emoji}</span>
                <div>
                  <h3 className="font-bold text-green-900">{benefit.title}</h3>
                  <p className="text-sm text-green-800">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Signup Form */}
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <span className="text-4xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thanks for Your Interest!
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ll be in touch within 2-3 business days to discuss the partnership.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Become a Partner
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="restaurant">Restaurant/Cafe</option>
                    <option value="retail">Retail Store</option>
                    <option value="pet">Pet Store/Services</option>
                    <option value="bar">Bar/Brewery</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Locations
                  </label>
                  <input
                    type="text"
                    value={formData.locations}
                    onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., 1, 3, 10+"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  POS System (if known)
                </label>
                <input
                  type="text"
                  value={formData.posSystem}
                  onChange={(e) => setFormData({ ...formData, posSystem: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Square, Toast, Clover"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anything else we should know?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Request Partnership Info"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
