import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Donation tiers for display
export const donationTiers = [
  {
    amount: 1000, // $10
    name: "Friend",
    description: "Feeds a colony cat for a week",
    emoji: "🐱",
  },
  {
    amount: 2500, // $25
    name: "Guardian",
    description: "Covers one TNR surgery",
    emoji: "✂️",
  },
  {
    amount: 5000, // $50
    name: "Champion",
    description: "Emergency vet visit for a stray",
    emoji: "🏥",
  },
  {
    amount: 10000, // $100
    name: "Hero",
    description: "Feeds a colony for a month",
    emoji: "🦸",
  },
  {
    amount: 25000, // $250
    name: "Lifesaver",
    description: "Pet deposit assistance for one family",
    emoji: "🏠",
  },
];

// Monthly subscription tiers
export const subscriptionTiers = [
  {
    amount: 500, // $5/mo
    name: "Colony Guardian",
    description: "Help feed and care for community cats",
    emoji: "🐱",
    perks: ["Monthly impact updates", "Colony Guardian badge"],
  },
  {
    amount: 1500, // $15/mo
    name: "Animal Ally",
    description: "Support our emergency vet fund",
    emoji: "🤝",
    perks: ["Monthly impact updates", "Animal Ally badge", "Quarterly newsletter"],
  },
  {
    amount: 3000, // $30/mo
    name: "Rescue Champion",
    description: "Fund surrender prevention and assistance",
    emoji: "🏆",
    perks: [
      "Monthly impact updates",
      "Rescue Champion badge",
      "Quarterly newsletter",
      "Name on website",
    ],
  },
  {
    amount: 10000, // $100/mo
    name: "Founding Guardian",
    description: "Maximum impact across all programs",
    emoji: "⭐",
    perks: [
      "All previous perks",
      "Founding Guardian badge",
      "Direct line to team",
      "Sponsor a specific colony",
    ],
  },
];

// Corporate sponsor tiers
export const sponsorTiers = {
  bronze: {
    name: "Bronze",
    minAmount: 10000, // $100/mo
    perks: ["Logo on sponsors page", "Social media shoutout"],
  },
  silver: {
    name: "Silver",
    minAmount: 25000, // $250/mo
    perks: [
      "Logo on sponsors page",
      "Logo on colony map",
      "Monthly social posts",
      "Quarterly impact report",
    ],
  },
  gold: {
    name: "Gold",
    minAmount: 50000, // $500/mo
    perks: [
      "All Silver perks",
      "Logo on homepage",
      "Event sponsorship recognition",
      "Employee volunteer coordination",
    ],
  },
  platinum: {
    name: "Platinum",
    minAmount: 100000, // $1000/mo
    perks: [
      "All Gold perks",
      "Named program sponsorship",
      "Press release",
      "Custom impact dashboard",
      "Board meeting presentation",
    ],
  },
};

// Format cents to dollars
export function formatAmount(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// Calculate processing fee (Stripe 2.9% + $0.30)
export function calculateFee(amount: number): number {
  return Math.round(amount * 0.029 + 30);
}
