"use client";

import { useState } from "react";

export default function CharlotteDepositAssistancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentAddress: "",
    newAddress: "",
    moveDate: "",
    petType: "",
    petCount: "",
    depositAmount: "",
    monthlyIncome: "",
    situation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charlotte deposit assistance:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your deposit assistance application. Our team will
            review it and contact you within 3-5 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet Deposit Assistance
          </h1>
          <p className="text-xl text-gray-600">
            0% interest loans to help you keep your pet when moving
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-blue-900 mb-3">How It Works</h2>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✓ We provide 0% interest loans for pet deposits</li>
            <li>✓ Funds are paid directly to your landlord</li>
            <li>✓ Flexible repayment terms based on your situation</li>
            <li>✓ No credit check required</li>
          </ul>
          <p className="mt-4 text-blue-700 text-sm">
            <strong>Eligibility:</strong> Charlotte/Mecklenburg County residents
            facing a pet deposit that would otherwise cause surrender.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Apply for Assistance</h2>

          {/* Contact */}
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Move Date *
              </label>
              <input
                type="date"
                required
                value={formData.moveDate}
                onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Address
            </label>
            <input
              type="text"
              value={formData.currentAddress}
              onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Address (if known)
            </label>
            <input
              type="text"
              value={formData.newAddress}
              onChange={(e) => setFormData({ ...formData, newAddress: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Pet & Deposit */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Type *
              </label>
              <select
                required
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="cat">Cat(s)</option>
                <option value="dog">Dog(s)</option>
                <option value="both">Cats and Dogs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pets *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.petCount}
                onChange={(e) => setFormData({ ...formData, petCount: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount *
              </label>
              <input
                type="text"
                required
                value={formData.depositAmount}
                onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                placeholder="$"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Situation */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about your situation
            </label>
            <textarea
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Why do you need help with the deposit? Any other relevant details..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            We&apos;ll review your application within 3-5 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
