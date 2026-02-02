"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scrolls to top on route change.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll immediately
    window.scrollTo(0, 0);

    // Scroll after paint
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    // Scroll after a short delay (catch any layout shifts)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
