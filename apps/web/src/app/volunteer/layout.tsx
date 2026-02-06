import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join PawsNClaws ATX as a volunteer. Colony care, TNR assistance, event support, and more. No experience needed - we provide training.",
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
