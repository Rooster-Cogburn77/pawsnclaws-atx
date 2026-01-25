"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

// Site pages for search
const sitePages: SearchResult[] = [
  { title: "Home", description: "Welcome to PawsNClaws ATX", href: "/", category: "Pages" },
  { title: "About Us", description: "Learn about our mission and team", href: "/about", category: "Pages" },
  { title: "Get Involved", description: "Ways to help Austin's animals", href: "/get-involved", category: "Pages" },
  { title: "Donate", description: "Support our mission financially", href: "/donate", category: "Support" },
  { title: "Foster", description: "Become a foster parent", href: "/foster", category: "Get Involved" },
  { title: "Volunteer", description: "Join our volunteer team", href: "/volunteer", category: "Get Involved" },
  { title: "Lost & Found", description: "Report or search for lost pets", href: "/lost-found", category: "Help" },
  { title: "Deposit Assistance", description: "Help with pet deposits", href: "/help/deposit-assistance", category: "Help" },
  { title: "Surrender Prevention", description: "Keep your pet in your home", href: "/help/surrender-prevention", category: "Help" },
  { title: "Vet Fund", description: "Emergency veterinary assistance", href: "/help/vet-fund", category: "Help" },
  { title: "Pet Resources Directory", description: "Austin pet services", href: "/directory", category: "Resources" },
  { title: "Food Stations", description: "Community cat feeding locations", href: "/food-stations", category: "Resources" },
  { title: "Emergency Preparedness", description: "Keep pets safe in emergencies", href: "/emergency", category: "Resources" },
  { title: "Pet Care Tips", description: "Advice for pet owners", href: "/tips", category: "Resources" },
  { title: "Events", description: "Upcoming community events", href: "/events", category: "Community" },
  { title: "Success Stories", description: "Adoption success gallery", href: "/gallery", category: "Community" },
  { title: "Blog", description: "News and articles", href: "/blog", category: "Community" },
  { title: "FAQ", description: "Frequently asked questions", href: "/faq", category: "Info" },
  { title: "Contact", description: "Get in touch with us", href: "/contact", category: "Info" },
  { title: "Pet Match Quiz", description: "Find your perfect pet", href: "/quiz", category: "Tools" },
  { title: "Cost Calculator", description: "Estimate pet ownership costs", href: "/calculator", category: "Tools" },
  { title: "Wishlist", description: "Donate supplies", href: "/wishlist", category: "Support" },
  { title: "Tribute Donations", description: "Memorial and honor gifts", href: "/tribute", category: "Support" },
  { title: "Sponsor", description: "Corporate sponsorship", href: "/sponsor", category: "Support" },
  { title: "Impact", description: "See our impact", href: "/impact", category: "Info" },
  { title: "Volunteer Appreciation", description: "Celebrating our volunteers", href: "/appreciation", category: "Community" },
];

interface SearchProps {
  className?: string;
}

export function Search({ className = "" }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter results based on query
  useEffect(() => {
    if (query.length > 1) {
      const filtered = sitePages.filter(
        (page) =>
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase()) ||
          page.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={className}>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
        aria-label="Open search"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-200 rounded text-xs text-gray-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Modal */}
          <div className="flex min-h-full items-start justify-center p-4 pt-20">
            <div
              ref={containerRef}
              className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search PawsNClaws..."
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">esc</kbd>
                </button>
              </div>

              {/* Results */}
              {results.length > 0 ? (
                <div className="max-h-96 overflow-y-auto p-2">
                  {results.map((result, idx) => (
                    <Link
                      key={idx}
                      href={result.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className="block px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-500">{result.description}</div>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {result.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.length > 1 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No results found for &quot;{query}&quot;</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase mb-3">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { title: "Foster", href: "/foster" },
                      { title: "Donate", href: "/donate" },
                      { title: "Lost & Found", href: "/lost-found" },
                      { title: "Get Help", href: "/help" },
                      { title: "Events", href: "/events" },
                      { title: "Contact", href: "/contact" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline search bar for pages
export function SearchBar({ className = "", placeholder = "Search..." }: { className?: string; placeholder?: string }) {
  const [query, setQuery] = useState("");

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
      />
    </div>
  );
}
