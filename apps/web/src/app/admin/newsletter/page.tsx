"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminAuthAlt } from "@/hooks";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  status: string;
}

export default function AdminNewsletterPage() {
  const { isAuthed } = useAdminAuthAlt(false);
  const [password, setPassword] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      window.dispatchEvent(new Event("storage"));
    } else {
      alert("Invalid password");
    }
  };

  useEffect(() => {
    if (isAuthed) {
      fetchSubscribers();
    }
  }, [isAuthed]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter");
      const data = await response.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    const csv = [
      ["Email", "Subscribed At", "Source", "Status"],
      ...subscribers.map((s) => [s.email, s.subscribed_at, s.source, s.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="text-amber-600 hover:underline text-sm mb-2 inline-block"
            >
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Newsletter Subscribers
            </h1>
          </div>
          <button
            onClick={exportCSV}
            disabled={subscribers.length === 0}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Total Subscribers</p>
            <p className="text-3xl font-bold text-gray-900">
              {subscribers.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-3xl font-bold text-green-600">
              {subscribers.filter((s) => s.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Unsubscribed</p>
            <p className="text-3xl font-bold text-gray-400">
              {subscribers.filter((s) => s.status === "unsubscribed").length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : subscribers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-2">No subscribers yet</p>
              <p className="text-sm text-gray-400">
                Subscribers will appear here once people sign up via the footer
                newsletter form.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Subscribed
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Source
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber, idx) => (
                  <tr key={subscriber.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="text-amber-600 hover:underline"
                      >
                        {subscriber.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {subscriber.subscribed_at
                        ? new Date(subscriber.subscribed_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {subscriber.source || "website"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          subscriber.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
