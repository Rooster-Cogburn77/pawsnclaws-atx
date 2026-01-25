"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sampleReports = [
  {
    id: "1",
    type: "lost",
    species: "dog",
    breed: "Golden Retriever",
    name: "Buddy",
    color: "Golden",
    location: "Zilker Park area",
    contact_name: "John Smith",
    contact_phone: "512-555-1111",
    description: "Friendly, responds to name, wearing blue collar",
    status: "active",
    created_at: "2025-01-23",
  },
  {
    id: "2",
    type: "found",
    species: "cat",
    breed: "Tabby",
    name: null,
    color: "Orange and white",
    location: "Near UT campus, 24th St",
    contact_name: "Sarah Johnson",
    contact_phone: "512-555-2222",
    description: "Very friendly, no collar, appears well-fed",
    status: "active",
    created_at: "2025-01-22",
  },
  {
    id: "3",
    type: "lost",
    species: "cat",
    breed: "Siamese",
    name: "Mochi",
    color: "Cream with dark points",
    location: "South Congress",
    contact_name: "Lisa Chen",
    contact_phone: "512-555-3333",
    description: "Indoor cat, may be scared, microchipped",
    status: "reunited",
    created_at: "2025-01-20",
  },
];

export default function AdminLostFoundPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "lost" | "found" | "reunited">("all");

  useEffect(() => {
    const authToken = sessionStorage.getItem("adminAuth");
    if (authToken === "authenticated") {
      setIsAuthed(true);
    } else {
      window.location.href = "/admin";
    }
  }, []);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  const filteredReports = sampleReports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "reunited") return r.status === "reunited";
    return r.type === filter && r.status === "active";
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lost & Found Reports</h1>
            <p className="text-gray-600">Manage pet reports and help reunite families</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{sampleReports.filter(r => r.type === "lost" && r.status === "active").length}</div>
            <div className="text-sm text-gray-600">Active Lost</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{sampleReports.filter(r => r.type === "found" && r.status === "active").length}</div>
            <div className="text-sm text-gray-600">Active Found</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleReports.filter(r => r.status === "reunited").length}</div>
            <div className="text-sm text-gray-600">Reunited</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Potential Matches</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "lost", "found", "reunited"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{report.species === "cat" ? "🐱" : "🐶"}</span>
                  <div>
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded ${
                        report.type === "lost"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {report.type.toUpperCase()}
                    </span>
                    {report.name && (
                      <span className="ml-2 font-bold text-gray-900">{report.name}</span>
                    )}
                  </div>
                </div>
                {report.status === "reunited" && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                    Reunited!
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p><strong>Breed:</strong> {report.breed}</p>
                <p><strong>Color:</strong> {report.color}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p className="text-gray-600">{report.description}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <div className="text-xs text-gray-500">
                  <p>{report.contact_name}</p>
                  <p>{report.contact_phone}</p>
                </div>
                <div className="space-x-2">
                  {report.status === "active" && (
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Mark Reunited
                    </button>
                  )}
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            No reports found
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase to manage real reports. Matching algorithm coming soon.
        </div>
      </div>
    </div>
  );
}
