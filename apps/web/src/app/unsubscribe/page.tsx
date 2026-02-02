"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You've been unsubscribed.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-4">📧</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unsubscribe from Newsletter
          </h1>
          <p className="text-gray-600">
            We&apos;re sorry to see you go. Enter your email to unsubscribe.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <span className="text-4xl block mb-4">✓</span>
            <p className="text-gray-900 font-medium mb-4">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              You can always re-subscribe through our website footer.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleUnsubscribe}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Processing..." : "Unsubscribe"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Changed your mind?{" "}
              <Link href="/" className="text-amber-600 hover:underline">
                Return home
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
