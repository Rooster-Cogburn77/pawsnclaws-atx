"use client";

import { useState } from "react";

export default function CharlotteVetFundPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    petType: "",
    situation: "",
    vetName: "",
    vetPhone: "",
    estimatedCost: "",
    canContribute: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charlotte vet fund request:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏥</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your vet fund request. Our team will review it
            and get back to you within 24-48 hours. For emergencies, please
            contact the vet directly.
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
          <span className="text-5xl mb-4 block">🏥</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency Vet Fund
          </h1>
          <p className="text-xl text-gray-600">
            Financial help for unexpected veterinary emergencies
          </p>
        </div>

        {/* Eligibility */}
        <div className="bg-teal-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-teal-900 mb-3">Eligibility</h2>
          <ul className="space-y-2 text-teal-800 text-sm">
            <li>✓ Charlotte/Mecklenburg County residents</li>
            <li>✓ Unexpected emergency (not routine care)</li>
            <li>✓ Demonstrated financial need</li>
            <li>✓ Pet owner OR community cat caretaker</li>
          </ul>
          <p className="mt-4 text-teal-700 text-sm">
            <strong>Note:</strong> Funds are paid directly to the veterinarian,
            not to individuals. Maximum assistance varies based on available funds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Request Assistance</h2>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
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
          </div>

          {/* Pet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                required
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Type *
              </label>
              <select
                required
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="cat-owned">Cat (my pet)</option>
                <option value="cat-community">Cat (community/feral)</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Situation */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What happened? *
            </label>
            <textarea
              required
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              placeholder="Describe the emergency and what treatment is needed..."
            />
          </div>

          {/* Vet Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Veterinarian/Clinic Name
              </label>
              <input
                type="text"
                value={formData.vetName}
                onChange={(e) => setFormData({ ...formData, vetName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vet Phone
              </label>
              <input
                type="tel"
                value={formData.vetPhone}
                onChange={(e) => setFormData({ ...formData, vetPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Cost */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Cost *
              </label>
              <input
                type="text"
                required
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                placeholder="$"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Can you contribute any amount?
              </label>
              <select
                value={formData.canContribute}
                onChange={(e) => setFormData({ ...formData, canContribute: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="none">No, I cannot contribute</option>
                <option value="some">Yes, I can pay part</option>
                <option value="half">I can pay about half</option>
              </select>
            </div>
          </div>

          {/* Additional */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anything else we should know?
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Submit Request
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            We review requests within 24-48 hours. For immediate emergencies,
            please contact the vet directly.
          </p>
        </form>
      </div>
    </div>
  );
}
