import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with PawsNClaws ATX. Questions about volunteering, fostering, donations, or partnerships - we're here to help.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
