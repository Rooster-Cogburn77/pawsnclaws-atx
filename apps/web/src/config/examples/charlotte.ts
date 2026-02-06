/**
 * City Configuration: Charlotte, NC
 *
 * This is the configuration for the Charlotte chapter/page.
 */

import type { CityConfig } from "../city";

export const charlotteConfig: CityConfig = {
  // Basic Info
  city: "Charlotte",
  state: "North Carolina",
  stateAbbrev: "NC",
  region: "Piedmont",
  tagline: "Helping Charlotte's community cats thrive",

  // Organization
  orgName: "Paws N Claws Charlotte",
  orgNameShort: "PawsNClaws CLT",
  ein: "", // Under PawsNClaws ATX umbrella initially
  founded: "2026",

  // Contact
  email: "charlotte@pawsandclawsatx.com",
  phone: undefined,
  address: {
    city: "Charlotte",
    state: "NC",
    zip: "28202",
  },

  // Social
  social: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    tiktok: undefined,
    youtube: undefined,
  },

  // Map Settings - Charlotte coordinates
  map: {
    center: [35.2271, -80.8431],
    defaultZoom: 11,
  },

  // Local Resources
  resources: {
    shelterName: "Charlotte-Mecklenburg Animal Care & Control",
    shelterUrl: "https://www.charlottenc.gov/Animal-Care-and-Control",
    tnrProgram: "Humane Society of Charlotte TNR",
    tnrUrl: "https://humanesocietyofcharlotte.org/health-wellness/trap-neuter-return/",
    emergencyVet: "CARE Charlotte",
    emergencyVetPhone: "704-457-2300",
  },

  // Feature Flags - Start minimal, expand as capacity grows
  features: {
    donations: true,
    fostering: false, // Enable when we have local fosters
    colonyMap: true,
    foodStations: false, // Enable when we have partner locations
    lostAndFound: false, // Enable when we have capacity
    events: false, // Enable when we have local organizers
    corporate: false, // Enable when targeting CLT corporate partners
    surrenderPrevention: true,
    vetFund: true,
    depositAssistance: true,
  },

  // Branding - Carolina blue/teal
  branding: {
    primaryColor: "teal",
    logoUrl: undefined,
    faviconUrl: undefined,
  },

  // SEO
  seo: {
    title: "PawsNClaws CLT - Charlotte Community Cat Support",
    description: "Supporting Charlotte's community cats through TNR, foster programs, and colony care. Help us help the cats of Charlotte, North Carolina.",
    keywords: [
      "Charlotte cats",
      "community cats NC",
      "TNR Charlotte",
      "cat rescue Charlotte",
      "feral cats North Carolina",
      "Charlotte animal rescue",
      "Mecklenburg cats",
      "Queen City cats",
    ],
  },
};

// Charlotte-specific TNR resources
export const charlotteTNRResources = [
  {
    name: "Humane Society of Charlotte",
    description: "Official city TNR partner. $50 surgeries, trap rentals.",
    address: "1348 Parker Dr., Charlotte, NC 28208",
    phone: "(704) 377-0534",
    website: "https://humanesocietyofcharlotte.org/health-wellness/trap-neuter-return/",
    cost: "$50 per cat",
  },
  {
    name: "Stand For Animals",
    description: "Low-cost TNR with free trap loans.",
    address: "224 W. 32nd Street, Charlotte, NC 28206",
    phone: "(704) 970-2711",
    email: "tnr@standforanimals.org",
    website: "https://standforanimals.org/services-and-products/spay-neuter/community-cats",
    cost: "Low-cost (contact for rates)",
  },
  {
    name: "Friends of Feral Felines",
    description: "Volunteer org providing TNVR education and guidance.",
    phone: "(704) 348-1578",
    website: "https://www.friendsofferalfelines.org/",
    coverage: "Mecklenburg + 7 surrounding counties",
  },
  {
    name: "Windsor Kittens",
    description: "TNR-focused rescue serving East Charlotte.",
    website: "https://www.windsorkittens.org/",
    cost: "~$100 (often subsidized)",
  },
  {
    name: "SnipWell Clinic",
    description: "Low-cost spay/neuter just over the SC border.",
    address: "3463 US-21 #110, Fort Mill, SC 29715",
    phone: "(803) 228-4208",
    website: "https://www.snipwell.org",
  },
];

// Charlotte emergency vets
export const charlotteEmergencyVets = [
  {
    name: "CARE Charlotte",
    phone: "(704) 457-2300",
    hours: "24/7",
    website: "https://carecharlotte.com/",
  },
  {
    name: "VEG Charlotte",
    phone: "(980) 880-6062",
    hours: "24/7, walk-ins welcome",
    website: "https://veg.com/locations/north-carolina/charlotte",
  },
  {
    name: "Carolina Veterinary Specialists",
    phone: "(704) 504-9608",
    hours: "24/7",
    website: "https://www.charlotte.carolinavet.com/",
  },
];
