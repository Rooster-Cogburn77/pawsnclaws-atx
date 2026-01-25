/**
 * Charlotte-area resources for pet owners and animal helpers.
 * Easy to update - just add/edit entries here.
 */

export interface CharlotteResource {
  name: string;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  tags: string[];
}

export interface CharlotteResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  resources: CharlotteResource[];
}

export const charlotteResourceCategories: CharlotteResourceCategory[] = [
  {
    id: "tnr",
    title: "TNR (Trap-Neuter-Return)",
    description: "Resources for managing community cat colonies in Charlotte",
    icon: "scissors",
    resources: [
      {
        name: "Humane Society of Charlotte",
        description: "Official TNR program. $50 surgeries, trap rentals, dedicated Community Cat Coordinator.",
        address: "1348 Parker Dr., Charlotte, NC 28208",
        phone: "(704) 333-4130",
        website: "https://humanesocietyofcharlotte.org/services/community-cats-services/",
        tags: ["tnr", "low-cost", "traps"],
      },
      {
        name: "Stand For Animals",
        description: "Low-cost TNR services with free trap loans. Email to schedule appointments.",
        address: "224 W. 32nd Street, Charlotte, NC 28206",
        phone: "(704) 970-2711",
        website: "https://standforanimals.org/services-and-products/spay-neuter/community-cats",
        tags: ["tnr", "low-cost", "traps"],
      },
      {
        name: "Friends of Feral Felines",
        description: "All-volunteer 501(c)(3) providing TNVR education and guidance across 8 counties in NC/SC.",
        phone: "(704) 348-1578",
        website: "https://www.friendsofferalfelines.org/",
        tags: ["tnr", "education", "volunteer"],
      },
      {
        name: "Windsor Kittens",
        description: "TNR-focused rescue serving underserved East Charlotte neighborhoods. Surgery costs can be subsidized.",
        website: "https://www.windsorkittens.org/",
        tags: ["tnr", "rescue", "east-charlotte"],
      },
      {
        name: "Lucky Cats (Lake Norman)",
        description: "TNR services in 4 counties around Lake Norman. Founded 1998.",
        address: "20117 W Catawba Ave, Cornelius, NC",
        website: "https://www.luckycats.org/",
        tags: ["tnr", "lake-norman", "volunteer"],
      },
      {
        name: "Cats of Davidson",
        description: "Manages 5 feral cat communities in Davidson area. Provides food and monitors colonies.",
        website: "https://catsofdavidson.org/tnr/",
        tags: ["tnr", "davidson", "colony-management"],
      },
    ],
  },
  {
    id: "low-cost-vet",
    title: "Low-Cost Veterinary Care",
    description: "Affordable vet services for Charlotte area",
    icon: "heart",
    resources: [
      {
        name: "Humane Society of Charlotte Clinic",
        description: "Low-cost spay/neuter and wellness services",
        address: "1348 Parker Dr., Charlotte, NC 28208",
        phone: "(704) 333-4130",
        website: "https://humanesocietyofcharlotte.org/",
        tags: ["spay-neuter", "vaccines", "low-cost"],
      },
      {
        name: "Stand For Animals",
        description: "Low-cost spay/neuter clinic",
        address: "224 W. 32nd Street, Charlotte, NC 28206",
        phone: "(704) 970-2711",
        website: "https://standforanimals.org/",
        tags: ["spay-neuter", "low-cost"],
      },
      {
        name: "CMPD Animal Care & Control",
        description: "City services including low-cost options for residents",
        address: "8315 Byrum Dr, Charlotte, NC 28217",
        phone: "(704) 336-7600",
        website: "https://charlottenc.gov/AnimalsCMPD/",
        tags: ["city", "low-cost"],
      },
    ],
  },
  {
    id: "emergency",
    title: "24/7 Emergency Vets",
    description: "When your pet needs help right now",
    icon: "alert",
    resources: [
      {
        name: "CARE Charlotte",
        description: "24/7 Emergency + Specialists",
        address: "2225 Township Rd, Charlotte, NC 28273",
        phone: "(704) 457-2300",
        website: "https://www.carecharlotte.com/",
        hours: "24/7",
        tags: ["emergency", "24-hour", "specialists"],
      },
      {
        name: "VEG Charlotte",
        description: "24/7 Walk-ins Welcome, Emergency Only",
        address: "2550 W Tyvola Rd, Charlotte, NC 28217",
        phone: "(980) 880-6062",
        website: "https://veterinaryemergencygroup.com/locations/charlotte/",
        hours: "24/7",
        tags: ["emergency", "24-hour"],
      },
      {
        name: "Carolina Veterinary Specialists",
        description: "24/7 Emergency and Specialty Care",
        address: "2225 Township Rd, Charlotte, NC 28273",
        phone: "(704) 504-9608",
        website: "https://www.carolinavet.com/",
        hours: "24/7",
        tags: ["emergency", "24-hour", "specialists"],
      },
    ],
  },
  {
    id: "shelters-rescue",
    title: "Shelters & Rescues",
    description: "Charlotte area organizations saving lives",
    icon: "home",
    resources: [
      {
        name: "Humane Society of Charlotte",
        description: "Charlotte's largest no-kill shelter",
        address: "1348 Parker Dr., Charlotte, NC 28208",
        phone: "(704) 377-0534",
        website: "https://humanesocietyofcharlotte.org/",
        tags: ["shelter", "no-kill", "adoption"],
      },
      {
        name: "CMPD Animal Care & Control",
        description: "City of Charlotte animal services",
        address: "8315 Byrum Dr, Charlotte, NC 28217",
        phone: "(704) 336-7600",
        website: "https://charlottenc.gov/AnimalsCMPD/",
        tags: ["shelter", "city", "strays"],
      },
      {
        name: "Windsor Kittens",
        description: "Foster-based cat rescue serving East Charlotte",
        website: "https://www.windsorkittens.org/",
        tags: ["rescue", "cats", "foster"],
      },
      {
        name: "Carolina Cats Rescue",
        description: "Cat rescue serving the Charlotte metro area",
        website: "https://carolinacatsrescue.com/",
        tags: ["rescue", "cats"],
      },
    ],
  },
];

// Helper functions
export function getCharlotteResourcesByTag(tag: string): CharlotteResource[] {
  return charlotteResourceCategories.flatMap((cat) =>
    cat.resources.filter((r) => r.tags.includes(tag))
  );
}

export function searchCharlotteResources(query: string): CharlotteResource[] {
  const q = query.toLowerCase();
  return charlotteResourceCategories.flatMap((cat) =>
    cat.resources.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
    )
  );
}
