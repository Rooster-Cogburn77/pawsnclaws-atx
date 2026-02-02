"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">😿</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We&apos;re sorry, but something unexpected happened. Our team has been
          notified and we&apos;re working to fix it.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-red-100 rounded-lg text-left">
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

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block w-full sm:w-auto px-8 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>

          <div className="pt-4">
            <a
              href="/"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Return to Home
            </a>
          </div>

          <p className="text-sm text-gray-500 pt-4">
            If this problem persists, please{" "}
            <a href="/contact" className="text-amber-600 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
