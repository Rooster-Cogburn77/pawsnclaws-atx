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
        name: "CMPD Animal Care & Control",
        description: "FREE spay/neuter for Mecklenburg County residents. FREE rabies vaccines on 2nd Saturday of each month.",
        address: "8315 Byrum Dr, Charlotte, NC 28217",
        phone: "(704) 336-7600",
        website: "https://www.charlottenc.gov/Animal-Care-and-Control",
        hours: "Mon-Fri 11am-7pm, Sat 11am-5pm",
        tags: ["spay-neuter", "free", "vaccines", "city"],
      },
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
        name: "Spay Neuter Clinic of the Carolinas",
        description: "Low-cost spay/neuter, vaccines, microchipping, dental cleanings. 'Low cost does not mean low care.'",
        address: "8045 Providence Rd, Suite 450, Charlotte, NC 28277",
        phone: "(704) 542-9997",
        website: "https://spayneutercarolinas.com",
        hours: "Mon-Fri 7:30am-5pm",
        tags: ["spay-neuter", "vaccines", "dental", "low-cost"],
      },
      {
        name: "SnipWell Spay Neuter & Wellness Clinic",
        description: "501(c)(3) nonprofit with 30+ years experience. Just over the SC border in Fort Mill.",
        address: "3463 US-21 #110, Fort Mill, SC 29715",
        phone: "(803) 228-4208",
        website: "https://www.snipwell.org",
        hours: "Mon-Fri 8am-4pm",
        tags: ["spay-neuter", "nonprofit", "low-cost"],
      },
      {
        name: "Best Care Animal Hospital",
        description: "Family-owned clinic offering low-cost spay/neuter. Serves Charlotte, Matthews, Indian Trail.",
        address: "1730 Matthews Township Pkwy A1, Matthews, NC 28105",
        phone: "(980) 202-6767",
        website: "https://bestcare-ah.com",
        hours: "Mon-Sat 8am-8pm, Sun 12pm-8pm",
        tags: ["spay-neuter", "urgent-care", "low-cost"],
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
        website: "https://www.charlottenc.gov/Animal-Care-and-Control",
        tags: ["shelter", "city", "strays"],
      },
      {
        name: "Greater Charlotte SPCA",
        description: "Foster-based rescue. Over 8,000 animals saved since 2010.",
        phone: "(704) 377-0534",
        website: "https://www.charlottespca.org",
        tags: ["rescue", "foster", "adoption"],
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
      {
        name: "North Meck Animal Rescue",
        description: "No-kill rescue accepting dogs of any breed, age, or medical need. Foster-based.",
        website: "https://northmeckanimalrescue.org",
        tags: ["rescue", "dogs", "no-kill", "foster"],
      },
      {
        name: "Carolina P.A.W.S.",
        description: "All-volunteer 501(c)(3) providing foster homes for abandoned cats and dogs.",
        website: "https://www.carolinapaws.com",
        tags: ["rescue", "dogs", "cats", "foster", "volunteer"],
      },
      {
        name: "Forgotten, Now Family Rescue",
        description: "501(c)(3) focusing on large breed dogs including pit bulls and bully breeds.",
        website: "https://www.forgottennowfamily.com",
        tags: ["rescue", "dogs", "large-breeds", "foster"],
      },
      {
        name: "S.A.F.E. Animal Haven",
        description: "100% volunteer-run rescue for abandoned and neglected dogs. $175 adoption fee.",
        website: "https://www.safeanimalhaven.org",
        tags: ["rescue", "dogs", "volunteer"],
      },
      {
        name: "Halfway There Rescue",
        description: "All-volunteer 501(c)(3) rescuing at-risk pets from overcrowded shelters.",
        website: "https://www.halfwaythererescue.com",
        tags: ["rescue", "dogs", "cats", "volunteer"],
      },
      {
        name: "Tranquility Sanctuary",
        description: "Rescue providing training, microchipping, vaccines, and spay/neuter before adoption.",
        phone: "(704) 401-6607",
        website: "https://www.tranquilitysanctuary.com",
        tags: ["rescue", "dogs", "cats", "training"],
      },
    ],
  },
  {
    id: "pet-food",
    title: "Pet Food Assistance",
    description: "Help keeping pets fed when times are tough",
    icon: "food",
    resources: [
      {
        name: "CMPD Animal Care & Control Pet Food Pantry",
        description: "Free pet food for Mecklenburg County residents facing financial hardship.",
        address: "8315 Byrum Dr, Charlotte, NC 28217",
        phone: "(704) 336-7600",
        website: "https://www.charlottenc.gov/Animal-Care-and-Control",
        tags: ["pet-food", "free", "assistance"],
      },
      {
        name: "Second Harvest Food Bank of Metrolina",
        description: "Large regional food bank serving 24 counties. Includes pet food assistance.",
        address: "500-B Spratt St, Charlotte, NC 28206",
        phone: "(704) 376-1785",
        website: "https://www.secondharvestmetrolina.org",
        hours: "Mon-Fri 7:30am-5pm",
        tags: ["pet-food", "food-bank", "assistance"],
      },
    ],
  },
  {
    id: "wildlife",
    title: "Wildlife Rehabilitation",
    description: "Help for injured or orphaned wildlife",
    icon: "wildlife",
    resources: [
      {
        name: "Wildlife Rescue of Charlotte (WRoC)",
        description: "501(c)(3) licensed by NC Wildlife Resources Commission. Rescues sick, injured, and orphaned wildlife.",
        phone: "(239) 810-0899",
        website: "https://www.wildliferescueofcharlotte.org",
        tags: ["wildlife", "rescue", "rehabilitation"],
      },
      {
        name: "Animal Rehabilitators of the Carolinas (ARC)",
        description: "Volunteer-based nonprofit for squirrels, raccoons, rabbits, opossums, turtles. 12-hour hotline.",
        phone: "(704) 552-2329",
        website: "https://arcwildlife.org",
        tags: ["wildlife", "rehabilitation", "hotline"],
      },
      {
        name: "Carolina Wildlife Conservation Center",
        description: "105 acres with state-of-the-art animal hospital and full surgery capabilities.",
        phone: "(980) 389-1133",
        website: "https://www.carolinaconservation.org",
        tags: ["wildlife", "hospital", "rehabilitation"],
      },
      {
        name: "Carolina Waterfowl Rescue",
        description: "Wildlife rehabilitation hospital specializing in waterfowl and birds.",
        phone: "(704) 668-9486",
        website: "https://cwrescue.org",
        tags: ["wildlife", "birds", "waterfowl"],
      },
    ],
  },
  {
    id: "training",
    title: "Low-Cost Training",
    description: "Affordable behavioral training and classes",
    icon: "training",
    resources: [
      {
        name: "Humane Society of Charlotte Dog Training",
        description: "Six-week group classes. Financial assistance available for those in need.",
        website: "https://humanesocietyofcharlotte.org/dog-training/",
        tags: ["training", "dogs", "classes", "financial-assistance"],
      },
      {
        name: "Charlotte Dog Training Club",
        description: "Nonprofit dog training club offering affordable group classes at various skill levels.",
        website: "https://charlottedogtraining.com",
        tags: ["training", "dogs", "nonprofit", "classes"],
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
