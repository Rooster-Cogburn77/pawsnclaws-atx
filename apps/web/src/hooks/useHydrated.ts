"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook to detect client-side hydration.
 * Uses useSyncExternalStore to avoid setState-in-useEffect anti-pattern.
 *
 * @returns true when running on the client after hydration
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    // Subscribe - no-op since hydration only happens once
    () => () => {},
    // Client snapshot - always true after hydration
    () => true,
    // Server snapshot - always false during SSR
    () => false
  );
}
