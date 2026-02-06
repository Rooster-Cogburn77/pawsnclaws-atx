"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getCityFromPath, getCityDonateLink, getCityHomeLink } from "@/config/cities";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const pathname = usePathname();
  const city = getCityFromPath(pathname);

  const isAustin = city.slug === "austin";
  const primaryColor = isAustin ? "bg-amber-500 hover:bg-amber-600" : "bg-teal-600 hover:bg-teal-700";
  const accentColor = isAustin ? "text-amber-500" : "text-teal-600";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + City Selector */}
          <div className="flex items-center gap-3">
            <Link href={getCityHomeLink(city)} className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">{isAustin ? "🐾" : "🐱"}</span>
              <span className="font-semibold text-gray-900">
                PawsNClaws{" "}
                <span className={accentColor}>{city.shortName}</span>
              </span>
            </Link>

            {/* City Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 hover:border-gray-300 transition-colors"
                aria-expanded={cityMenuOpen}
                aria-haspopup="true"
                aria-label="Change city location"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                change city
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {cityMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCityMenuOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
                    <Link
                      href="/"
                      onClick={() => setCityMenuOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${city.slug === "austin" ? "bg-amber-50 text-amber-700" : "text-gray-700"}`}
                    >
                      <span className="font-medium">Austin, TX</span>
                      {city.slug === "austin" && <span className="ml-2 text-xs">(current)</span>}
                    </Link>
                    <Link
                      href="/cities/charlotte"
                      onClick={() => setCityMenuOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${city.slug === "charlotte" ? "bg-teal-50 text-teal-700" : "text-gray-700"}`}
                    >
                      <span className="font-medium">Charlotte, NC</span>
                      {city.slug === "charlotte" && <span className="ml-2 text-xs">(current)</span>}
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/cities"
                        onClick={() => setCityMenuOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-500 hover:bg-gray-50"
                      >
                        All locations →
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {city.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={getCityDonateLink(city)}
              className={`rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${primaryColor}`}
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-100" role="menu">
            <div className="flex flex-col gap-4">
              {city.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={getCityDonateLink(city)}
                className={`rounded-full px-4 py-2 text-center text-sm font-medium text-white ${primaryColor}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>

              {/* City switcher in mobile */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Switch location:</p>
                <div className="flex gap-2">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex-1 text-center py-2 text-sm rounded-lg border ${city.slug === "austin" ? "bg-amber-50 border-amber-200 text-amber-700" : "border-gray-200 text-gray-600"}`}
                  >
                    Austin
                  </Link>
                  <Link
                    href="/cities/charlotte"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex-1 text-center py-2 text-sm rounded-lg border ${city.slug === "charlotte" ? "bg-teal-50 border-teal-200 text-teal-700" : "border-gray-200 text-gray-600"}`}
                  >
                    Charlotte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
