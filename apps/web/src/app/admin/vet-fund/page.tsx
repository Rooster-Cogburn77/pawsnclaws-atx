"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sampleRequests = [
  {
    id: "1",
    pet_name: "Whiskers",
    species: "cat",
    owner_name: "Maria Santos",
    owner_email: "maria@example.com",
    owner_phone: "512-555-6666",
    vet_clinic: "Austin Vet Specialists",
    amount_requested: 85000, // cents
    diagnosis: "Emergency surgery - intestinal blockage",
    status: "pending",
    urgent: true,
    created_at: "2025-01-23",
  },
  {
    id: "2",
    pet_name: "Duke",
    species: "dog",
    owner_name: "Carlos Rivera",
    owner_email: "carlos@example.com",
    owner_phone: "512-555-7777",
    vet_clinic: "Emancipet",
    amount_requested: 35000,
    diagnosis: "Hip dysplasia treatment",
    status: "approved",
    urgent: false,
    created_at: "2025-01-20",
  },
  {
    id: "3",
    pet_name: "Mittens",
    species: "cat",
    owner_name: "Jennifer Lee",
    owner_email: "jen@example.com",
    owner_phone: "512-555-8888",
    vet_clinic: "Austin Humane Society",
    amount_requested: 15000,
    diagnosis: "Dental extraction",
    status: "funded",
    urgent: false,
    created_at: "2025-01-18",
  },
];

export default function AdminVetFundPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "funded" | "denied">("all");

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

  const filteredRequests = sampleRequests.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const totalRequested = sampleRequests.reduce((sum, r) => sum + r.amount_requested, 0);
  const totalFunded = sampleRequests.filter(r => r.status === "funded").reduce((sum, r) => sum + r.amount_requested, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vet Fund Requests</h1>
            <p className="text-gray-600">Emergency veterinary assistance applications</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{sampleRequests.filter(r => r.status === "pending").length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{sampleRequests.filter(r => r.urgent).length}</div>
            <div className="text-sm text-gray-600">Urgent Cases</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">${(totalFunded / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Funded</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">${(totalRequested / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Requested</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "pending", "approved", "funded", "denied"] as const).map((status) => (
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

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{request.species === "cat" ? "🐱" : "🐶"}</span>
                    <h3 className="font-bold text-gray-900">{request.pet_name}</h3>
                    {request.urgent && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Owner: {request.owner_name} • {request.owner_phone}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ${(request.amount_requested / 100).toLocaleString()}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      request.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : request.status === "approved"
                        ? "bg-blue-100 text-blue-700"
                        : request.status === "funded"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Diagnosis:</p>
                  <p className="text-gray-600">{request.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Vet Clinic:</p>
                  <p className="text-gray-600">{request.vet_clinic}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-gray-500">
                  Submitted: {new Date(request.created_at).toLocaleDateString()}
                </span>
                <div className="space-x-2">
                  {request.status === "pending" && (
                    <>
                      <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Approve
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Deny
                      </button>
                    </>
                  )}
                  {request.status === "approved" && (
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Mark Funded
                    </button>
                  )}
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            No requests found
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase to manage real vet fund requests.
        </div>
      </div>
    </div>
  );
}
