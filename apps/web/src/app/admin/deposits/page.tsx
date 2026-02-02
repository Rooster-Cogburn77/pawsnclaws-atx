"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks";

const sampleApplications = [
  {
    id: "1",
    applicant_name: "Maria Garcia",
    applicant_email: "maria@example.com",
    applicant_phone: "512-555-9999",
    pet_name: "Luna",
    pet_species: "dog",
    deposit_amount: 40000, // cents
    status: "pending",
    created_at: "2025-01-22",
  },
  {
    id: "2",
    applicant_name: "James Wilson",
    applicant_email: "james@example.com",
    applicant_phone: "512-555-8888",
    pet_name: "Whiskers",
    pet_species: "cat",
    deposit_amount: 25000,
    status: "approved",
    created_at: "2025-01-18",
  },
];

export default function AdminDepositsPage() {
  const { isAuthed } = useAdminAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "denied">("all");

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  const filteredApps = sampleApplications.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deposit Assistance Applications</h1>
            <p className="text-gray-600">Review pet deposit loan requests</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "pending", "approved", "denied"] as const).map((status) => (
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
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Applicant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Pet</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{app.applicant_name}</span>
                    <div className="text-xs text-gray-500">{app.applicant_email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{app.pet_name}</span>
                    <span className="text-xs text-gray-500 ml-2">({app.pet_species})</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    ${(app.deposit_amount / 100).toFixed(0)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Approve
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-gray-500">No applications found</div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase to manage real applications.
        </div>
      </div>
    </div>
  );
}
