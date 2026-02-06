"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "PAWSFRIEND";
  const referralLink = "https://pawsandclawsatx.com/?ref=friend";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const rewards = [
    {
      referrals: 1,
      reward: "Thank You Sticker Pack",
      description: "Cute PawsNClaws stickers for you and your friend",
      icon: "🎨",
    },
    {
      referrals: 3,
      reward: "PawsNClaws T-Shirt",
      description: "Rep your love for Austin's animals",
      icon: "👕",
    },
    {
      referrals: 5,
      reward: "Volunteer VIP Status",
      description: "Priority signup for popular events",
      icon: "⭐",
    },
    {
      referrals: 10,
      reward: "Spotlight Feature",
      description: "Featured on our social media and website",
      icon: "📸",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🎁</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Refer a Friend Program
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Know someone who would love to help Austin&apos;s animals?
            Refer them to PawsNClaws and earn rewards for both of you!
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Share Your Link</h3>
              <p className="text-sm text-gray-600">
                Send your unique referral link to friends who love animals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">They Sign Up</h3>
              <p className="text-sm text-gray-600">
                Your friend becomes a volunteer, foster, or donor
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600">
                Both of you get perks for helping Austin&apos;s pets!
              </p>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Your Referral Info
          </h2>
          <div className="max-w-md mx-auto space-y-4">
            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code
              </label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-white rounded-lg font-mono text-lg text-center">
                  {referralCode}
                </div>
                <button
                  onClick={() => copyToClipboard(referralCode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copied ? "bg-green-500 text-white" : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Referral Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white rounded-lg text-sm text-gray-600"
                />
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3 justify-center pt-4">
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, "_blank")}
                className="p-3 bg-[#1877f2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Help Austin's animals with me at PawsNClaws ATX!")}`, "_blank")}
                className="p-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <a
                href={`mailto:?subject=Join me at PawsNClaws ATX!&body=Hey! I've been volunteering with PawsNClaws ATX and I think you'd love it too. Sign up using my link: ${referralLink}`}
                className="p-3 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Reward Tiers
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.referrals}
                className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{reward.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                      {reward.referrals} Referral{reward.referrals > 1 ? "s" : ""}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900">{reward.reward}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">What counts as a referral?</p>
              <p className="text-gray-600">
                Your friend must sign up as a volunteer, foster parent, or make a donation
                using your referral link or code.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">How do I track my referrals?</p>
              <p className="text-gray-600">
                We&apos;ll email you each time a referral is confirmed. You can also check
                your status by contacting us.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900">When do I get my rewards?</p>
              <p className="text-gray-600">
                Rewards are sent within 2 weeks of reaching each tier. Physical items
                ship to US addresses only.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to start sharing the love?
          </p>
          <Link
            href="/volunteer"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Become a Volunteer First
          </Link>
        </div>
      </div>
    </div>
  );
}
