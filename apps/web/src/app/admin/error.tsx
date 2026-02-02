"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Admin Error
        </h1>
        <p className="text-gray-600 mb-6">
          An error occurred while loading the admin panel. This could be a
          temporary issue or a configuration problem.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="inline-block w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>

          <a
            href="/admin"
            className="inline-block w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Admin Dashboard
          </a>

          <a
            href="/"
            className="inline-block text-gray-500 hover:text-gray-700 text-sm"
          >
            Return to Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
