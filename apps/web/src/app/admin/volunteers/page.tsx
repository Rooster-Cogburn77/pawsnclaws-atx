"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Sample data (will be replaced with Supabase data)
const sampleVolunteers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "512-555-1234",
    interests: ["food-stations", "transport"],
    status: "pending",
    created_at: "2025-01-23",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "512-555-5678",
    interests: ["foster", "events"],
    status: "active",
    created_at: "2025-01-20",
  },
];

export default function AdminVolunteersPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "active">("all");

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

  const filteredVolunteers = sampleVolunteers.filter((v) => {
    if (filter === "all") return true;
    return v.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="text-gray-500 hover:text-gray-700"
          >
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
            <p className="text-gray-600">Review and manage volunteer signups</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "active"] as const).map((status) => (
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Interests
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Date
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      {volunteer.name}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">{volunteer.email}</div>
                    <div className="text-xs text-gray-500">{volunteer.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        volunteer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : volunteer.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(volunteer.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No volunteers found
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> This is showing sample data. Connect Supabase to see real volunteer applications.
        </div>
      </div>
    </div>
  );
}
