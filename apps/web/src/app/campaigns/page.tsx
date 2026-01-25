"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatAmount } from "@/lib/stripe";
import { AlertIcon, HeartIcon } from "@/components/Icons";

// Demo campaigns - will come from Supabase
const demoCampaigns = [
  {
    id: "1",
    title: "Luna's Emergency Surgery",
    description:
      "Luna is a sweet 3-year-old tabby found with a broken leg. She needs surgery to walk again. Help us give Luna a second chance!",
    goal_amount: 150000, // $1500
    raised_amount: 89500,
    image_url: "/campaigns/luna.jpg",
    urgent: true,
    status: "active" as const,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Riverside Colony - Winter Food Drive",
    description:
      "The Riverside colony has 23 cats who need food through the winter months. Help us keep them fed and healthy.",
    goal_amount: 50000, // $500
    raised_amount: 32000,
    image_url: "/campaigns/colony.jpg",
    urgent: false,
    status: "active" as const,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "TNR Blitz - South Austin",
    description:
      "We have 15 cats scheduled for TNR surgery this month. Help us cover the costs and stabilize this growing colony.",
    goal_amount: 75000, // $750
    raised_amount: 75000,
    image_url: "/campaigns/tnr.jpg",
    urgent: false,
    status: "funded" as const,
    created_at: new Date().toISOString(),
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(demoCampaigns);
  const [filter, setFilter] = useState<"all" | "urgent" | "funded">("all");

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "urgent") return c.urgent && c.status === "active";
    if (filter === "funded") return c.status === "funded";
    return c.status === "active";
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency Fund Campaigns
          </h1>
          <p className="text-xl text-gray-600">
            These animals need your help right now. 100% of donations go
            directly to their care.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto flex justify-center gap-2">
          {[
            { key: "all", label: "Active" },
            { key: "urgent", label: "🚨 Urgent" },
            { key: "funded", label: "✅ Funded" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === f.key
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700 hover:bg-amber-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Request Help CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
            <AlertIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help With a Vet Bill?
            </h2>
            <p className="text-gray-600 mb-6">
              If you&apos;re facing an emergency vet bill you can&apos;t afford, we may be
              able to help. Apply for emergency assistance.
            </p>
            <Link
              href="/help/vet-fund"
              className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
            >
              Apply for Assistance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: (typeof demoCampaigns)[0] }) {
  const progress = Math.min(
    100,
    Math.round((campaign.raised_amount / campaign.goal_amount) * 100)
  );
  const isFunded = campaign.status === "funded";

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        campaign.urgent && !isFunded ? "ring-2 ring-red-500" : ""
      }`}
    >
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-200 to-amber-300 relative">
        {campaign.urgent && !isFunded && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            🚨 URGENT
          </span>
        )}
        {isFunded && (
          <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">✅ FUNDED!</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
          🐱
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-900">
              {formatAmount(campaign.raised_amount)} raised
            </span>
            <span className="text-gray-500">
              of {formatAmount(campaign.goal_amount)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isFunded ? "bg-green-500" : "bg-amber-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">
            {progress}% funded
          </div>
        </div>

        {!isFunded && (
          <Link
            href={`/donate?campaign=${campaign.id}`}
            className="block w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-center font-medium rounded-lg transition-colors"
          >
            Donate Now
          </Link>
        )}
      </div>
    </div>
  );
}
