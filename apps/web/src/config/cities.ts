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
      { label: "Map", href: "/map" },
      { label: "Resources", href: "/resources" },
      { label: "Get Help", href: "/help" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Foster", href: "/foster" },
    ],
    emergency: [
      { name: "Austin 311", phone: "311" },
      { name: "Emergency Vets", phone: "/resources#emergency" },
    ],
    email: "hello@pawsandclawsatx.com",
  },
  charlotte: {
    slug: "charlotte",
    name: "PawsNClaws CLT",
    shortName: "CLT",
    tagline: "Supporting Charlotte's community cats",
    color: {
      primary: "bg-teal-600",
      primaryHover: "hover:bg-teal-700",
      accent: "text-teal-600",
    },
    nav: [
      { label: "Map", href: "/cities/charlotte/map" },
      { label: "Resources", href: "/cities/charlotte/resources" },
      { label: "Get Help", href: "/cities/charlotte/help" },
      { label: "Volunteer", href: "/cities/charlotte/volunteer" },
      { label: "Foster", href: "/cities/charlotte/foster" },
    ],
    emergency: [
      { name: "CARE Charlotte", phone: "(704) 457-2300" },
      { name: "VEG Charlotte", phone: "(980) 880-6062" },
    ],
    email: "charlotte@pawsandclawsatx.com",
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
