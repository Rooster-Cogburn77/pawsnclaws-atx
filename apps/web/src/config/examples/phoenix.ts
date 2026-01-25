/**
 * Example City Configuration: Phoenix, AZ
 *
 * Copy this file to ../city.ts and customize for your city.
 */

import type { CityConfig } from "../city";

export const phoenixConfig: CityConfig = {
  // Basic Info
  city: "Phoenix",
  state: "Arizona",
  stateAbbrev: "AZ",
  region: "Valley of the Sun",
  tagline: "Protecting Phoenix's desert cats",

  // Organization
  orgName: "Paws N Claws Phoenix",
  orgNameShort: "PawsNClaws PHX",
  ein: "",
  founded: "2026",

  // Contact
  email: "hello@pawsnclawsphx.org",
  phone: undefined,
  address: {
    city: "Phoenix",
    state: "AZ",
    zip: "85001",
  },

  // Social
  social: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    tiktok: undefined,
    youtube: undefined,
  },

  // Map Settings - Phoenix coordinates
  map: {
    center: [33.4484, -112.0740],
    defaultZoom: 11, // Phoenix is spread out
  },

  // Local Resources
  resources: {
    shelterName: "Maricopa County Animal Care & Control",
    shelterUrl: "https://www.maricopa.gov/5614/Animal-Care-Control",
    tnrProgram: "ADLA - Altered Tails",
    tnrUrl: "https://www.alteredtails.org/",
    emergencyVet: "Emergency Animal Clinic",
    emergencyVetPhone: "602-995-3757",
  },

  // Feature Flags
  features: {
    donations: true,
    fostering: true,
    colonyMap: true,
    foodStations: true,
    lostAndFound: true,
    events: true,
    corporate: true,
    surrenderPrevention: true,
    vetFund: true,
    depositAssistance: true,
  },

  // Branding - Desert orange/copper tones
  branding: {
    primaryColor: "orange",
    logoUrl: undefined,
    faviconUrl: undefined,
  },

  // SEO
  seo: {
    title: "PawsNClaws Phoenix - Arizona Community Cat Support",
    description: "Supporting Phoenix's community cats through TNR, foster programs, and colony care. Help us help the cats of Phoenix, Arizona.",
    keywords: [
      "Phoenix cats",
      "community cats Arizona",
      "TNR Phoenix",
      "cat rescue Phoenix",
      "feral cats Arizona",
      "Phoenix animal rescue",
      "cat foster Phoenix",
      "Maricopa cats",
    ],
  },
};
