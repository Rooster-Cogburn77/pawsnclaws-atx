"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Simple password protection (replace with proper auth later)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";

const dashboardItems = [
  {
    title: "Volunteer Applications",
    emoji: "🤝",
    href: "/admin/volunteers",
    description: "Review and manage volunteer signups",
    count: 0,
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Foster Applications",
    emoji: "🏠",
    href: "/admin/fosters",
    description: "Foster home applications",
    count: 0,
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Deposit Assistance",
    emoji: "💰",
    href: "/admin/deposits",
    description: "Pet deposit loan applications",
    count: 0,
    color: "bg-amber-50 border-amber-200",
  },
  {
    title: "Surrender Prevention",
    emoji: "💕",
    href: "/admin/surrenders",
    description: "Surrender prevention cases",
    count: 0,
    color: "bg-pink-50 border-pink-200",
  },
  {
    title: "Vet Fund Requests",
    emoji: "🏥",
    href: "/admin/vet-fund",
    description: "Emergency vet fund applications",
    count: 0,
    color: "bg-red-50 border-red-200",
  },
  {
    title: "Lost & Found",
    emoji: "🔍",
    href: "/admin/lost-found",
    description: "Lost and found pet reports",
    count: 0,
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Sponsor Inquiries",
    emoji: "🏢",
    href: "/admin/sponsors",
    description: "Corporate sponsor inquiries",
    count: 0,
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    title: "Donations",
    emoji: "❤️",
    href: "/admin/donations",
    description: "View donation history",
    count: 0,
    color: "bg-rose-50 border-rose-200",
  },
];

export default function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated
    const authToken = sessionStorage.getItem("adminAuth");
    if (authToken === "authenticated") {
      setIsAuthed(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "authenticated");
      setIsAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Contact your administrator for access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage PawsNClaws ATX operations</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("adminAuth");
              setIsAuthed(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">--</div>
            <div className="text-sm text-gray-600">Pending Reviews</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">--</div>
            <div className="text-sm text-gray-600">Active Volunteers</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">--</div>
            <div className="text-sm text-gray-600">Open Cases</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">--</div>
            <div className="text-sm text-gray-600">This Month Donations</div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`${item.color} border-2 rounded-xl p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{item.emoji}</span>
                {item.count > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <p>Connect to Supabase to see activity</p>
            <p className="text-sm mt-2">
              Add your Supabase credentials in Vercel environment variables
            </p>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-bold text-amber-900 mb-4">Setup Required</h2>
          <div className="text-sm text-amber-800 space-y-2">
            <p>To fully enable the admin dashboard:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Create a Supabase project at supabase.com</li>
              <li>Run the schema.sql file in your Supabase SQL editor</li>
              <li>Add these environment variables in Vercel:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  <li>SUPABASE_SERVICE_ROLE_KEY</li>
                </ul>
              </li>
              <li>For payments, add Stripe keys:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>STRIPE_SECRET_KEY</li>
                  <li>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</li>
                  <li>STRIPE_WEBHOOK_SECRET</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
