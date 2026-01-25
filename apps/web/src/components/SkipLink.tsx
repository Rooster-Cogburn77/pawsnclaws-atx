"use client";

/**
 * Accessibility skip link component
 * Allows keyboard users to skip navigation and go directly to main content
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
    >
      Skip to main content
    </a>
  );
}

/**
 * Skip link target - wrap main content with this
 */
export function MainContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <main id="main-content" tabIndex={-1} className={`outline-none ${className}`}>
      {children}
    </main>
  );
}
