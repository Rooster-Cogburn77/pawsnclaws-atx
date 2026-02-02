"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks";

const sampleDonations = [
  {
    id: "1",
    donor_name: "Anonymous",
    donor_email: null,
    amount: 10000, // cents
    type: "one_time",
    campaign: null,
    message: null,
    is_anonymous: true,
    status: "completed",
    created_at: "2025-01-23T14:30:00",
  },
  {
    id: "2",
    donor_name: "Emily Watson",
    donor_email: "emily@example.com",
    amount: 5000,
    type: "recurring",
    campaign: null,
    message: "Keep up the great work!",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-01-22T09:15:00",
  },
  {
    id: "3",
    donor_name: "James Patterson",
    donor_email: "james@example.com",
    amount: 25000,
    type: "one_time",
    campaign: "Emergency Vet Fund - Whiskers",
    message: "Hope Whiskers gets better soon!",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-01-21T16:45:00",
  },
  {
    id: "4",
    donor_name: "Sarah Miller",
    donor_email: "sarah@example.com",
    amount: 7500,
    type: "recurring",
    campaign: "Colony Care - North Loop",
    message: null,
    is_anonymous: false,
    status: "completed",
    created_at: "2025-01-20T11:20:00",
  },
  {
    id: "5",
    donor_name: "Tech Corp Inc",
    donor_email: "giving@techcorp.com",
    amount: 100000,
    type: "one_time",
    campaign: null,
    message: "Corporate matching gift",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-01-19T10:00:00",
  },
];

const sampleSubscriptions = [
  {
    id: "1",
    donor_name: "Emily Watson",
    donor_email: "emily@example.com",
    amount: 5000,
    interval: "month",
    status: "active",
    created_at: "2025-01-01",
  },
  {
    id: "2",
    donor_name: "Sarah Miller",
    donor_email: "sarah@example.com",
    amount: 7500,
    interval: "month",
    status: "active",
    created_at: "2024-12-15",
  },
  {
    id: "3",
    donor_name: "Robert Chen",
    donor_email: "robert@example.com",
    amount: 2500,
    interval: "month",
    status: "active",
    created_at: "2024-11-20",
  },
];

export default function AdminDonationsPage() {
  const { isAuthed } = useAdminAuth();
  const [view, setView] = useState<"recent" | "recurring">("recent");

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  const totalDonations = sampleDonations.reduce((sum, d) => sum + d.amount, 0);
  const monthlyRecurring = sampleSubscriptions.filter(s => s.status === "active").reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
            <p className="text-gray-600">Track donations and manage recurring giving</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">${(totalDonations / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{sampleDonations.length}</div>
            <div className="text-sm text-gray-600">Donations</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">${(monthlyRecurring / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Recurring</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{sampleSubscriptions.filter(s => s.status === "active").length}</div>
            <div className="text-sm text-gray-600">Active Subscribers</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView("recent")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "recent"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Recent Donations
          </button>
          <button
            onClick={() => setView("recurring")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "recurring"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Recurring Donors
          </button>
        </div>

        {view === "recent" ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Donor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Campaign</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sampleDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {donation.is_anonymous ? "Anonymous" : donation.donor_name}
                      </span>
                      {donation.message && (
                        <p className="text-xs text-gray-500 mt-1 italic">&ldquo;{donation.message}&rdquo;</p>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">
                      ${(donation.amount / 100).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        donation.type === "recurring"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {donation.type === "recurring" ? "Monthly" : "One-time"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {donation.campaign || "General Fund"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Donor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Monthly Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Annual Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Since</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sampleSubscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{sub.donor_name}</span>
                      <p className="text-xs text-gray-500">{sub.donor_email}</p>
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">
                      ${(sub.amount / 100).toLocaleString()}/mo
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      ${((sub.amount * 12) / 100).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Stripe to see real donation data.
        </div>
      </div>
    </div>
  );
}
