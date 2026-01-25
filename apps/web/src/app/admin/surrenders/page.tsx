"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sampleCases = [
  {
    id: "1",
    contact_name: "Emily Brown",
    contact_phone: "512-555-1111",
    pet_info: "Golden Retriever, 5 years old, named Max",
    reason: "Housing issues - moving to no-pets apartment",
    status: "new",
    timeline: "urgent",
    created_at: "2025-01-23",
  },
  {
    id: "2",
    contact_name: "David Lee",
    contact_phone: "512-555-2222",
    pet_info: "2 cats, both 3 years old",
    reason: "Financial - lost job, can't afford food/vet",
    status: "in_progress",
    timeline: "soon",
    created_at: "2025-01-20",
  },
];

export default function AdminSurrendersPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "new" | "in_progress" | "resolved">("all");

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

  const filteredCases = sampleCases.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Surrender Prevention Cases</h1>
            <p className="text-gray-600">Help families keep their pets</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "new", "in_progress", "resolved"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{caseItem.contact_name}</h3>
                    {caseItem.timeline === "urgent" && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{caseItem.contact_phone}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    caseItem.status === "new"
                      ? "bg-amber-100 text-amber-700"
                      : caseItem.status === "in_progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {caseItem.status === "in_progress" ? "In Progress" : caseItem.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Pet Info:</p>
                <p className="text-gray-600">{caseItem.pet_info}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
                <p className="text-gray-600">{caseItem.reason}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-gray-500">
                  Received: {new Date(caseItem.created_at).toLocaleDateString()}
                </span>
                <div className="space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Take Case
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            No cases found
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase to manage real cases.
        </div>
      </div>
    </div>
  );
}
