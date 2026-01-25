"use client";

import Link from "next/link";

interface Pet {
  name: string;
  species: "cat" | "dog";
  breed?: string;
  age: string;
  description: string;
  traits: string[];
  status: "available" | "pending" | "adopted";
  photo?: string;
}

// Sample pets - would come from Supabase or partner API
const featuredPets: Pet[] = [
  {
    name: "Butterscotch",
    species: "cat",
    breed: "Orange Tabby",
    age: "2 years",
    description: "Butterscotch is a laid-back lovebug who enjoys chin scratches and sunbeams. He gets along great with other cats!",
    traits: ["Good with cats", "Lap cat", "Indoor only"],
    status: "available",
  },
  {
    name: "Luna",
    species: "cat",
    breed: "Tuxedo",
    age: "1 year",
    description: "Luna is playful and curious. She loves feather toys and will 'help' with your work from home setup.",
    traits: ["Playful", "Young", "First-time owner friendly"],
    status: "available",
  },
  {
    name: "Buddy",
    species: "dog",
    breed: "Lab Mix",
    age: "4 years",
    description: "Buddy is a gentle giant who loves walks and belly rubs. He's great with kids and other dogs.",
    traits: ["Good with kids", "Good with dogs", "House trained"],
    status: "pending",
  },
];

export function PetSpotlight({ className = "" }: { className?: string }) {
  const pet = featuredPets[Math.floor(Math.random() * featuredPets.length)];
  const petEmoji = pet.species === "cat" ? "🐱" : "🐕";

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">Pet of the Week</h3>
          <span className="text-2xl">{petEmoji}</span>
        </div>
      </div>

      <div className="p-5">
        {/* Pet Image Placeholder */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-48 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-6xl opacity-50">{petEmoji}</span>
        </div>

        {/* Pet Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-gray-900 text-xl">{pet.name}</h4>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                pet.status === "available"
                  ? "bg-green-100 text-green-700"
                  : pet.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {pet.status === "available" ? "Available" : pet.status === "pending" ? "Adoption Pending" : "Adopted"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {pet.breed} • {pet.age}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4">{pet.description}</p>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.traits.map((trait, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* CTA */}
        {pet.status === "available" && (
          <Link
            href="/foster"
            className="block w-full py-2 bg-amber-500 text-white text-center font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            Inquire About {pet.name}
          </Link>
        )}
      </div>
    </div>
  );
}

// Grid version for showing multiple pets
export function PetGrid({ pets = featuredPets, className = "" }: { pets?: Pet[]; className?: string }) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {pets.map((pet, idx) => (
        <PetCard key={idx} pet={pet} />
      ))}
    </div>
  );
}

function PetCard({ pet }: { pet: Pet }) {
  const petEmoji = pet.species === "cat" ? "🐱" : "🐕";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-40 flex items-center justify-center relative">
        <span className="text-5xl opacity-50">{petEmoji}</span>
        {pet.status !== "available" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {pet.status === "pending" ? "Adoption Pending" : "Adopted!"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-bold text-gray-900">{pet.name}</h4>
        <p className="text-sm text-gray-600 mb-2">
          {pet.breed} • {pet.age}
        </p>
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{pet.description}</p>
        {pet.status === "available" && (
          <Link
            href="/foster"
            className="text-amber-600 text-sm font-medium hover:underline"
          >
            Learn More →
          </Link>
        )}
      </div>
    </div>
  );
}
