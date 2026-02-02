"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks";

const sampleInquiries = [
  {
    id: "1",
    company_name: "Austin Pet Supply Co",
    contact_name: "Michael Brown",
    contact_email: "michael@austinpetsupply.com",
    contact_phone: "512-555-9999",
    tier_interest: "gold",
    message: "We'd love to sponsor and also potentially do in-kind donations of pet food.",
    status: "new",
    created_at: "2025-01-22",
  },
  {
    id: "2",
    company_name: "Barking Good Brewery",
    contact_name: "Ashley Martinez",
    contact_email: "ashley@barkinggood.com",
    contact_phone: "512-555-8888",
    tier_interest: "silver",
    message: "Interested in the round-up program and potentially hosting adoption events.",
    status: "contacted",
    created_at: "2025-01-20",
  },
];

const sampleSponsors = [
  {
    id: "1",
    company_name: "Central Texas Veterinary Specialty",
    tier: "platinum",
    monthly_amount: 100000, // cents
    is_active: true,
    joined_at: "2024-11-01",
  },
  {
    id: "2",
    company_name: "Tomlinson's Feed",
    tier: "gold",
    monthly_amount: 50000,
    is_active: true,
    joined_at: "2024-12-15",
  },
  {
    id: "3",
    company_name: "East Side Pies",
    tier: "bronze",
    monthly_amount: 10000,
    is_active: true,
    joined_at: "2025-01-01",
  },
];

const tierColors: Record<string, string> = {
  platinum: "bg-purple-100 text-purple-700",
  gold: "bg-amber-100 text-amber-700",
  silver: "bg-gray-200 text-gray-700",
  bronze: "bg-orange-100 text-orange-700",
};

export default function AdminSponsorsPage() {
  const { isAuthed } = useAdminAuth();
  const [view, setView] = useState<"inquiries" | "sponsors">("inquiries");

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  const totalMonthly = sampleSponsors.reduce((sum, s) => sum + s.monthly_amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Corporate Sponsors</h1>
            <p className="text-gray-600">Manage sponsor relationships and inquiries</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{sampleInquiries.filter(i => i.status === "new").length}</div>
            <div className="text-sm text-gray-600">New Inquiries</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{sampleSponsors.filter(s => s.is_active).length}</div>
            <div className="text-sm text-gray-600">Active Sponsors</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">${(totalMonthly / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">${((totalMonthly * 12) / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Annual Value</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView("inquiries")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "inquiries"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Inquiries ({sampleInquiries.length})
          </button>
          <button
            onClick={() => setView("sponsors")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "sponsors"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Active Sponsors ({sampleSponsors.length})
          </button>
        </div>

        {view === "inquiries" ? (
          <div className="space-y-4">
            {sampleInquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{inquiry.company_name}</h3>
                    <p className="text-sm text-gray-500">{inquiry.contact_name} • {inquiry.contact_email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${tierColors[inquiry.tier_interest]}`}>
                      {inquiry.tier_interest} interest
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {inquiry.status === "new" ? "New" : "Contacted"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{inquiry.message}</p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-gray-500">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                  <div className="space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Convert to Sponsor
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tier</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Monthly</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Since</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sampleSponsors.map((sponsor) => (
                  <tr key={sponsor.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{sponsor.company_name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${tierColors[sponsor.tier]}`}>
                        {sponsor.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">${(sponsor.monthly_amount / 100).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{new Date(sponsor.joined_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Sample data shown. Connect Supabase and Stripe to manage real sponsors.
        </div>
      </div>
    </div>
  );
}
