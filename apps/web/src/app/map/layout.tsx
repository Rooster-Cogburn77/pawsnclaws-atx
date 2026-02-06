import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colony Map",
  description:
    "View and report community cat colonies in Austin, TX. Interactive map showing colony locations, TNR status, and how to help.",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
