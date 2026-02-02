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

    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll after a tick (for layout shifts)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
