import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PawsNClaws CLT - Charlotte Pet Support",
    template: "%s | PawsNClaws CLT",
  },
  description: "Helping Charlotte pets and people stay together through emergency vet funds, surrender prevention, foster programs, and TNR coordination. An initiative of PawsNClaws ATX.",
};

export default function CharlotteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No separate header/footer - the main layout's Header and Footer
  // components detect the city from the URL and adapt automatically
  return <>{children}</>;
}
