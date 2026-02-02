"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";

const AUTH_KEY = "adminAuth";
const AUTH_VALUE = "authenticated";

// Store for sessionStorage sync
function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === AUTH_VALUE;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  // Listen for storage events (cross-tab sync)
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * Hook for admin authentication state.
 * Uses useSyncExternalStore to avoid setState-in-useEffect anti-pattern.
 *
 * @param redirectOnFail - If true, redirects to /admin when not authenticated
 * @returns Object with isAuthed state and login/logout functions
 */
export function useAdminAuth(redirectOnFail: boolean = true) {
  const isAuthed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Handle redirect when not authenticated
  useEffect(() => {
    if (redirectOnFail && !isAuthed && typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  }, [redirectOnFail, isAuthed]);

  const login = useCallback(() => {
    sessionStorage.setItem(AUTH_KEY, AUTH_VALUE);
    // Trigger a re-render by dispatching a storage event
    window.dispatchEvent(new Event("storage"));
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { isAuthed, login, logout };
}

/**
 * Hook variant that checks for alternate auth key.
 * Some pages use "admin_auth" instead of "adminAuth".
 */
export function useAdminAuthAlt(redirectOnFail: boolean = true) {
  const getSnapshotAlt = (): boolean => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("admin_auth") === "true";
  };

  const isAuthed = useSyncExternalStore(subscribe, getSnapshotAlt, getServerSnapshot);

  useEffect(() => {
    if (redirectOnFail && !isAuthed && typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  }, [redirectOnFail, isAuthed]);

  return { isAuthed };
}
