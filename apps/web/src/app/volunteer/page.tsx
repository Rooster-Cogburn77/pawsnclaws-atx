"use client";

import { useState } from "react";
import Link from "next/link";
import { UsersIcon } from "@/components/Icons";

const volunteerRoles = [
  {
    id: "colony-feeder",
    title: "Colony Feeder",
    emoji: "🍽️",
    commitment: "Regular",
    description:
      "Feed and monitor a community cat colony on a regular schedule. We provide food and supplies.",
    requirements: ["Reliable transportation", "Consistent schedule", "Basic cat knowledge"],
  },
  {
    id: "tnr-helper",
    title: "TNR Volunteer",
    emoji: "✂️",
    commitment: "Occasional",
    description:
      "Help trap community cats for spay/neuter and return them to their colonies.",
    requirements: ["Can lift 20+ lbs", "Available mornings", "Training provided"],
  },
  {
    id: "foster",
    title: "Foster Parent",
    emoji: "🏠",
    commitment: "Varies",
    description:
      "Provide temporary homes for cats or dogs until they find their forever families.",
    requirements: ["Safe indoor space", "Other pets must be vaccinated", "Time for socialization"],
  },
  {
    id: "transport",
    title: "Transport Driver",
    emoji: "🚗",
    commitment: "Flexible",
    description:
      "Help transport animals to vet appointments, foster homes, or adoption events.",
    requirements: ["Reliable vehicle", "Flexible schedule", "Comfortable with animals in car"],
  },
  {
    id: "events",
    title: "Event Volunteer",
    emoji: "🎉",
    commitment: "Occasional",
    description:
      "Help at adoption events, fundraisers, and community outreach activities.",
    requirements: ["Good with people", "Weekend availability sometimes", "Enthusiastic!"],
  },
  {
    id: "admin",
    title: "Admin Support",
    emoji: "💻",
    commitment: "Flexible",
    description:
      "Help with social media, data entry, phone calls, or other administrative tasks.",
    requirements: ["Computer skills", "Can work remotely", "Detail-oriented"],
  },
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
    availability: "",
    experience: "",
    hasVehicle: false,
    canFoster: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(roleId)
        ? prev.interests.filter((i) => i !== roleId)
        : [...prev.interests, roleId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/volunteer", {
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
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Team!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for signing up to volunteer! We&apos;ll review your
            application and reach out within a few days to get you started.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <UsersIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer With Us
          </h1>
          <p className="text-xl text-gray-600">
            Join our community of animal lovers making a real difference for
            Austin&apos;s cats and dogs.
          </p>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ways to Help
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteerRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => toggleInterest(role.id)}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  formData.interests.includes(role.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 bg-white hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{role.emoji}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      role.commitment === "Regular"
                        ? "bg-purple-100 text-purple-700"
                        : role.commitment === "Occasional"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {role.commitment}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="text-xs text-gray-500">
                  {role.requirements.slice(0, 2).join(" • ")}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Sign Up to Volunteer
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Weekday mornings, weekends"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience with animals
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Tell us about your experience with pets, volunteering, etc."
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasVehicle}
                    onChange={(e) =>
                      setFormData({ ...formData, hasVehicle: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-gray-700">
                    I have reliable transportation
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.canFoster}
                    onChange={(e) =>
                      setFormData({ ...formData, canFoster: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-gray-700">
                    I&apos;m interested in fostering animals
                  </span>
                </label>
              </div>

              {formData.interests.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-xl">
                  <span className="text-sm font-medium text-amber-800">
                    Interested in:{" "}
                    {formData.interests
                      .map(
                        (id) => volunteerRoles.find((r) => r.id === id)?.title
                      )
                      .join(", ")}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anything else we should know?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={2}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Join the Team"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
