"use client";

import { useState } from "react";
import Link from "next/link";

interface VolunteerActivity {
  id: string;
  title: string;
  icon: string;
  duration: string;
  groupSize: string;
  description: string;
  activities: string[];
  impact: string;
}

const volunteerActivities: VolunteerActivity[] = [
  {
    id: "shelter-support",
    title: "Shelter Support Day",
    icon: "🏠",
    duration: "4-6 hours",
    groupSize: "10-30 people",
    description: "Help local shelters with cleaning, organizing, and animal socialization.",
    activities: [
      "Kennel cleaning and sanitization",
      "Laundry and bedding changes",
      "Dog walking and cat socialization",
      "Facility maintenance projects",
    ],
    impact: "Directly improves shelter animal welfare and staff capacity",
  },
  {
    id: "supply-drive",
    title: "Supply Drive Competition",
    icon: "📦",
    duration: "1-2 weeks (collection)",
    groupSize: "Any size",
    description: "Organize a company-wide collection of pet supplies with team competitions.",
    activities: [
      "Set up collection points at offices",
      "Create team competitions with prizes",
      "Sort and deliver donations",
      "Social media content creation",
    ],
    impact: "Provides critical supplies: food, litter, toys, blankets",
  },
  {
    id: "tnr-support",
    title: "TNR Event Support",
    icon: "✂️",
    duration: "4-8 hours",
    groupSize: "5-15 people",
    description: "Assist with community cat Trap-Neuter-Return events.",
    activities: [
      "Set up and tear down clinic areas",
      "Transport cats to/from clinic",
      "Monitor recovery areas",
      "Community outreach",
    ],
    impact: "Directly reduces stray population humanely",
  },
  {
    id: "foster-orientation",
    title: "Foster Info Session",
    icon: "🎓",
    duration: "2-3 hours",
    groupSize: "10-50 people",
    description: "Host a foster orientation session at your workplace.",
    activities: [
      "Lunch-and-learn format",
      "Foster 101 presentation",
      "Q&A with experienced fosters",
      "Sign-up opportunities",
    ],
    impact: "Recruits new fosters from your employee base",
  },
  {
    id: "transport",
    title: "Transport Team",
    icon: "🚗",
    duration: "Flexible",
    groupSize: "5-20 people",
    description: "Help transport animals between shelters, clinics, and foster homes.",
    activities: [
      "Shelter-to-shelter transfers",
      "Vet appointment transport",
      "Foster home deliveries",
      "Airport rescue pickups",
    ],
    impact: "Enables animal movement that saves lives",
  },
  {
    id: "skills-based",
    title: "Skills-Based Volunteering",
    icon: "💻",
    duration: "Varies",
    groupSize: "1-10 people",
    description: "Apply professional skills to help our mission.",
    activities: [
      "Website/app development",
      "Marketing and design",
      "Photography/videography",
      "Legal or accounting support",
    ],
    impact: "Professional services we couldn't otherwise afford",
  },
];

export default function CorporateVolunteerPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    teamSize: "",
    preferredDate: "",
    alternateDate: "",
    activityType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "corporate-volunteer",
          activityType: selectedActivity || formData.activityType,
        }),
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
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for organizing a volunteer event! We&apos;ll be in touch within
            2 business days to coordinate details and confirm your date.
          </p>
          <Link
            href="/corporate"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Explore More Partnership Options
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/corporate"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
          >
            ← Back to Corporate Partnerships
          </Link>
          <span className="block text-5xl mb-4">🤝</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Corporate Volunteer Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Team building that makes a real difference. Organize a volunteer
            event that helps Austin&apos;s animals and brings your team together.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <span className="text-3xl mb-3 block">👥</span>
              <h3 className="font-bold text-gray-900 mb-1">Team Building</h3>
              <p className="text-sm text-gray-600">
                Bond over meaningful work outside the office
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <span className="text-3xl mb-3 block">⏰</span>
              <h3 className="font-bold text-gray-900 mb-1">Use VTO Hours</h3>
              <p className="text-sm text-gray-600">
                Many companies offer paid volunteer time
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <span className="text-3xl mb-3 block">📸</span>
              <h3 className="font-bold text-gray-900 mb-1">Photo Ops</h3>
              <p className="text-sm text-gray-600">
                Great content for social and internal comms
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <span className="text-3xl mb-3 block">🐾</span>
              <h3 className="font-bold text-gray-900 mb-1">Real Impact</h3>
              <p className="text-sm text-gray-600">
                Tangible results you can see same-day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Options */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Activity
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerActivities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelectedActivity(activity.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  selectedActivity === activity.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <span className="text-4xl mb-3 block">{activity.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {activity.duration}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {activity.groupSize}
                  </span>
                </div>
                {selectedActivity === activity.id && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      Activities include:
                    </p>
                    <ul className="text-sm text-green-700 space-y-1">
                      {activity.activities.map((act, i) => (
                        <li key={i}>• {act}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-green-600 italic">
                      Impact: {activity.impact}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Volunteer Event
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we&apos;ll work with you to plan the perfect event.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Team Size *
                  </label>
                  <select
                    required
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Select size</option>
                    <option value="5-10">5-10 people</option>
                    <option value="11-20">11-20 people</option>
                    <option value="21-30">21-30 people</option>
                    <option value="31-50">31-50 people</option>
                    <option value="50+">50+ people</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alternate Date
                  </label>
                  <input
                    type="date"
                    value={formData.alternateDate}
                    onChange={(e) =>
                      setFormData({ ...formData, alternateDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              {selectedActivity && (
                <div className="p-4 bg-green-50 rounded-xl">
                  <span className="text-sm text-green-700">
                    Selected activity:{" "}
                    <strong>
                      {volunteerActivities.find((a) => a.id === selectedActivity)?.title}
                    </strong>
                  </span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                  rows={4}
                  placeholder="Any special requirements, accessibility needs, or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Request Volunteer Event"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Volunteer Grants */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-2xl p-8 text-center">
            <span className="text-4xl mb-4 block">💰</span>
            <h2 className="text-2xl font-bold text-white mb-4">
              Does Your Company Offer Volunteer Grants?
            </h2>
            <p className="text-green-200 mb-6 max-w-xl mx-auto">
              Many employers donate money to nonprofits where employees volunteer.
              After your event, we can provide documentation for volunteer grant submissions.
            </p>
            <Link
              href="/corporate/matching-gifts"
              className="inline-block px-6 py-3 bg-white text-green-900 font-bold rounded-xl hover:bg-green-100 transition-colors"
            >
              Learn About Matching Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
