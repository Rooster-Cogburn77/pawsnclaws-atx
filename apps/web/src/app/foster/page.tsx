"use client";

import { useState } from "react";
import Link from "next/link";

const fosterBenefits = [
  {
    emoji: "🏥",
    title: "We Cover Vet Care",
    description: "All medical expenses, vaccinations, and spay/neuter are covered.",
  },
  {
    emoji: "🍲",
    title: "Food & Supplies Provided",
    description: "We provide food, litter, crates, beds - everything you need.",
  },
  {
    emoji: "📞",
    title: "24/7 Support",
    description: "Our team is always available to answer questions and help.",
  },
  {
    emoji: "💕",
    title: "Save Lives",
    description: "Every foster home opens a shelter spot for another animal in need.",
  },
];

const fosterTypes = [
  {
    id: "short-term",
    title: "Short-Term Foster",
    duration: "1-2 weeks",
    description: "Perfect for vacations, emergencies, or trying fostering for the first time.",
    ideal: "Great for: Beginners, busy schedules",
  },
  {
    id: "medical",
    title: "Medical Foster",
    duration: "2-6 weeks",
    description: "Care for animals recovering from surgery or illness. Training provided.",
    ideal: "Great for: Those with some pet experience",
  },
  {
    id: "socialization",
    title: "Socialization Foster",
    duration: "2-4 weeks",
    description: "Help shy or undersocialized pets learn to trust humans.",
    ideal: "Great for: Patient, calm households",
  },
  {
    id: "bottle-baby",
    title: "Bottle Baby Foster",
    duration: "4-8 weeks",
    description: "Care for orphaned kittens or puppies. Requires feeding every 2-4 hours.",
    ideal: "Great for: Work-from-home, flexible schedules",
  },
  {
    id: "hospice",
    title: "Hospice Foster",
    duration: "Varies",
    description: "Provide comfort and love to pets in their final days or weeks.",
    ideal: "Great for: Compassionate souls, experienced pet owners",
  },
];

export default function FosterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fosterType: [] as string[],
    hasOtherPets: "",
    hasKids: "",
    housingType: "",
    experience: "",
    whyFoster: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFosterType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      fosterType: prev.fosterType.includes(typeId)
        ? prev.fosterType.filter((t) => t !== typeId)
        : [...prev.fosterType, typeId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/foster", {
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
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in fostering! We&apos;ll review your
            application and contact you within 2-3 business days to discuss
            next steps.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            In the meantime, join our Foster Facebook group to connect with
            other fosters and see available animals.
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🏠</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Foster
          </h1>
          <p className="text-gray-600">
            Open your home, save a life. Fostering is one of the most impactful
            ways to help animals in need.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {fosterBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 text-center"
            >
              <span className="text-3xl mb-2 block">{benefit.emoji}</span>
              <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Foster Types */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Types of Fostering
          </h2>
          <div className="space-y-4">
            {fosterTypes.map((type) => (
              <div
                key={type.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-amber-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{type.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {type.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                <p className="text-xs text-amber-600">{type.ideal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Foster Application
          </h2>

          <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
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
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">
            What type of fostering interests you?
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {fosterTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleFosterType(type.id)}
                className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                  formData.fosterType.includes(type.id)
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <span className="font-medium">{type.title}</span>
                <span className="text-gray-500 block text-xs">
                  {type.duration}
                </span>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-gray-900 mb-4">About Your Home</h3>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other pets in home?
                </label>
                <select
                  value={formData.hasOtherPets}
                  onChange={(e) =>
                    setFormData({ ...formData, hasOtherPets: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="none">No pets</option>
                  <option value="dogs">Dogs only</option>
                  <option value="cats">Cats only</option>
                  <option value="both">Dogs and cats</option>
                  <option value="other">Other pets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Children in home?
                </label>
                <select
                  value={formData.hasKids}
                  onChange={(e) =>
                    setFormData({ ...formData, hasKids: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="none">No children</option>
                  <option value="under5">Under 5 years</option>
                  <option value="5to12">5-12 years</option>
                  <option value="teens">Teenagers</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Housing type
              </label>
              <select
                value={formData.housingType}
                onChange={(e) =>
                  setFormData({ ...formData, housingType: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="house-owned">House (owned)</option>
                <option value="house-rented">House (rented)</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo/Townhouse</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Tell us about your experience with pets..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to foster?
              </label>
              <textarea
                value={formData.whyFoster}
                onChange={(e) =>
                  setFormData({ ...formData, whyFoster: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="What draws you to fostering?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">
                What if I fall in love and want to adopt?
              </p>
              <p className="text-gray-600">
                Foster fails are celebrated! You&apos;ll have first dibs on adopting
                your foster pet.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                What if it doesn&apos;t work out?
              </p>
              <p className="text-gray-600">
                No guilt! We&apos;ll find another placement. Your wellbeing matters
                too.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Can I foster if I rent?
              </p>
              <p className="text-gray-600">
                Yes! We just need landlord approval (we can help with that).
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                How long until I get my first foster?
              </p>
              <p className="text-gray-600">
                After approval and orientation (usually 1-2 weeks), you could
                have a foster within days!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
