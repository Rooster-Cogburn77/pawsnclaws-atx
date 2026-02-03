"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scrolls to top on initial load and route change.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // On initial mount - disable scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Force scroll on initial load
    window.scrollTo(0, 0);
  }, []);

  // On route change
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}
