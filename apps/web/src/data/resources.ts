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
      {
        name: "Prickly Pear Pet Vaccines",
        description: "Walk-in vaccine clinic. Veteran/women-owned. $15-50 vaccines, no appointment needed.",
        address: "9900 S Interstate 35, Bldg 42, Ste P480, Austin, TX 78748",
        phone: "(737) 202-4836",
        website: "https://pricklypearvetaustin.com",
        hours: "Tue-Sat (check website)",
        tags: ["vaccines", "walk-in", "low-cost"],
      },
      {
        name: "ATX Animal Clinic",
        description: "Full-service affordable vet. Wellness, dental, spay/neuter, surgery. Est. 2012.",
        address: "8033 Mesa Dr, Austin, TX 78731",
        phone: "(512) 338-4300",
        website: "https://atxanimalclinic.com",
        hours: "Mon-Fri 8am-6pm",
        tags: ["full-service", "dental", "low-cost"],
      },
      {
        name: "Vanguard Veterinary Associates",
        description: "Mobile low-cost vaccination clinic serving Austin since 1994. Check calendar for locations.",
        phone: "(210) 444-9237",
        website: "https://vanguardvet.com/calendar-austin/",
        tags: ["vaccines", "mobile", "low-cost"],
      },
      {
        name: "ASAP Vet",
        description: "Austin's only locally-owned urgent care vet. Same-day walk-ins for non-emergencies.",
        website: "https://asapvetatx.com",
        tags: ["urgent-care", "walk-in", "affordable"],
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
        name: "Pet Resource Center (Austin Animal Services)",
        description: "FREE pet food, supplies, collars, leashes, microchips for those facing hardship.",
        address: "7201 Levander Loop, Bldg A, Austin, TX 78702",
        phone: "(512) 978-0500",
        hours: "Mon-Fri 11am-4pm",
        tags: ["food", "free", "supplies", "city"],
      },
      {
        name: "Austin Pet Food Bank",
        description: "501(c)(3) feeding Travis County's pets. Drop off at any Petco, Taurus Academy, or Pet Supply Plus.",
        phone: "(512) 773-4371",
        website: "https://austinpetfoodbank.org",
        tags: ["food", "free", "nonprofit"],
      },
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
        name: "PALS Program (Meals on Wheels)",
        description: "FREE pet food delivery and vet care for elderly/disabled Meals on Wheels clients.",
        website: "https://mealsonwheelscentraltexas.org/programs/pals",
        tags: ["food", "seniors", "delivery", "vet-care"],
      },
      {
        name: "Friends of Pflugerville - Feeding Friends",
        description: "Week's worth of food for up to 3 pets, delivered. For Pflugerville residents.",
        website: "https://friendsofpas.org/program",
        tags: ["food", "pflugerville", "delivery"],
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
      {
        name: "Classic Canines",
        description: "No-kill shelter focused on senior dog advocacy. Medical sponsorship and adoption.",
        website: "https://classiccanines.org",
        tags: ["rescue", "senior-dogs", "no-kill"],
      },
      {
        name: "Love-A-Bull",
        description: "Foster-based rescue for pit bull-type dogs. 100% volunteer-run.",
        website: "https://love-a-bull.org",
        tags: ["rescue", "pit-bulls", "foster"],
      },
      {
        name: "Forgotten Friends Mixed Breed Rescue",
        description: "Operating since 1999. Takes in mixed breed dogs who might otherwise be forgotten.",
        website: "https://forgottenfriendstx.org",
        tags: ["rescue", "mixed-breeds", "foster"],
      },
      {
        name: "New Hope Animal Rescue",
        description: "Provides homeless, sick, and abandoned dogs and cats with vet care and shelter.",
        website: "https://nhanimalrescue.org",
        tags: ["rescue", "dogs", "cats"],
      },
    ],
  },
  {
    id: "breed-rescues",
    title: "Breed-Specific Rescues",
    description: "Rescues focused on specific breeds",
    icon: "paw",
    resources: [
      {
        name: "Gold Ribbon Rescue",
        description: "All-volunteer Golden Retriever rescue. Lifetime homes regardless of age or medical condition.",
        phone: "(512) 659-4653",
        website: "https://grr-tx.com",
        tags: ["golden-retriever", "rescue"],
      },
      {
        name: "Austin German Shepherd Dog Rescue",
        description: "Rescuing, rehabilitating, and re-homing German Shepherds from across Texas.",
        website: "https://austingermanshepherdrescue.org",
        tags: ["german-shepherd", "rescue"],
      },
      {
        name: "Texas Husky Rescue",
        description: "501(c)(3) all-volunteer org. Over 2,500 huskies rescued since 2009.",
        website: "https://texashuskyrescue.org",
        tags: ["husky", "rescue"],
      },
      {
        name: "Austin Boxer Rescue",
        description: "Best Friends partner. Adoption days every other Saturday at Brown Elementary.",
        website: "https://austinboxerrescue.com",
        tags: ["boxer", "rescue"],
      },
      {
        name: "Ay Chihuahua Rescue",
        description: "Volunteer-operated rescue for Chihuahuas in Central Texas. All dogs in foster homes.",
        phone: "(512) 763-0244",
        website: "https://aychihuahuarescue.org",
        tags: ["chihuahua", "rescue", "small-dogs"],
      },
      {
        name: "Texas Chihuahua Rescue",
        description: "Saving the second most euthanized dog breed in Texas.",
        website: "https://texaschihuahua.org",
        tags: ["chihuahua", "rescue", "small-dogs"],
      },
      {
        name: "Hound Rescue",
        description: "Platinum-rated nonprofit rescuing beagles and beagle mixes.",
        website: "https://houndrescue.org",
        tags: ["beagle", "hound", "rescue"],
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
        name: "Austin Wildlife Rescue",
        description: "Austin's only wildlife rehab with intake facility. 10,000+ animals/year since 1977.",
        address: "5401 E Martin Luther King Blvd, Austin, TX 78721",
        phone: "(512) 472-9453",
        website: "https://austinwildliferescue.org",
        hours: "Daily 9am-4pm",
        tags: ["wildlife", "rehabilitation", "intake"],
      },
      {
        name: "Austin Area Wildlife Rehabilitation",
        description: "501(c)(3) nonprofit for wildlife rehabilitation, education, and conservation.",
        website: "https://austinareawildliferehab.org",
        tags: ["wildlife", "rehabilitation", "education"],
      },
      {
        name: "All Things Wild (Georgetown)",
        description: "Wildlife rehabilitation center for injured and orphaned animals.",
        website: "https://allthingswildrehab.org",
        tags: ["wildlife", "rehabilitation", "georgetown"],
      },
      {
        name: "Austin Animal Services Wildlife Officers",
        description: "City program for humane wildlife conflict resolution in Austin/Travis County.",
        phone: "(512) 978-0500",
        website: "https://austintexas.gov/page/wildlife",
        tags: ["wildlife", "city", "conflicts"],
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
        name: "Every Dog Behavior and Training",
        description: "NONPROFIT with certified trainers. Puppy classes, agility, fear/aggression help.",
        website: "https://everydogaustin.org",
        tags: ["training", "nonprofit", "behavior"],
      },
      {
        name: "The Dog Alliance (Cedar Park)",
        description: "Nonprofit training. FREE service dogs for TX veterans with PTSD/TBI/mobility needs.",
        website: "https://thedogalliance.org",
        tags: ["training", "nonprofit", "veterans", "service-dogs"],
      },
      {
        name: "Tip Top K9 Austin",
        description: "$1 first lesson with assessment. Lifetime group class support included.",
        website: "https://tiptopk9.com",
        tags: ["training", "affordable", "anxiety"],
      },
      {
        name: "South Austin Dog Center",
        description: "Positive reinforcement training. Specializes in reactivity, fear, anxiety.",
        website: "https://atxdogtrainer.com",
        tags: ["training", "positive-reinforcement", "behavior"],
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialty Animal Rescues",
    description: "Rescues for rabbits, guinea pigs, reptiles, and more",
    icon: "specialty",
    resources: [
      {
        name: "House Rabbit Resource Network",
        description: "501(c)(3) rabbit-only shelter 15 min from Austin. Est. 1993. Offers Bunny Yoga!",
        website: "https://rabbitresource.org",
        tags: ["rabbits", "rescue", "adoption"],
      },
      {
        name: "Austin Guinea Pig Rescue",
        description: "Rescuing guinea pigs, hamsters, gerbils, hedgehogs, chinchillas since 2005.",
        website: "https://austinguineapigrescue.com",
        tags: ["guinea-pigs", "small-animals", "rescue"],
      },
      {
        name: "Nature's Edge Wildlife and Reptile Rescue",
        description: "501(c)(3) exotic reptile rescue. Takes all unwanted pet reptiles/amphibians.",
        website: "https://newrr.org",
        tags: ["reptiles", "amphibians", "rescue"],
      },
      {
        name: "Texas Parrot Rescue",
        description: "Specializes in African greys, conures, senegals, macaws. Forever-home sanctuary.",
        website: "https://texasparrotrescue.wixsite.com/website",
        tags: ["birds", "parrots", "sanctuary"],
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
