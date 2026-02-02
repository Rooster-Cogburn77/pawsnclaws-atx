"use client";

import { useState, useEffect, useSyncExternalStore, useRef } from "react";

interface CountdownProps {
  targetDate: Date | string;
  title?: string;
  className?: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Hook to detect hydration
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Calculate time left from target date
function calculateTimeLeft(targetDate: Date | string): TimeLeft | null {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown({ targetDate, title, className = "", onComplete }: CountdownProps) {
  const mounted = useHydrated();
  const onCompleteRef = useRef(onComplete);

  // Update ref in effect, not during render
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Initialize with lazy function - only runs on client after hydration
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => {
    if (typeof window === "undefined") return null;
    return calculateTimeLeft(targetDate);
  });

  useEffect(() => {
    if (!mounted) return;

    // Set up interval for updates
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
      if (!newTimeLeft) {
        onCompleteRef.current?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, targetDate]);

  if (!mounted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="animate-pulse flex gap-4 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg w-16 h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl font-bold text-amber-600">Event Started!</div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className={`text-center ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>}
      <div className="flex gap-3 justify-center">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white rounded-lg shadow-md px-4 py-3 min-w-[70px]"
          >
            <div className="text-2xl md:text-3xl font-bold text-amber-600">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact inline version
export function CountdownInline({ targetDate, className = "" }: { targetDate: Date | string; className?: string }) {
  const mounted = useHydrated();

  // Initialize with lazy function
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => {
    if (typeof window === "undefined") return null;
    return calculateTimeLeft(targetDate);
  });

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, targetDate]);

  if (!mounted || !timeLeft) return null;

  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
  if (timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${timeLeft.hours}h`);
  parts.push(`${timeLeft.minutes}m`);
  if (timeLeft.days === 0) parts.push(`${timeLeft.seconds}s`);

  return (
    <span className={`font-mono text-amber-600 ${className}`}>
      {parts.join(" ")}
    </span>
  );
}
