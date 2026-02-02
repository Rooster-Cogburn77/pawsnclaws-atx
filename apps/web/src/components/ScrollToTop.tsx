"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Scrolls to top on route change.
 * Fixes issue where pages load below the top due to
 * browser scroll restoration behavior.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Use useLayoutEffect to scroll before paint
  useLayoutEffect(() => {
    // Force scroll to top with instant behavior
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
