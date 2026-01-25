"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ReportFormContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "found" ? "found" : "lost";

  const [formData, setFormData] = useState({
    type: initialType,
    species: "dog",
    breed: "",
    name: "",
    color: "",
    description: "",
    location: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    microchipId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lost-found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">
            {formData.type === "lost" ? "🔴" : "🟢"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Report Submitted
          </h1>
          <p className="text-gray-600 mb-6">
            {formData.type === "lost"
              ? "We've posted your lost pet report. We hope you're reunited soon!"
              : "Thank you for reporting this found pet. You're helping get them home!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lost-found"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              View All Listings
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isLost = formData.type === "lost";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report a {isLost ? "Lost" : "Found"} Pet
          </h1>
          <p className="text-gray-600">
            {isLost
              ? "We'll help spread the word to find your pet."
              : "Help this pet get back to their family."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "lost" })}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                isLost
                  ? "bg-red-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🔴 Lost Pet
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "found" })}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                !isLost
                  ? "bg-green-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🟢 Found Pet
            </button>
          </div>

          {/* Pet Info */}
          <h3 className="font-bold text-gray-900 mb-4">Pet Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species *
              </label>
              <select
                value={formData.species}
                onChange={(e) =>
                  setFormData({ ...formData, species: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breed
              </label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="e.g. Labrador, Tabby"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {isLost && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            )}
            <div className={isLost ? "" : "col-span-2"}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color/Markings *
              </label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="e.g. Black and white, orange tabby"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
              rows={3}
              placeholder={
                isLost
                  ? "Describe your pet, any distinguishing features, collar, tags, temperament..."
                  : "Describe the pet, where exactly you found them, their condition..."
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isLost ? "Last Seen Location *" : "Found Location *"}
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              placeholder="Be specific: street, neighborhood, landmarks"
            />
          </div>

          {isLost && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Microchip ID (if known)
              </label>
              <input
                type="text"
                value={formData.microchipId}
                onChange={(e) =>
                  setFormData({ ...formData, microchipId: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          {/* Contact Info */}
          <h3 className="font-bold text-gray-900 mb-4 mt-8">
            Your Contact Information
          </h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-bold text-white rounded-xl transition-colors ${
              isLost
                ? "bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                : "bg-green-500 hover:bg-green-600 disabled:bg-green-300"
            }`}
          >
            {isSubmitting ? "Submitting..." : `Submit ${isLost ? "Lost" : "Found"} Report`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ReportFormContent />
    </Suspense>
  );
}
