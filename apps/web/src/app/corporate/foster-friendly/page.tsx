"use client";

import { useState } from "react";
import Link from "next/link";

export default function FosterFriendlyPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactTitle: "",
    employeeCount: "",
    currentPolicies: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const certificationLevels = [
    {
      level: "Certified",
      icon: "🥉",
      color: "amber",
      requirements: [
        "Allow pets in office (or remote-friendly)",
        "Flexible scheduling for vet appointments",
        "Internal communication about fostering",
      ],
      benefits: [
        "Foster Friendly Workplace badge",
        "Listing on our partner directory",
        "Social media recognition",
      ],
    },
    {
      level: "Silver",
      icon: "🥈",
      color: "slate",
      requirements: [
        "All Certified requirements, plus:",
        "Foster supply stipend or reimbursement",
        "Paid time off for foster emergencies",
        "Host foster info session annually",
      ],
      benefits: [
        "Everything in Certified, plus:",
        "Featured case study",
        "Priority volunteer event scheduling",
        "Quarterly impact reports",
      ],
    },
    {
      level: "Gold",
      icon: "🥇",
      color: "yellow",
      requirements: [
        "All Silver requirements, plus:",
        "Dedicated foster support budget",
        "Foster mentor program",
        "Corporate matching for foster expenses",
      ],
      benefits: [
        "Everything in Silver, plus:",
        "Press release announcement",
        "Speaking opportunity at events",
        "Annual recognition award",
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "foster-friendly-certification",
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in becoming a Foster Friendly Workplace!
            We&apos;ll review your application and be in touch within 5 business days
            to discuss next steps.
          </p>
          <Link
            href="/corporate"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Back to Corporate Partnerships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/corporate"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          >
            ← Back to Corporate Partnerships
          </Link>
          <span className="inline-block px-4 py-1 bg-amber-500 text-white rounded-full text-sm font-medium mb-6">
            New Program
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Foster Friendly Workplace<sup className="text-amber-500">™</sup>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get certified as an employer that supports employees who foster animals.
            Attract talent, boost morale, and save lives.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <span className="text-green-500">●</span>
            <span className="text-gray-700 font-medium">Now accepting applications</span>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Foster Friendly Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">The Problem</h3>
                <p className="text-gray-600 mb-4">
                  Austin&apos;s shelters are at capacity. The #1 solution is more foster homes.
                  But many potential fosters worry about work conflicts: vet appointments,
                  emergencies, bringing a pet to the office.
                </p>
                <p className="text-gray-600">
                  Workplace policies directly impact whether employees can foster.
                  A supportive employer removes barriers that prevent people from helping.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">The Opportunity</h3>
                <p className="text-gray-600 mb-4">
                  Companies that support fostering see real benefits:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Attract talent who value CSR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Boost employee morale and engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Differentiate your employer brand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Earn recognition and positive PR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-amber-500 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">67%</div>
              <div className="text-amber-100 text-sm">of employees prefer companies with strong CSR</div>
            </div>
            <div className="bg-amber-500 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">78%</div>
              <div className="text-amber-100 text-sm">of Austin residents own or want a pet</div>
            </div>
            <div className="bg-amber-500 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">1 in 4</div>
              <div className="text-amber-100 text-sm">shelter animals need foster care</div>
            </div>
            <div className="bg-amber-500 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">2 weeks</div>
              <div className="text-amber-100 text-sm">average foster commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Certification Levels
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certificationLevels.map((cert) => (
              <div
                key={cert.level}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className={`p-4 text-center ${
                  cert.color === "yellow" ? "bg-yellow-400" :
                  cert.color === "slate" ? "bg-slate-400" :
                  "bg-amber-400"
                }`}>
                  <span className="text-4xl">{cert.icon}</span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {cert.level}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {cert.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-amber-500 mt-0.5">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {cert.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {ben}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Badge */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Badge
                </h2>
                <p className="text-gray-700 mb-4">
                  Certified companies receive a digital badge to display on:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Career pages and job postings</li>
                  <li>• Company website</li>
                  <li>• Social media profiles</li>
                  <li>• Email signatures</li>
                  <li>• Office signage</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-5xl">🐾</span>
                  </div>
                  <div className="font-bold text-gray-900">Foster Friendly</div>
                  <div className="text-sm text-gray-500">Certified Workplace</div>
                  <div className="text-xs text-amber-600 mt-1">2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Apply for Certification
            </h2>
            <p className="text-gray-600 mb-6">
              Tell us about your company and current policies. We&apos;ll help you
              understand which level you qualify for and what steps to take.
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees *
                  </label>
                  <select
                    required
                    value={formData.employeeCount}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeCount: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select size</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1000+">1,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, contactTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., HR Manager, Office Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Pet/Foster Policies
                </label>
                <textarea
                  value={formData.currentPolicies}
                  onChange={(e) =>
                    setFormData({ ...formData, currentPolicies: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Do you allow pets in office? Flexible scheduling? Remote work? Any existing support for pet owners?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why are you interested in this certification?
                </label>
                <textarea
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Employee request? CSR initiative? Personal passion?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Is there a cost for certification?
              </h3>
              <p className="text-gray-600 text-sm">
                No! Certification is free. We want to remove all barriers to companies
                supporting foster care. We simply ask that you maintain your commitment
                to the certification requirements.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                How long does certification last?
              </h3>
              <p className="text-gray-600 text-sm">
                Certification is valid for one year. We&apos;ll reach out annually to
                confirm your policies are still in place and renew your certification.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Can remote companies be certified?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely! Remote-friendly workplaces are inherently foster-friendly.
                We&apos;ll work with you to identify other ways to support employee fosters,
                like supply stipends or flexible scheduling.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                What if we don&apos;t meet all requirements yet?
              </h3>
              <p className="text-gray-600 text-sm">
                Apply anyway! We&apos;ll help you understand what changes would be needed
                and can provide resources to help you make the case internally.
                Many companies start at Certified and work toward Silver or Gold.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
