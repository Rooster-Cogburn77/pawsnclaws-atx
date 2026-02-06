import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Sponsorship",
  description:
    "Partner with PawsNClaws ATX. Corporate sponsorship, matching gifts, round-up programs, and employee engagement opportunities.",
};

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
