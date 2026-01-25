"use client";

import Link from "next/link";
import { CityConfig } from "@/config/cities";

interface CityRepresentativesProps {
  city: CityConfig;
  variant?: "card" | "inline" | "footer";
}

export function CityRepresentatives({ city, variant = "card" }: CityRepresentativesProps) {
  const hasReps = city.representatives.length > 0;
  const contactHref = city.slug === "austin" ? "/contact" : `/cities/${city.slug}/contact`;
  const leadGuideHref = "/volunteer/city-lead";

  // No reps - show "Help Us Launch" CTA
  if (!hasReps) {
    if (variant === "footer") {
      return (
        <div className="text-sm">
          <p className="text-gray-400 mb-1">No local lead yet</p>
          <Link href={leadGuideHref} className={`${city.color.accent} hover:underline`}>
            Become the {city.shortName} City Lead →
          </Link>
        </div>
      );
    }

    if (variant === "inline") {
      return (
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <span className="text-2xl">🙋</span>
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              We're looking for a local lead in {city.shortName}.
            </p>
            <Link href={leadGuideHref} className={`text-sm font-medium ${city.color.accent} hover:underline`}>
              Could that be you? →
            </Link>
          </div>
        </div>
      );
    }

    // Card variant (default)
    return (
      <div className={`rounded-2xl p-6 text-center border-2 border-dashed border-gray-200 bg-gray-50`}>
        <span className="text-4xl mb-3 block">🚀</span>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Help Launch PawsNClaws in {city.shortName}
        </h3>
        <p className="text-gray-600 text-sm mb-4 max-w-sm mx-auto">
          We're looking for a passionate local to lead our {city.shortName} chapter.
          Know the community? Love animals? This could be you.
        </p>
        <Link
          href={leadGuideHref}
          className={`inline-block px-5 py-2 ${city.color.primary} ${city.color.primaryHover} text-white font-medium rounded-lg transition-colors`}
        >
          Learn About Becoming a City Lead
        </Link>
      </div>
    );
  }

  // Has reps - show their profiles
  if (variant === "footer") {
    const rep = city.representatives[0];
    return (
      <div className="text-sm">
        <p className="text-gray-400 mb-1">Your local contact</p>
        <p className="text-white font-medium">{rep.name}</p>
        <p className="text-gray-400 text-xs">{rep.title}</p>
      </div>
    );
  }

  if (variant === "inline") {
    const rep = city.representatives[0];
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        {rep.photo ? (
          <img src={rep.photo} alt={rep.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className={`w-12 h-12 rounded-full ${city.color.primary} flex items-center justify-center text-white font-bold text-lg`}>
            {rep.name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-gray-900">{rep.name}</p>
          <p className="text-sm text-gray-500">{rep.title}</p>
        </div>
        <Link
          href={contactHref}
          className={`text-sm font-medium ${city.color.accent} hover:underline`}
        >
          Contact →
        </Link>
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Your Local Team
      </h3>
      <div className="space-y-4">
        {city.representatives.map((rep, i) => (
          <div key={i} className="flex items-start gap-4">
            {rep.photo ? (
              <img src={rep.photo} alt={rep.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className={`w-16 h-16 rounded-full ${city.color.primary} flex items-center justify-center text-white font-bold text-xl`}>
                {rep.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <p className="font-bold text-gray-900">{rep.name}</p>
              <p className="text-sm text-gray-500">{rep.title}</p>
              {rep.bio && <p className="text-sm text-gray-600 mt-1">{rep.bio}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href={contactHref}
          className={`text-sm font-medium ${city.color.accent} hover:underline`}
        >
          Get in touch with your local team →
        </Link>
      </div>
    </div>
  );
}
