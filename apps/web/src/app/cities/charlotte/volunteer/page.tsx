"use client";

import { useState } from "react";

const volunteerRoles = [
  { id: "colony-care", label: "Colony Caretaker", description: "Feed and monitor a local colony" },
  { id: "tnr-helper", label: "TNR Helper", description: "Assist with trapping and transport" },
  { id: "foster", label: "Foster Parent", description: "Provide temporary homes" },
  { id: "transport", label: "Transport Driver", description: "Drive cats to/from appointments" },
  { id: "events", label: "Events & Outreach", description: "Help at community events" },
  { id: "admin", label: "Admin & Social Media", description: "Help with communications" },
];

export default function CharlotteVolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    roles: [] as string[],
    experience: "",
    availability: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production: submit to API
    console.log("Charlotte volunteer submission:", formData);
    setSubmitted(true);
  };

  const toggleRole = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter((r) => r !== roleId)
        : [...prev.roles, roleId],
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">🎉</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Volunteering!
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve received your application and will be in touch soon.
            Charlotte&apos;s cats thank you!
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
          <span className="text-5xl mb-4 block">🤝</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer in Charlotte
          </h1>
          <p className="text-xl text-gray-600">
            Join our team and help make a difference for community cats
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                Phone
              </label>
              <input
                type="tel"
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

          {/* Roles */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I&apos;m interested in: (select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {volunteerRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => toggleRole(role.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.roles.includes(role.id)
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{role.label}</div>
                  <div className="text-sm text-gray-500">{role.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience with cats/animals
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="none">No experience (that&apos;s okay!)</option>
              <option value="pet-owner">Pet owner</option>
              <option value="some">Some rescue/shelter experience</option>
              <option value="experienced">Experienced in animal rescue</option>
              <option value="professional">Vet tech or professional</option>
            </select>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings only</option>
              <option value="flexible">Flexible schedule</option>
              <option value="occasional">Occasional/events only</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anything else you&apos;d like us to know?
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              placeholder="Tell us about yourself, your experience, or any questions..."
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
