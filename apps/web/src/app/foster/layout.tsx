import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Foster",
  description:
    "Open your home to an animal in need. PawsNClaws ATX provides all supplies and vet care. Apply to foster cats and dogs in Austin, TX.",
};

export default function FosterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
