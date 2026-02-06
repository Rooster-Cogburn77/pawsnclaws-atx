/**
 * Example City Configuration: Denver, CO
 *
 * Copy this file to ../city.ts and customize for your city.
 */

import type { CityConfig } from "../city";

export const denverConfig: CityConfig = {
  // Basic Info
  city: "Denver",
  state: "Colorado",
  stateAbbrev: "CO",
  region: "Front Range",
  tagline: "Helping Denver's community cats thrive",

  // Organization
  orgName: "Paws N Claws Denver",
  orgNameShort: "PawsNClaws DEN",
  ein: "",
  founded: "2026",

  // Contact
  email: "hello@pawsnclawsdenver.org",
  phone: undefined,
  address: {
    city: "Denver",
    state: "CO",
    zip: "80202",
  },

  // Social
  social: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    tiktok: undefined,
    youtube: undefined,
  },

  // Map Settings - Denver coordinates
  map: {
    center: [39.7392, -104.9903],
    defaultZoom: 12,
  },

  // Local Resources
  resources: {
    shelterName: "Denver Animal Shelter",
    shelterUrl: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Animal-Protection",
    tnrProgram: "Denver Dumb Friends League",
    tnrUrl: "https://www.ddfl.org/",
    emergencyVet: "Alameda East Veterinary Hospital",
    emergencyVetPhone: "303-366-2639",
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

  // Branding - Denver's often use blue
  branding: {
    primaryColor: "blue",
    logoUrl: undefined,
    faviconUrl: undefined,
  },

  // SEO
  seo: {
    title: "PawsNClaws Denver - Colorado Community Cat Support",
    description: "Supporting Denver's community cats through TNR, foster programs, and colony care. Help us help the cats of Denver, Colorado.",
    keywords: [
      "Denver cats",
      "community cats Colorado",
      "TNR Denver",
      "cat rescue Denver",
      "feral cats Colorado",
      "Denver animal rescue",
      "cat foster Denver",
    ],
  },
};
