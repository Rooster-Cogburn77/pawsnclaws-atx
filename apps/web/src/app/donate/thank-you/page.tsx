"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HeartIcon } from "@/components/Icons";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thank You! 🐾
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your generosity makes a real difference for Austin&apos;s animals.
          Every dollar helps us feed community cats, prevent surrenders, and
          save lives.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">What happens next?</h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>You&apos;ll receive a tax receipt via email</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Your donation is already at work helping animals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Check our impact page to see where donations go</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/impact"
            className="block w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            See Your Impact
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-6 bg-white border-2 border-gray-200 hover:border-amber-300 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Share your support:{" "}
            <a
              href={`https://twitter.com/intent/tweet?text=I just donated to @PawsNClawsATX to help Austin's animals! 🐱🐶 You can too: https://pawsandclawsatx.com/donate`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Tweet about it
            </a>
          </p>
        </div>

        {sessionId && (
          <p className="mt-4 text-xs text-gray-400">
            Reference: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
