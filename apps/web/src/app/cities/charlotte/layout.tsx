import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "PawsNClaws CLT - Charlotte Community Cat Support",
    template: "%s | PawsNClaws CLT",
  },
  description: "Supporting Charlotte's community cats through TNR, foster programs, and colony care. A chapter of PawsNClaws ATX.",
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
