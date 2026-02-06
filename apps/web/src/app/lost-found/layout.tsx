import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost & Found Pets",
  description:
    "Report a lost or found pet in Austin, TX. Community-powered lost and found board to help reunite pets with their families.",
};

export default function LostFoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
