/**
 * Example City Configuration: Portland, OR
 *
 * Copy this file to ../city.ts and customize for your city.
 */

import type { CityConfig } from "../city";

export const portlandConfig: CityConfig = {
  // Basic Info
  city: "Portland",
  state: "Oregon",
  stateAbbrev: "OR",
  region: "Pacific Northwest",
  tagline: "Caring for Portland's community cats, rain or shine",

  // Organization
  orgName: "Paws N Claws PDX",
  orgNameShort: "PawsNClaws PDX",
  ein: "",
  founded: "2026",

  // Contact
  email: "hello@pawsnclawspdx.org",
  phone: undefined,
  address: {
    city: "Portland",
    state: "OR",
    zip: "97201",
  },

  // Social
  social: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    tiktok: undefined,
    youtube: undefined,
  },

  // Map Settings - Portland coordinates
  map: {
    center: [45.5152, -122.6784],
    defaultZoom: 12,
  },

  // Local Resources
  resources: {
    shelterName: "Oregon Humane Society",
    shelterUrl: "https://www.oregonhumane.org/",
    tnrProgram: "Feral Cat Coalition of Oregon",
    tnrUrl: "https://www.feralcats.com/",
    emergencyVet: "DoveLewis Emergency Animal Hospital",
    emergencyVetPhone: "503-228-7281",
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

  // Branding - Pacific Northwest green
  branding: {
    primaryColor: "emerald",
    logoUrl: undefined,
    faviconUrl: undefined,
  },

  // SEO
  seo: {
    title: "PawsNClaws PDX - Portland Community Cat Support",
    description: "Supporting Portland's community cats through TNR, foster programs, and colony care. Help us help the cats of Portland, Oregon.",
    keywords: [
      "Portland cats",
      "community cats Oregon",
      "TNR Portland",
      "cat rescue Portland",
      "feral cats Oregon",
      "Portland animal rescue",
      "cat foster Portland",
      "PDX cats",
    ],
  },
};
