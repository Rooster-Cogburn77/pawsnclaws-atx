"use client";

import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-6xl mb-6 block">📡</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry -
          some pages may still be available from your device&apos;s cache.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Try these cached pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/directory"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Resources
            </Link>
          </div>
        </div>

        <div className="mt-12 p-4 bg-blue-50 rounded-xl">
          <h2 className="font-bold text-blue-900 mb-2">Emergency Contacts</h2>
          <p className="text-sm text-blue-800">
            If you have a pet emergency, call:
          </p>
          <p className="text-lg font-bold text-blue-900 mt-2">
            Austin Vet Emergency: (512) 343-2837
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
