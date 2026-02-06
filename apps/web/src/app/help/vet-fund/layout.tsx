import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Vet Fund",
  description:
    "Apply for emergency veterinary financial assistance in Austin, TX. PawsNClaws ATX helps cover unexpected vet costs for families in need.",
};

export default function VetFundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
