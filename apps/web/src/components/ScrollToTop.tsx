"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scrolls to top on route change.
 * Fixes issue where pages load slightly below the top due to
 * scroll restoration behavior with smooth scrolling enabled.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
