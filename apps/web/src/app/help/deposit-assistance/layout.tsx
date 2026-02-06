import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Deposit Assistance",
  description:
    "0% interest loans for pet deposits in Austin, TX. Don't surrender your pet due to housing costs. PawsNClaws ATX can help.",
};

export default function DepositAssistanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
