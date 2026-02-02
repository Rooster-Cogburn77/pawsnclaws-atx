"use client";

import { useState } from "react";

export default function CharlotteFosterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    housingType: "",
    hasOtherPets: "",
    otherPetsDetails: "",
    hasChildren: "",
    fosterType: [] as string[],
    experience: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const fosterTypes = [
    { id: "kittens", label: "Kittens", description: "Bottle babies or weaned kittens" },
    { id: "adult-cats", label: "Adult Cats", description: "Friendly strays needing socialization" },
    { id: "medical", label: "Medical Fosters", description: "Cats recovering from surgery/illness" },
    { id: "pregnant", label: "Pregnant Moms", description: "Expecting cats until kittens are weaned" },
    { id: "feral-friendly", label: "Barn Cats", description: "Semi-feral cats needing safe outdoor homes" },
  ];

  const toggleFosterType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      fosterType: prev.fosterType.includes(typeId)
        ? prev.fosterType.filter((t) => t !== typeId)
        : [...prev.fosterType, typeId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charlotte foster application:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in fostering! We&apos;ll review your
            application and reach out within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Foster for Charlotte
          </h1>
          <p className="text-xl text-gray-600">
            Open your home temporarily and save lives
          </p>
        </div>

        {/* What We Provide */}
        <div className="bg-teal-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-teal-800 mb-3">What We Provide</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-teal-700 text-sm">
            <li>✓ All food and supplies</li>
            <li>✓ Litter and litter boxes</li>
            <li>✓ All veterinary care</li>
            <li>✓ Crates and carriers</li>
            <li>✓ 24/7 support line</li>
            <li>✓ Foster community group</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Foster Application</h2>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                required
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                placeholder="28XXX"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Housing */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Housing Type *
            </label>
            <select
              required
              value={formData.housingType}
              onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="house">House (owned)</option>
              <option value="house-rent">House (rented)</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo/Townhouse</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Other Pets */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have other pets? *
            </label>
            <select
              required
              value={formData.hasOtherPets}
              onChange={(e) => setFormData({ ...formData, hasOtherPets: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="no">No other pets</option>
              <option value="cats">Cats only</option>
              <option value="dogs">Dogs only</option>
              <option value="both">Cats and dogs</option>
              <option value="other">Other animals</option>
            </select>
          </div>

          {/* Foster Types */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What would you like to foster? (select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {fosterTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleFosterType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.fosterType.includes(type.id)
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foster/rescue experience
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="none">First time foster</option>
              <option value="some">Some fostering experience</option>
              <option value="experienced">Experienced foster</option>
              <option value="professional">Vet tech or professional</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about yourself and your home
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              placeholder="What's your living situation like? Any experience with cats? Why do you want to foster?"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
