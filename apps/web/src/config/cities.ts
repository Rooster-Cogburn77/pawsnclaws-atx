export interface CityRepresentative {
  name: string;
  title: string;
  photo?: string; // Path to image in /public
  bio?: string; // One-liner
}

export interface CityConfig {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  color: {
    primary: string;
    primaryHover: string;
    accent: string;
  };
  nav: { label: string; href: string }[];
  emergency: {
    name: string;
    phone: string;
  }[];
  email: string;
  representatives: CityRepresentative[];
}

export const cities: Record<string, CityConfig> = {
  austin: {
    slug: "austin",
    name: "PawsNClaws ATX",
    shortName: "ATX",
    tagline: "Austin's community animal support network",
    color: {
      primary: "bg-amber-500",
      primaryHover: "hover:bg-amber-600",
      accent: "text-amber-500",
    },
    nav: [
      { label: "Home", href: "/" },
      { label: "Get Help", href: "/help" },
      { label: "Map", href: "/map" },
      { label: "Resources", href: "/resources" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Foster", href: "/foster" },
      { label: "About", href: "/about" },
    ],
    emergency: [
      { name: "Austin 311", phone: "311" },
      { name: "Emergency Vets", phone: "/resources#emergency" },
    ],
    email: "hello@pawsandclawsatx.com",
    representatives: [
      {
        name: "Bryan Moore",
        title: "Founder & Austin Lead",
        bio: "Keeping Austin pets and people together since 2024.",
      },
    ],
  },
  charlotte: {
    slug: "charlotte",
    name: "PawsNClaws CLT",
    shortName: "CLT",
    tagline: "Helping Charlotte pets and people stay together",
    color: {
      primary: "bg-teal-600",
      primaryHover: "hover:bg-teal-700",
      accent: "text-teal-600",
    },
    nav: [
      { label: "Home", href: "/cities/charlotte" },
      { label: "Get Help", href: "/cities/charlotte/help" },
      { label: "Map", href: "/cities/charlotte/map" },
      { label: "Resources", href: "/cities/charlotte/resources" },
      { label: "Volunteer", href: "/cities/charlotte/volunteer" },
      { label: "Foster", href: "/cities/charlotte/foster" },
      { label: "About", href: "/cities/charlotte/about" },
    ],
    emergency: [
      { name: "CARE Charlotte", phone: "(704) 457-2300" },
      { name: "VEG Charlotte", phone: "(980) 880-6062" },
    ],
    email: "charlotte@pawsandclawsatx.com",
    // Add your Charlotte rep here:
    // representatives: [
    //   {
    //     name: "Name Here",
    //     title: "Charlotte City Lead",
    //     bio: "Short bio here.",
    //   },
    // ],
    representatives: [],
  },
};

export const defaultCity = "austin";

export function getCityFromPath(pathname: string): CityConfig {
  if (pathname.startsWith("/cities/charlotte")) {
    return cities.charlotte;
  }
  return cities.austin;
}

export function getCityDonateLink(city: CityConfig): string {
  return city.slug === "austin" ? "/donate" : `/cities/${city.slug}/donate`;
}

export function getCityHomeLink(city: CityConfig): string {
  return city.slug === "austin" ? "/" : `/cities/${city.slug}`;
}
