"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sampleFosters = [
  {
    id: "1",
    name: "Amanda Chen",
    email: "amanda@example.com",
    phone: "512-555-3333",
    fosterTypes: ["short-term", "medical"],
    status: "active",
    currentFoster: "Luna (cat)",
    created_at: "2025-01-10",
  },
  {
    id: "2",
    name: "Robert Martinez",
    email: "robert@example.com",
    phone: "512-555-4444",
    fosterTypes: ["bottle-baby", "kitten"],
    status: "pending",
    currentFoster: null,
    created_at: "2025-01-22",
  },
  {
    id: "3",
    name: "Jessica Taylor",
    email: "jess@example.com",
    phone: "512-555-5555",
    fosterTypes: ["socialization"],
    status: "active",
    currentFoster: "Max & Buddy (dogs)",
    created_at: "2024-12-15",
  },
];

export default function AdminFostersPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "active" | "inactive">("all");

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

  const filteredFosters = sampleFosters.filter((f) => {
    if (filter === "all") return true;
    return f.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Foster Homes</h1>
            <p className="text-gray-600">Manage foster applications and active fosters</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{sampleFosters.filter(f => f.status === "pending").length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleFosters.filter(f => f.status === "active").length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{sampleFosters.filter(f => f.currentFoster).length}</div>
            <div className="text-sm text-gray-600">Currently Fostering</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">--</div>
            <div className="text-sm text-gray-600">Animals Placed</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "pending", "active", "inactive"] as const).map((status) => (
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

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Foster</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Types</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Current</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFosters.map((foster) => (
                <tr key={foster.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{foster.name}</span>
                    <div className="text-xs text-gray-500">Since {new Date(foster.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">{foster.email}</div>
                    <div className="text-xs text-gray-500">{foster.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {foster.fosterTypes.map((type) => (
                        <span key={type} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {foster.currentFoster ? (
                      <span className="text-sm text-green-700 font-medium">{foster.currentFoster}</span>
                    ) : (
                      <span className="text-sm text-gray-400">Available</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        foster.status === "active"
                          ? "bg-green-100 text-green-700"
                          : foster.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {foster.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {foster.status === "pending" && (
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Approve
                      </button>
                    )}
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFosters.length === 0 && (
            <div className="text-center py-12 text-gray-500">No fosters found</div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase to manage real foster homes.
        </div>
      </div>
    </div>
  );
}
