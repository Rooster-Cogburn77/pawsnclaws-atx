"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmitColonyPage() {
  const [formData, setFormData] = useState({
    colonyName: "",
    locationDescription: "",
    address: "",
    latitude: "",
    longitude: "",
    estimatedCats: "",
    tnrStatus: "unknown",
    hasCaretaker: "unknown",
    caretakerContact: "",
    feedingSchedule: "",
    urgentNeeds: [] as string[],
    additionalInfo: "",
    submitterName: "",
    submitterEmail: "",
    submitterPhone: "",
    submitterRelation: "observer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [useManualCoords, setUseManualCoords] = useState(false);

  const urgentNeedOptions = [
    { value: "tnr-needed", label: "TNR needed (unfixed cats)" },
    { value: "food-needed", label: "Regular food supply needed" },
    { value: "medical", label: "Cats need medical attention" },
    { value: "shelter", label: "Weather shelter needed" },
    { value: "caretaker", label: "Looking for caretaker" },
    { value: "threatened", label: "Colony threatened (construction, complaints)" },
  ];

  const handleUrgentNeedToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      urgentNeeds: prev.urgentNeeds.includes(value)
        ? prev.urgentNeeds.filter((n) => n !== value)
        : [...prev.urgentNeeds, value],
    }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enter coordinates manually or describe the location in detail.");
          setUseManualCoords(true);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setUseManualCoords(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/colonies/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🐱</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Colony Submitted for Review
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for helping us track community cats! Our team will review
            your submission and add it to our map if verified. We may contact you
            for additional information.
          </p>
          <div className="space-y-4">
            <Link
              href="/map"
              className="block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              View Colony Map
            </Link>
            <Link
              href="/map/submit"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  colonyName: "",
                  locationDescription: "",
                  address: "",
                  latitude: "",
                  longitude: "",
                  estimatedCats: "",
                  tnrStatus: "unknown",
                  hasCaretaker: "unknown",
                  caretakerContact: "",
                  feedingSchedule: "",
                  urgentNeeds: [],
                  additionalInfo: "",
                  submitterName: "",
                  submitterEmail: "",
                  submitterPhone: "",
                  submitterRelation: "observer",
                });
              }}
              className="block px-6 py-3 text-amber-600 font-medium hover:underline"
            >
              Submit Another Colony
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4"
          >
            ← Back to Map
          </Link>
          <span className="block text-5xl mb-4">🐱</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report a Cat Colony
          </h1>
          <p className="text-gray-600">
            Help us track and support community cat colonies in Austin. All
            submissions are reviewed before being added to our public map.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-blue-900 mb-1">Privacy Note</h3>
          <p className="text-sm text-blue-800">
            Exact locations are only visible to verified volunteers and caretakers.
            The public map shows approximate areas to protect colonies from harm.
            Your contact information is never shared publicly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Colony Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Colony Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Colony Name (optional)
                </label>
                <input
                  type="text"
                  value={formData.colonyName}
                  onChange={(e) => setFormData({ ...formData, colonyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Riverside Colony, Mueller Park Cats"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Give the colony a name to help identify it
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Description *
                </label>
                <textarea
                  required
                  value={formData.locationDescription}
                  onChange={(e) => setFormData({ ...formData, locationDescription: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe where the colony is located (e.g., 'Behind the HEB on Riverside, near the dumpsters' or 'In the wooded area next to Mueller Lake Park')"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nearest Address (optional)
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Street address or cross streets"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPS Coordinates (optional but helpful)
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    📍 Use My Location
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseManualCoords(!useManualCoords)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Enter Manually
                  </button>
                </div>
                {(useManualCoords || formData.latitude) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                        placeholder="Latitude (e.g., 30.2672)"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                        placeholder="Longitude (e.g., -97.7431)"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Number of Cats *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.estimatedCats}
                    onChange={(e) => setFormData({ ...formData, estimatedCats: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TNR Status *
                  </label>
                  <select
                    required
                    value={formData.tnrStatus}
                    onChange={(e) => setFormData({ ...formData, tnrStatus: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="unknown">Unknown</option>
                    <option value="none">None fixed</option>
                    <option value="partial">Some fixed</option>
                    <option value="complete">All fixed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Care Status */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Care Status
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Does this colony have a caretaker?
                </label>
                <select
                  value={formData.hasCaretaker}
                  onChange={(e) => setFormData({ ...formData, hasCaretaker: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="unknown">Unknown</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="me">I am the caretaker</option>
                </select>
              </div>

              {(formData.hasCaretaker === "yes" || formData.hasCaretaker === "me") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caretaker Contact (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.caretakerContact}
                    onChange={(e) => setFormData({ ...formData, caretakerContact: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="Name, phone, or email"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only visible to our volunteer coordinators
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feeding Schedule (if known)
                </label>
                <input
                  type="text"
                  value={formData.feedingSchedule}
                  onChange={(e) => setFormData({ ...formData, feedingSchedule: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Daily at 6am and 6pm, Every other day"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgent Needs (select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {urgentNeedOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.urgentNeeds.includes(option.value)
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.urgentNeeds.includes(option.value)}
                        onChange={() => handleUrgentNeedToggle(option.value)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          formData.urgentNeeds.includes(option.value)
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.urgentNeeds.includes(option.value) && "✓"}
                      </span>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Any other details about the colony (health conditions, friendly vs feral, history, etc.)"
                />
              </div>
            </div>
          </div>

          {/* Your Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Your Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.submitterName}
                  onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.submitterPhone}
                  onChange={(e) => setFormData({ ...formData, submitterPhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Relationship to This Colony
                </label>
                <select
                  value={formData.submitterRelation}
                  onChange={(e) => setFormData({ ...formData, submitterRelation: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="observer">I&apos;ve seen these cats</option>
                  <option value="caretaker">I feed/care for this colony</option>
                  <option value="neighbor">I live nearby</option>
                  <option value="property-owner">I own the property</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Colony for Review"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting, you confirm this information is accurate to the best of
            your knowledge. False reports may result in being blocked from future
            submissions.
          </p>
        </form>
      </div>
    </div>
  );
}
