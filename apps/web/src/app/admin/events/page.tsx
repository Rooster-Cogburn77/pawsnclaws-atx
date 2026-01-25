"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface EventSignup {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  signups: EventSignup[];
}

export default function AdminEventsPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [events] = useState<Event[]>([
    // Demo data
    {
      id: "1",
      title: "Colony Care Saturday",
      date: "2025-02-01",
      signups: [
        { id: "1", event_id: "1", name: "John Doe", email: "john@example.com", status: "registered", created_at: "2025-01-20" },
        { id: "2", event_id: "1", name: "Jane Smith", email: "jane@example.com", phone: "(512) 555-0123", status: "registered", created_at: "2025-01-21" },
      ],
    },
    {
      id: "2",
      title: "TNR Clinic Volunteer Day",
      date: "2025-02-08",
      signups: [
        { id: "3", event_id: "2", name: "Bob Wilson", email: "bob@example.com", status: "registered", created_at: "2025-01-22" },
      ],
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      alert("Invalid password");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setIsAuthed(true);
    }
  }, []);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
          />
          <button type="submit" className="w-full px-4 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-amber-600 hover:underline text-sm mb-2 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Event Signups</h1>
          </div>
        </div>

        {/* Events List */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-gray-900">{event.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                  {event.signups.length} signups
                </span>
              </div>

              {event.signups.length > 0 ? (
                <div className="space-y-2">
                  {event.signups.slice(0, 3).map((signup) => (
                    <div key={signup.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium text-gray-900">{signup.name}</span>
                        <span className="text-gray-500 ml-2">{signup.email}</span>
                      </div>
                      <span className="text-xs text-green-600">{signup.status}</span>
                    </div>
                  ))}
                  {event.signups.length > 3 && (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-sm text-amber-600 hover:underline"
                    >
                      View all {event.signups.length} signups &rarr;
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No signups yet</p>
              )}

              <div className="mt-4 pt-4 border-t flex gap-2">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex-1 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    const csv = [
                      ["Name", "Email", "Phone", "Status", "Signed Up"],
                      ...event.signups.map((s) => [s.name, s.email, s.phone || "", s.status, s.created_at]),
                    ]
                      .map((row) => row.join(","))
                      .join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${event.title.toLowerCase().replace(/\s+/g, "-")}-signups.csv`;
                    a.click();
                  }}
                  className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Export CSV
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500">No events found</p>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <p className="text-sm text-gray-500">
                  {selectedEvent.signups.length} registered
                </p>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">Phone</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.signups.map((signup) => (
                    <tr key={signup.id} className="border-b">
                      <td className="py-3 font-medium text-gray-900">{signup.name}</td>
                      <td className="py-3">
                        <a href={`mailto:${signup.email}`} className="text-amber-600 hover:underline">
                          {signup.email}
                        </a>
                      </td>
                      <td className="py-3 text-gray-600">{signup.phone || "—"}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {signup.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
