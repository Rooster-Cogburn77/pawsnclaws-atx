"use client";

import { useState } from "react";
import Link from "next/link";

const urgentNeedOptions = [
  { value: "tnr-needed", label: "TNR needed (unfixed cats)" },
  { value: "food-needed", label: "Regular food supply needed" },
  { value: "medical", label: "Cats need medical attention" },
  { value: "shelter", label: "Shelter/housing needed" },
  { value: "caretaker", label: "Need a regular caretaker" },
  { value: "threatened", label: "Colony is threatened (eviction, etc.)" },
];

export default function CharlotteSubmitColonyPage() {
  const [formData, setFormData] = useState({
    colonyName: "",
    locationDescription: "",
    address: "",
    estimatedCats: "",
    tnrStatus: "",
    hasCaretaker: "",
    caretakerContact: "",
    feedingSchedule: "",
    urgentNeeds: [] as string[],
    additionalInfo: "",
    submitterName: "",
    submitterEmail: "",
    submitterPhone: "",
    submitterRelation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      urgentNeeds: prev.urgentNeeds.includes(need)
        ? prev.urgentNeeds.filter((n) => n !== need)
        : [...prev.urgentNeeds, need],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charlotte colony submission:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">📍</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Colony Submitted!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reporting this colony. Our team will review the
            submission and reach out if we need more information. Approved
            colonies will appear on the map.
          </p>
          <Link
            href="/cities/charlotte/map"
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/cities/charlotte/map"
            className="text-teal-600 hover:text-teal-700 text-sm mb-4 inline-block"
          >
            ← Back to Map
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report a Colony
          </h1>
          <p className="text-xl text-gray-600">
            Help us track and support community cats in Charlotte
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 rounded-xl p-4 mb-8 text-sm">
          <p className="text-blue-800">
            <strong>Privacy:</strong> Exact colony locations are only shared with
            verified volunteers. The public map shows approximate areas only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Colony Info */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Colony Information</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colony Name (optional)
              </label>
              <input
                type="text"
                value={formData.colonyName}
                onChange={(e) => setFormData({ ...formData, colonyName: e.target.value })}
                placeholder="e.g., 'The Park Street Cats'"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Number of Cats *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.estimatedCats}
                onChange={(e) => setFormData({ ...formData, estimatedCats: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Description *
            </label>
            <textarea
              required
              value={formData.locationDescription}
              onChange={(e) => setFormData({ ...formData, locationDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              placeholder="Describe where the cats gather (e.g., 'Behind the shopping center near the dumpsters')"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address or Cross Streets (approximate is fine)
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* TNR Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TNR Status *
              </label>
              <select
                required
                value={formData.tnrStatus}
                onChange={(e) => setFormData({ ...formData, tnrStatus: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="all">All cats are fixed (ear-tipped)</option>
                <option value="partial">Some cats are fixed</option>
                <option value="none">No cats are fixed</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is there a regular caretaker? *
              </label>
              <select
                required
                value={formData.hasCaretaker}
                onChange={(e) => setFormData({ ...formData, hasCaretaker: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          {/* Urgent Needs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Urgent Needs (select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {urgentNeedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleNeed(option.value)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    formData.urgentNeeds.includes(option.value)
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              placeholder="Any other details about the colony..."
            />
          </div>

          {/* Submitter Info */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 pt-6 border-t">
            Your Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.submitterName}
                onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
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
                value={formData.submitterEmail}
                onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={formData.submitterPhone}
                onChange={(e) => setFormData({ ...formData, submitterPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Relationship to Colony *
              </label>
              <select
                required
                value={formData.submitterRelation}
                onChange={(e) => setFormData({ ...formData, submitterRelation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="caretaker">I am the caretaker</option>
                <option value="neighbor">Neighbor/nearby resident</option>
                <option value="observer">Just observed them</option>
                <option value="property">Property owner/manager</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Submit Colony Report
          </button>
        </form>
      </div>
    </div>
  );
}
