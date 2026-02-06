import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Austin's animals with a tax-deductible donation. 100% goes directly to emergency vet care, colony feeding, surrender prevention, and more.",
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
