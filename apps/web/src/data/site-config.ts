/**
 * Site-wide configuration.
 * Update these values to customize the site.
 */

export const siteConfig = {
  name: "PawsNClaws ATX",
  tagline: "Helping Austin's Animals",
  description:
    "A community initiative connecting Austin with resources to help local animals - strays, rescues, and pets in need.",

  // Contact & social
  email: "hello@pawsnclaws.org", // Update when you have one

  // Navigation
  nav: [
    { label: "Home", href: "/" },
    { label: "Donate", href: "/donate" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Map", href: "/map" },
    { label: "Resources", href: "/resources" },
    { label: "Impact", href: "/impact" },
    { label: "About", href: "/about" },
  ],

  // Hero section
  hero: {
    title: "Every Animal Deserves Help",
    subtitle:
      "We connect Austin with resources to help local animals - whether you're feeding strays, looking for low-cost vet care, or want to volunteer.",
    cta: {
      primary: { label: "See How to Help", href: "/get-involved" },
      secondary: { label: "Find Resources", href: "/resources" },
    },
  },

  // Quick facts for homepage
  facts: [
    {
      stat: "70,000+",
      label: "Stray cats in Austin",
      detail: "Community cats need TNR and care",
    },
    {
      stat: "15,000+",
      label: "Animals enter shelters yearly",
      detail: "Austin works hard to keep live outcomes high",
    },
    {
      stat: "90%+",
      label: "Live outcome rate",
      detail: "Austin is a no-kill city for over a decade",
    },
  ],

  // Footer
  footer: {
    mission:
      "PawsNClaws ATX is a community initiative to help Austin's animals. We don't operate a shelter - we connect people with resources and each other.",
    disclaimer:
      "We are not affiliated with any shelter or rescue. Always verify information directly with organizations.",
  },

  // External links for donations (until we have our own)
  donationLinks: [
    {
      name: "Austin Pets Alive!",
      url: "https://austinpetsalive.org/donate",
      description: "Donate directly to APA!",
    },
    {
      name: "Austin Animal Center Foundation",
      url: "https://www.austintexas.gov/department/support-animal-center",
      description: "Support the city shelter",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
