"use client";

import Link from "next/link";

// Note: This component will display real adoptable pets from Supabase
// or partner APIs when integrated. Until then, it shows a placeholder.

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

export function PetSpotlight({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">Featured Pet</h3>
          <span className="text-2xl">🐾</span>
        </div>
      </div>

      <div className="p-5 text-center">
        {/* Placeholder */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-48 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-2">🐱🐕</span>
            <span className="text-amber-700 text-sm">Coming Soon</span>
          </div>
        </div>

        <h4 className="font-bold text-gray-900 text-lg mb-2">
          Adoptable Pets Coming Soon
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          We&apos;re working on featuring real adoptable pets from local shelters and our foster network.
        </p>
        <Link
          href="/foster"
          className="block w-full py-2 bg-amber-500 text-white text-center font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          Learn About Fostering
        </Link>
      </div>
    </div>
  );
}

// Grid version - placeholder until real pets are available
export function PetGrid({ pets, className = "" }: { pets?: Pet[]; className?: string }) {
  // If real pets are passed, display them
  if (pets && pets.length > 0) {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {pets.map((pet, idx) => (
          <PetCard key={idx} pet={pet} />
        ))}
      </div>
    );
  }

  // Otherwise show placeholder
  return (
    <div className={`${className}`}>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
        <span className="text-4xl mb-4 block">🐾</span>
        <h3 className="font-bold text-blue-900 mb-2">Adoptable Pets Coming Soon</h3>
        <p className="text-blue-800 text-sm mb-4">
          We&apos;re working on featuring real adoptable pets from local shelters.
        </p>
        <Link
          href="/foster"
          className="inline-block px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          Become a Foster
        </Link>
      </div>
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
