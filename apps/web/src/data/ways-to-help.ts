/**
 * Ways people can help Austin's animals.
 * Easy to update and extend.
 */

export interface WayToHelp {
  id: string;
  title: string;
  description: string;
  commitment: "one-time" | "occasional" | "regular";
  icon: string;
  actions: Action[];
}

export interface Action {
  label: string;
  description: string;
  link?: string;
  linkType?: "external" | "form" | "email";
}

export const waysToHelp: WayToHelp[] = [
  {
    id: "donate",
    title: "Donate",
    description:
      "Every dollar helps provide food, medical care, and supplies for animals in need.",
    commitment: "one-time",
    icon: "heart",
    actions: [
      {
        label: "Donate to Austin Pets Alive!",
        description: "Directly supports rescue operations",
        link: "https://austinpetsalive.org/donate",
        linkType: "external",
      },
      {
        label: "Donate to Austin Animal Center",
        description: "Supports the city shelter",
        link: "https://www.austintexas.gov/department/support-animal-center",
        linkType: "external",
      },
      {
        label: "Donate Supplies",
        description: "Shelters always need towels, blankets, food, and toys",
        link: "https://www.austinpetsalive.org/in-kind",
        linkType: "external",
      },
    ],
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Give your time to help animals directly - walking dogs, socializing cats, or helping at events.",
    commitment: "regular",
    icon: "users",
    actions: [
      {
        label: "Austin Animal Center Volunteers",
        description: "Dog walking, cat socializing, shelter support",
        link: "https://www.austintexas.gov/department/volunteer-animal-center",
        linkType: "external",
      },
      {
        label: "Austin Pets Alive! Volunteers",
        description: "Various programs including dog walking and cat care",
        link: "https://www.austinpetsalive.org/volunteer",
        linkType: "external",
      },
      {
        label: "Transport Volunteers",
        description: "Help transport animals to vet appointments or rescues",
        link: "https://www.austinpetsalive.org/volunteer",
        linkType: "external",
      },
    ],
  },
  {
    id: "foster",
    title: "Foster",
    description:
      "Open your home temporarily to an animal. Fosters save lives by freeing shelter space.",
    commitment: "occasional",
    icon: "home",
    actions: [
      {
        label: "Austin Pets Alive! Foster Program",
        description: "Foster dogs, cats, or neonatal kittens",
        link: "https://www.austinpetsalive.org/foster",
        linkType: "external",
      },
      {
        label: "Austin Animal Center Foster",
        description: "Short-term or long-term foster opportunities",
        link: "https://www.austintexas.gov/services/foster-pet",
        linkType: "external",
      },
      {
        label: "Austin Humane Society Foster",
        description: "Foster animals recovering from medical issues",
        link: "https://austinhumanesociety.org/foster",
        linkType: "external",
      },
    ],
  },
  {
    id: "adopt",
    title: "Adopt",
    description:
      "Give an animal their forever home. Adoption saves two lives - the one you adopt and the one who takes their space.",
    commitment: "regular",
    icon: "heart-handshake",
    actions: [
      {
        label: "Browse Adoptable Pets",
        description: "See all available pets at local shelters",
        link: "https://www.austintexas.gov/services/adopt-a-pet",
        linkType: "external",
      },
      {
        label: "Austin Pets Alive! Adoptions",
        description: "Adopt a rescued animal",
        link: "https://austinpetsalive.org/adopt",
        linkType: "external",
      },
    ],
  },
  {
    id: "community-cats",
    title: "Help Community Cats",
    description:
      "Support feral and stray cats through TNR (Trap-Neuter-Return) and colony care.",
    commitment: "regular",
    icon: "cat",
    actions: [
      {
        label: "Learn About TNR",
        description: "Understand how TNR helps control cat populations humanely",
        link: "https://www.austintexas.gov/page/community-cats",
        linkType: "external",
      },
      {
        label: "Become a Colony Caretaker",
        description: "Provide food and monitoring for a cat colony",
        link: "https://shadowcats.net",
        linkType: "external",
      },
      {
        label: "Report a Colony",
        description: "Know of cats that need TNR? Report it here",
        link: "https://www.austintexas.gov/page/community-cats",
        linkType: "external",
      },
    ],
  },
  {
    id: "spread-word",
    title: "Spread the Word",
    description:
      "Share adoptable pets, lost/found alerts, and resources with your network.",
    commitment: "one-time",
    icon: "share",
    actions: [
      {
        label: "Share Adoptable Pets",
        description: "Post shelter pets on your social media",
      },
      {
        label: "Share Lost & Found Posts",
        description: "Help reunite pets with families",
      },
      {
        label: "Educate About Resources",
        description: "Many people don't know about low-cost vet options",
      },
    ],
  },
  {
    id: "report-help",
    title: "Report Animals in Need",
    description:
      "See a stray, injured, or neglected animal? Know who to call.",
    commitment: "one-time",
    icon: "phone",
    actions: [
      {
        label: "Austin 311",
        description: "Report stray or injured animals within Austin city limits",
        link: "tel:311",
        linkType: "external",
      },
      {
        label: "Report Animal Cruelty",
        description: "If you suspect abuse or neglect",
        link: "https://www.austintexas.gov/department/animal-protection",
        linkType: "external",
      },
      {
        label: "Found a Pet?",
        description: "Steps to help a found pet get home",
        link: "https://www.austintexas.gov/page/found-pet",
        linkType: "external",
      },
    ],
  },
];

// Group by commitment level
export function getByCommitment(level: WayToHelp["commitment"]): WayToHelp[] {
  return waysToHelp.filter((w) => w.commitment === level);
}
