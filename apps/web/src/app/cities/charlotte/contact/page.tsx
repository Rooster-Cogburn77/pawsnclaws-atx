"use client";

import { useState } from "react";

export default function CharlotteContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charlotte contact form:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-6xl mb-6 block">✉️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Message Sent!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
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
          <span className="text-5xl mb-4 block">📬</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact PawsNClaws CLT
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? We&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Question</option>
                  <option value="colony">Colony/TNR Help</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="foster">Fostering</option>
                  <option value="donate">Donations</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Email Us</h3>
              <a
                href="mailto:charlotte@pawsandclawsatx.com"
                className="text-teal-600 hover:text-teal-700"
              >
                charlotte@pawsandclawsatx.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/cities/charlotte/resources" className="text-teal-600 hover:text-teal-700">
                    → Local TNR Resources
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/map/submit" className="text-teal-600 hover:text-teal-700">
                    → Report a Colony
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/volunteer" className="text-teal-600 hover:text-teal-700">
                    → Volunteer Application
                  </a>
                </li>
                <li>
                  <a href="/cities/charlotte/foster" className="text-teal-600 hover:text-teal-700">
                    → Foster Application
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="font-bold text-red-800 mb-2">Emergency?</h3>
              <p className="text-red-700 text-sm mb-3">
                For injured animals or emergencies, contact:
              </p>
              <div className="space-y-2">
                <p className="font-medium text-red-800">
                  CARE Charlotte: <a href="tel:704-457-2300" className="underline">(704) 457-2300</a>
                </p>
                <p className="font-medium text-red-800">
                  Animal Control: <a href="tel:311" className="underline">311</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
