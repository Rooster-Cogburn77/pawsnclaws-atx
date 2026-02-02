/**
 * City Configuration
 *
 * This single file configures the entire site for a specific city.
 * Fork the repo, modify this file, and deploy - instant local cat nonprofit site.
 *
 * See /docs/CITY_SETUP.md for full instructions.
 */

export interface CityConfig {
  // Basic Info
  city: string;
  state: string;
  stateAbbrev: string;
  region: string; // e.g., "Central Texas", "Bay Area"
  tagline: string;

  // Organization
  orgName: string;
  orgNameShort: string; // e.g., "PawsNClaws ATX"
  ein?: string; // 501(c)(3) EIN if applicable
  founded?: string; // Year founded

  // Contact
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city: string;
    state: string;
    zip: string;
  };

  // Social
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };

  // Map Settings
  map: {
    center: [number, number]; // [latitude, longitude]
    defaultZoom: number;
  };

  // Local Resources
  resources: {
    shelterName: string;
    shelterUrl?: string;
    tnrProgram?: string;
    tnrUrl?: string;
    emergencyVet?: string;
    emergencyVetPhone?: string;
  };

  // Stripe (for donations)
  stripe?: {
    publishableKey: string;
    // Secret key goes in env vars, not here
  };

  // Supabase (for database)
  supabase?: {
    url: string;
    // Anon key goes in env vars
  };

  // Feature Flags
  features: {
    donations: boolean;
    fostering: boolean;
    colonyMap: boolean;
    foodStations: boolean;
    lostAndFound: boolean;
    events: boolean;
    corporate: boolean;
    surrenderPrevention: boolean;
    vetFund: boolean;
    depositAssistance: boolean;
  };

  // Branding
  branding: {
    primaryColor: string; // Tailwind color name or hex
    logoUrl?: string;
    faviconUrl?: string;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// ============================================
// AUSTIN CONFIGURATION (DEFAULT)
// ============================================

export const cityConfig: CityConfig = {
  // Basic Info
  city: "Austin",
  state: "Texas",
  stateAbbrev: "TX",
  region: "Central Texas",
  tagline: "Helping Austin's community cats thrive",

  // Organization
  orgName: "Paws N Claws ATX",
  orgNameShort: "PawsNClaws ATX",
  ein: "", // Add when received
  founded: "2026",

  // Contact
  email: "hello@pawsandclawsatx.com",
  phone: undefined,
  address: {
    city: "Austin",
    state: "TX",
    zip: "78701",
  },

  // Social
  social: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    tiktok: undefined,
    youtube: undefined,
  },

  // Map Settings
  map: {
    center: [30.2672, -97.7431], // Austin, TX
    defaultZoom: 12,
  },

  // Local Resources
  resources: {
    shelterName: "Austin Animal Center",
    shelterUrl: "https://www.austintexas.gov/austin-animal-center",
    tnrProgram: "Austin Animal Center Community Cats",
    tnrUrl: "https://www.austintexas.gov/page/community-cats",
    emergencyVet: "Austin Vet Emergency",
    emergencyVetPhone: "512-343-8838",
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

  // Branding
  branding: {
    primaryColor: "amber",
    logoUrl: undefined,
    faviconUrl: undefined,
  },

  // SEO
  seo: {
    title: "PawsNClaws ATX - Austin Community Cat Support",
    description: "Supporting Austin's community cats through TNR, foster programs, and colony care. Help us help the cats of Austin, Texas.",
    keywords: [
      "Austin cats",
      "community cats",
      "TNR Austin",
      "cat rescue Austin",
      "feral cats Texas",
      "Austin animal rescue",
      "cat foster Austin",
    ],
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getCityName(): string {
  return cityConfig.city;
}

export function getOrgName(): string {
  return cityConfig.orgName;
}

export function getOrgNameShort(): string {
  return cityConfig.orgNameShort;
}

export function getMapCenter(): [number, number] {
  return cityConfig.map.center;
}

export function isFeatureEnabled(feature: keyof CityConfig["features"]): boolean {
  return cityConfig.features[feature];
}

export function getContactEmail(): string {
  return cityConfig.email;
}

export function getShelterInfo() {
  return cityConfig.resources;
}

export function getSocialLinks() {
  return Object.entries(cityConfig.social)
    .filter((entry) => entry[1])
    .map(([platform, url]) => ({ platform, url }));
}

// Export default for convenience
export default cityConfig;
