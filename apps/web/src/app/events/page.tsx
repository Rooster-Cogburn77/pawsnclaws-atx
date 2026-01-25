"use client";

import { useState } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  spots: number | null;
}

// Sample events - will be dynamic from Supabase
const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Colony Care Saturday",
    date: "2025-02-01",
    time: "9:00 AM - 12:00 PM",
    location: "North Loop Colony Site",
    type: "volunteer",
    description: "Help us feed and check on our managed cat colonies. Training provided for new volunteers.",
    spots: 8,
  },
  {
    id: "2",
    title: "TNR Clinic Volunteer Day",
    date: "2025-02-08",
    time: "7:00 AM - 3:00 PM",
    location: "Emancipet North",
    type: "volunteer",
    description: "Assist with our monthly TNR clinic. Tasks include trap transport, recovery monitoring, and more.",
    spots: 12,
  },
  {
    id: "3",
    title: "Pet Food Distribution",
    date: "2025-02-15",
    time: "10:00 AM - 2:00 PM",
    location: "Del Valle Community Center",
    type: "community",
    description: "Free pet food distribution for families in need. No paperwork required.",
    spots: null,
  },
  {
    id: "4",
    title: "Foster Orientation",
    date: "2025-02-22",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual (Zoom)",
    type: "training",
    description: "Learn everything you need to know about becoming a foster. Required for new fosters.",
    spots: 20,
  },
];

const pastEvents = [
  {
    title: "Holiday Adoption Event",
    date: "2024-12-14",
    description: "23 animals found homes!",
  },
  {
    title: "Winter Coat Drive",
    date: "2024-11-30",
    description: "Collected 150+ pet coats and blankets.",
  },
];

const eventTypeColors: Record<string, string> = {
  volunteer: "bg-green-100 text-green-700",
  community: "bg-blue-100 text-blue-700",
  training: "bg-purple-100 text-purple-700",
  adoption: "bg-pink-100 text-pink-700",
  fundraiser: "bg-amber-100 text-amber-700",
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/events/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          eventDate: new Date(selectedEvent.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }) + " at " + selectedEvent.time,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're signed up!");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setFormData({ name: "", email: "", phone: "" });
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📅</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upcoming Events
          </h1>
          <p className="text-gray-600">
            Join us at community events, volunteer days, and training sessions.
          </p>
        </div>

        {/* Event Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Volunteer
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Community
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            Training
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
            Adoption
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            Fundraiser
          </span>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4 mb-12">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        eventTypeColors[event.type]
                      }`}
                    >
                      {event.type}
                    </span>
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🕐</span>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {event.spots && (
                    <span className="text-xs text-gray-500">
                      {event.spots} spots available
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md mb-12">
            <span className="text-4xl mb-4 block">📭</span>
            <p className="text-gray-600">No upcoming events scheduled.</p>
            <p className="text-sm text-gray-500 mt-2">
              Check back soon or sign up for our newsletter!
            </p>
          </div>
        )}

        {/* Past Events */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Recent Events</h2>
          <div className="space-y-3">
            {pastEvents.map((event, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-700">{event.title}</span>
                  <p className="text-xs text-gray-500">{event.description}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Host Event CTA */}
        <div className="bg-amber-100 rounded-xl p-6 text-center">
          <h3 className="font-bold text-amber-900 mb-2">
            Want to Host an Event?
          </h3>
          <p className="text-sm text-amber-800 mb-4">
            Have a venue or idea for an adoption event, fundraiser, or community
            gathering? Let&apos;s talk!
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Signup Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Sign Up for Event
                  </h2>
                  <p className="text-sm text-gray-600">{selectedEvent.title}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Event Details */}
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🕐</span>
                    {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    {selectedEvent.location}
                  </span>
                </div>
              </div>

              {status === "success" ? (
                <div className="text-center py-6">
                  <span className="text-4xl block mb-4">✓</span>
                  <p className="text-green-700 font-medium mb-2">{message}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Check your email for confirmation details.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Signing up..." : "Confirm Signup"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
