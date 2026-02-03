"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Scrolls to top on route change.
 * Handles sticky header scroll offset issue.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Disable scroll restoration on mount
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Force scroll to 0 on any route change
  useEffect(() => {
    // Only run on actual route changes, not initial mount
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Immediate scroll
      window.scrollTo(0, 0);

      // After microtask
      queueMicrotask(() => {
        window.scrollTo(0, 0);
      });

      // After paint
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        // After next paint (catch any layout shifts)
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      });
    }
  }, [pathname]);

  // Also intercept all internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        // It's an internal link - scroll to top immediately on click
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
