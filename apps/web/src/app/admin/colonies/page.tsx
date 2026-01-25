"use client";

import { useState } from "react";
import Link from "next/link";

interface ColonySubmission {
  id: string;
  colonyName: string;
  locationDescription: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  estimatedCats: number;
  tnrStatus: string;
  hasCaretaker: string;
  caretakerContact?: string;
  feedingSchedule?: string;
  urgentNeeds: string[];
  additionalInfo?: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone?: string;
  submitterRelation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewNotes?: string;
}

// Demo data - will come from Supabase
const demoSubmissions: ColonySubmission[] = [
  {
    id: "1",
    colonyName: "East Riverside Cats",
    locationDescription: "Behind the apartment complex on East Riverside, near the creek. Cats gather around the dumpster area.",
    address: "1200 E Riverside Dr",
    latitude: 30.2398,
    longitude: -97.7273,
    estimatedCats: 12,
    tnrStatus: "partial",
    hasCaretaker: "yes",
    feedingSchedule: "Daily at 7am",
    urgentNeeds: ["tnr-needed", "shelter"],
    additionalInfo: "About 8 cats are fixed (ear-tipped). 4 new cats appeared recently and need TNR.",
    submitterName: "Jane Doe",
    submitterEmail: "jane@example.com",
    submitterPhone: "512-555-0123",
    submitterRelation: "caretaker",
    status: "pending",
    createdAt: "2026-01-24T10:30:00Z",
  },
  {
    id: "2",
    colonyName: "",
    locationDescription: "Small group of cats in the parking lot of the abandoned building on N Lamar",
    estimatedCats: 5,
    tnrStatus: "unknown",
    hasCaretaker: "no",
    urgentNeeds: ["food-needed", "caretaker"],
    submitterName: "John Smith",
    submitterEmail: "john@example.com",
    submitterRelation: "observer",
    status: "pending",
    createdAt: "2026-01-23T15:45:00Z",
  },
];

export default function AdminColoniesPage() {
  const [submissions] = useState<ColonySubmission[]>(demoSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<ColonySubmission | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [reviewNotes, setReviewNotes] = useState("");

  const filteredSubmissions = submissions.filter(
    (s) => filter === "all" || s.status === filter
  );

  const handleApprove = async (id: string) => {
    // In production: update Supabase, move to colonies table
    console.log("Approving colony:", id, "Notes:", reviewNotes);
    alert("Colony approved! (Demo - would save to database)");
    setSelectedSubmission(null);
    setReviewNotes("");
  };

  const handleReject = async (id: string) => {
    // In production: update status in Supabase
    console.log("Rejecting colony:", id, "Notes:", reviewNotes);
    alert("Colony rejected. (Demo - would update database)");
    setSelectedSubmission(null);
    setReviewNotes("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const urgentNeedLabels: Record<string, string> = {
    "tnr-needed": "TNR Needed",
    "food-needed": "Food Needed",
    "medical": "Medical Attention",
    "shelter": "Shelter Needed",
    "caretaker": "Needs Caretaker",
    "threatened": "Colony Threatened",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-amber-600 hover:text-amber-700 text-sm">
                ← Back to Admin
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Colony Submissions
              </h1>
            </div>
            <div className="flex gap-2">
              {(["pending", "approved", "rejected", "all"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                    filter === status
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                  {status === "pending" && (
                    <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {submissions.filter((s) => s.status === "pending").length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900">
              {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)} Submissions
              ({filteredSubmissions.length})
            </h2>

            {filteredSubmissions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <span className="text-4xl mb-4 block">📭</span>
                <p className="text-gray-600">No {filter} submissions</p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
                    selectedSubmission?.id === submission.id ? "ring-2 ring-amber-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {submission.colonyName || "Unnamed Colony"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {submission.estimatedCats} cats • {submission.tnrStatus} TNR
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        submission.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : submission.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {submission.locationDescription}
                  </p>
                  {submission.urgentNeeds.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {submission.urgentNeeds.map((need) => (
                        <span
                          key={need}
                          className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full"
                        >
                          {urgentNeedLabels[need] || need}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Submitted {formatDate(submission.createdAt)} by {submission.submitterName}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {selectedSubmission ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedSubmission.colonyName || "Unnamed Colony"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Submitted {formatDate(selectedSubmission.createdAt)}
                  </p>
                </div>

                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Location */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{selectedSubmission.locationDescription}</p>
                    {selectedSubmission.address && (
                      <p className="text-sm text-gray-500 mt-1">
                        Address: {selectedSubmission.address}
                      </p>
                    )}
                    {selectedSubmission.latitude && selectedSubmission.longitude && (
                      <p className="text-sm text-gray-500">
                        Coords: {selectedSubmission.latitude}, {selectedSubmission.longitude}
                        <a
                          href={`https://www.google.com/maps?q=${selectedSubmission.latitude},${selectedSubmission.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-amber-600 hover:underline"
                        >
                          View on Map →
                        </a>
                      </p>
                    )}
                  </div>

                  {/* Colony Details */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Colony Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Estimated Cats:</span>
                        <span className="ml-2 font-medium">{selectedSubmission.estimatedCats}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">TNR Status:</span>
                        <span className="ml-2 font-medium capitalize">{selectedSubmission.tnrStatus}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Has Caretaker:</span>
                        <span className="ml-2 font-medium capitalize">{selectedSubmission.hasCaretaker}</span>
                      </div>
                      {selectedSubmission.feedingSchedule && (
                        <div>
                          <span className="text-gray-500">Feeding:</span>
                          <span className="ml-2 font-medium">{selectedSubmission.feedingSchedule}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Urgent Needs */}
                  {selectedSubmission.urgentNeeds.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Urgent Needs</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.urgentNeeds.map((need) => (
                          <span
                            key={need}
                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                          >
                            {urgentNeedLabels[need] || need}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  {selectedSubmission.additionalInfo && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Additional Info</h3>
                      <p className="text-gray-700 text-sm">{selectedSubmission.additionalInfo}</p>
                    </div>
                  )}

                  {/* Submitter */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Submitter</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="text-gray-500">Name:</span> {selectedSubmission.submitterName}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedSubmission.submitterEmail}</p>
                      {selectedSubmission.submitterPhone && (
                        <p><span className="text-gray-500">Phone:</span> {selectedSubmission.submitterPhone}</p>
                      )}
                      <p><span className="text-gray-500">Relationship:</span> {selectedSubmission.submitterRelation}</p>
                    </div>
                  </div>

                  {/* Caretaker Contact */}
                  {selectedSubmission.caretakerContact && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Caretaker Contact</h3>
                      <p className="text-gray-700 text-sm">{selectedSubmission.caretakerContact}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {selectedSubmission.status === "pending" && (
                  <div className="p-6 border-t bg-gray-50">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review Notes (internal)
                      </label>
                      <textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:outline-none resize-none"
                        rows={2}
                        placeholder="Optional notes about this submission..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(selectedSubmission.id)}
                        className="flex-1 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve & Add to Map
                      </button>
                      <button
                        onClick={() => handleReject(selectedSubmission.id)}
                        className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <span className="text-4xl mb-4 block">👈</span>
                <p className="text-gray-600">Select a submission to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
