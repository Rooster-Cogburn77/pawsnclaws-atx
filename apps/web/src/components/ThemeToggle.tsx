"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

// Hook to detect hydration without causing setState-in-effect
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Hook to sync with localStorage theme
function useStoredTheme(): Theme {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => (localStorage.getItem("theme") as Theme) || "system",
    () => "system"
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useHydrated();
  const storedTheme = useStoredTheme();
  const [theme, setTheme] = useState<Theme>(storedTheme);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className={`p-2 rounded-lg bg-gray-100 ${className}`} aria-label="Toggle theme">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      className={`p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={`Theme: ${theme}. Click to change.`}
      title={`Current: ${theme}`}
    >
      {theme === "light" && (
        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
      {theme === "dark" && (
        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
      {theme === "system" && (
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

// Hook to sync with dark mode class on document
function useIsDark() {
  return useSyncExternalStore(
    (callback) => {
      // Watch for class changes on documentElement
      const observer = new MutationObserver(callback);
      if (typeof document !== "undefined") {
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      }
      return () => observer.disconnect();
    },
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
    () => false
  );
}

// Compact version for nav
export function ThemeToggleCompact({ className = "" }: { className?: string }) {
  const mounted = useHydrated();
  const isDark = useIsDark();

  const toggle = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isDark ? "bg-gray-700" : "bg-amber-200"
      } ${className}`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <span className="flex items-center justify-center text-xs">🌙</span>
        ) : (
          <span className="flex items-center justify-center text-xs">☀️</span>
        )}
      </span>
    </button>
  );
}
