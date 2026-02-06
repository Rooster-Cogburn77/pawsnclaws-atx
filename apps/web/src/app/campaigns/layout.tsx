import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Campaigns",
  description:
    "Active fundraising campaigns for animals in need. See exactly where your donation goes and the impact it makes.",
};

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
