/**
 * Austin-area resources for pet owners and animal helpers.
 * Easy to update - just add/edit entries here.
 */

export interface Resource {
  name: string;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  tags: string[];
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  resources: Resource[];
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: "low-cost-vet",
    title: "Low-Cost Veterinary Care",
    description: "Affordable vet services for those who need help",
    icon: "heart",
    resources: [
      {
        name: "Emancipet",
        description: "Nonprofit providing low-cost spay/neuter, vaccines, and basic care",
        address: "Multiple Austin locations",
        phone: "(512) 587-7729",
        website: "https://emancipet.org",
        tags: ["spay-neuter", "vaccines", "low-cost"],
      },
      {
        name: "Austin Humane Society Clinic",
        description: "Low-cost wellness services and spay/neuter",
        address: "124 W Anderson Ln, Austin, TX 78752",
        phone: "(512) 646-7387",
        website: "https://austinhumanesociety.org",
        tags: ["spay-neuter", "wellness", "low-cost"],
      },
      {
        name: "Austin Pets Alive! Clinic",
        description: "Public vet clinic with affordable services",
        address: "1156 W Cesar Chavez St, Austin, TX 78703",
        phone: "(512) 961-6519",
        website: "https://austinpetsalive.org",
        tags: ["general-care", "low-cost"],
      },
      {
        name: "PAWS Shelter Clinic",
        description: "Low-cost spay/neuter and vaccines in Kyle",
        address: "107 Hallie Cv, Kyle, TX 78640",
        phone: "(512) 268-1121",
        website: "https://pawsshelter.org",
        tags: ["spay-neuter", "vaccines", "kyle"],
      },
    ],
  },
  {
    id: "food-assistance",
    title: "Pet Food Assistance",
    description: "Help feeding your pets when times are tough",
    icon: "bowl",
    resources: [
      {
        name: "Austin Pets Alive! Pet Food Pantry",
        description: "Free pet food for Austin residents in need",
        address: "1156 W Cesar Chavez St, Austin, TX 78703",
        website: "https://austinpetsalive.org",
        tags: ["food", "free"],
      },
      {
        name: "Central Texas Food Bank - Pet Food",
        description: "Pet food available at many food bank distributions",
        website: "https://centraltexasfoodbank.org",
        tags: ["food", "free"],
      },
      {
        name: "Meals on Wheels - Pet Program",
        description: "Pet food delivery for homebound seniors",
        phone: "(512) 476-6325",
        website: "https://mealsonwheelscentraltexas.org",
        tags: ["food", "seniors", "delivery"],
      },
    ],
  },
  {
    id: "tnr",
    title: "TNR (Trap-Neuter-Return)",
    description: "Resources for managing community cat colonies",
    icon: "scissors",
    resources: [
      {
        name: "Austin Animal Center TNR Program",
        description: "Free TNR services for community cats in Austin",
        phone: "(512) 978-0500",
        website: "https://www.austintexas.gov/page/community-cats",
        tags: ["tnr", "free", "community-cats"],
      },
      {
        name: "Austin Humane Society Community Cats",
        description: "TNR program running since 2007, 85,000+ cats served. Clinics Wed/Thu.",
        address: "124 W Anderson Ln, Austin, TX 78752",
        phone: "(512) 646-7387",
        website: "https://austinhumanesociety.org/programs/community-cat-program/",
        tags: ["tnr", "community-cats", "clinic"],
      },
      {
        name: "Campus Cat Coalition (UT Austin)",
        description: "Volunteer caretakers managing ~40 cats on UT campus. Reduced population from 100+ through TNR since 2000s.",
        address: "UT Austin Campus / Waller Creek Area",
        website: "https://thedailytexan.com/2015/11/25/ut-policies-control-campus-cat-colonies/",
        tags: ["tnr", "community-cats", "ut-austin", "volunteer"],
      },
      {
        name: "Meow Mates (UT Student Org)",
        description: "Student organization (~20 students) helping care for stray cats in the West Campus area near UT Austin.",
        address: "West Campus, Austin, TX",
        website: "https://thedailytexan.com/2024/09/15/a-helping-hand-students-start-new-organization-to-take-care-of-west-campus-stray-cats/",
        tags: ["community-cats", "ut-austin", "volunteer", "west-campus", "students"],
      },
      {
        name: "Shadow Cats Rescue",
        description: "TNR assistance and feral cat resources in Round Rock area",
        address: "PO Box 720, Round Rock, TX 78680",
        website: "https://shadowcats.net",
        tags: ["tnr", "feral", "rescue", "round-rock"],
      },
      {
        name: "Street Cat Rescue",
        description: "TNR program in Austin/Round Rock, feeds 100+ TNR'd cats daily",
        address: "PO Box 2524, Round Rock, TX 78680",
        website: "https://streetcatrescue.org",
        tags: ["tnr", "community-cats", "round-rock"],
      },
      {
        name: "Central Texas Feline Rescue",
        description: "Manages 13-20 feral cat colonies in Round Rock area, caring for 145-200+ cats daily",
        website: "https://www.centraltexasfelinerescue.com/",
        tags: ["tnr", "feral", "colonies", "round-rock"],
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency & After-Hours",
    description: "When your pet needs help right now",
    icon: "alert",
    resources: [
      {
        name: "Austin Vet Care at Central Park",
        description: "24/7 emergency veterinary hospital",
        address: "4106 N Lamar Blvd, Austin, TX 78756",
        phone: "(512) 459-4336",
        hours: "24/7",
        tags: ["emergency", "24-hour"],
      },
      {
        name: "Emergency Animal Hospital of NW Austin",
        description: "Emergency and critical care",
        address: "12034 Research Blvd, Austin, TX 78759",
        phone: "(512) 331-6121",
        hours: "24/7",
        tags: ["emergency", "24-hour"],
      },
      {
        name: "Austin Animal Center",
        description: "City shelter - report strays, injured animals",
        address: "7201 Levander Loop, Austin, TX 78702",
        phone: "311 (within Austin) or (512) 974-2000",
        website: "https://www.austintexas.gov/austin-animal-center",
        tags: ["shelter", "strays", "injured"],
      },
    ],
  },
  {
    id: "shelters-rescue",
    title: "Shelters & Rescues",
    description: "Local organizations saving lives",
    icon: "home",
    resources: [
      {
        name: "Austin Animal Center",
        description: "City of Austin's open-intake shelter",
        address: "7201 Levander Loop, Austin, TX 78702",
        phone: "(512) 978-0500",
        website: "https://www.austintexas.gov/austin-animal-center",
        tags: ["shelter", "adoption", "city"],
      },
      {
        name: "Austin Pets Alive!",
        description: "No-kill rescue focused on saving at-risk animals",
        address: "1156 W Cesar Chavez St, Austin, TX 78703",
        phone: "(512) 961-6519",
        website: "https://austinpetsalive.org",
        tags: ["rescue", "no-kill", "adoption"],
      },
      {
        name: "Austin Humane Society",
        description: "No-kill shelter with adoption and programs",
        address: "124 W Anderson Ln, Austin, TX 78752",
        phone: "(512) 646-7387",
        website: "https://austinhumanesociety.org",
        tags: ["shelter", "no-kill", "adoption"],
      },
      {
        name: "Divine Canines",
        description: "Service dog training using rescue dogs",
        website: "https://divinecanines.org",
        tags: ["rescue", "service-dogs", "training"],
      },
      {
        name: "Jack Jack's Pack Street Dog Rescue",
        description: "Grassroots rescue saving street dogs in Central Texas - 2,600+ dogs rescued since 2021",
        address: "Pflugerville, TX",
        website: "https://jackjackspack.org",
        tags: ["rescue", "street-dogs", "foster"],
      },
    ],
  },
];

// Quick lookup helpers
export function getResourcesByTag(tag: string): Resource[] {
  return resourceCategories.flatMap((cat) =>
    cat.resources.filter((r) => r.tags.includes(tag))
  );
}

export function searchResources(query: string): Resource[] {
  const q = query.toLowerCase();
  return resourceCategories.flatMap((cat) =>
    cat.resources.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
    )
  );
}
