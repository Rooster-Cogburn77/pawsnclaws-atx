import Link from "next/link";

interface SuccessStory {
  id: string;
  petName: string;
  species: "cat" | "dog";
  adopter: string;
  adoptedDate: string;
  story: string;
  beforeStatus: string;
  location: string;
  tags: string[];
}

const successStories: SuccessStory[] = [
  {
    id: "1",
    petName: "Whiskers",
    species: "cat",
    adopter: "The Martinez Family",
    adoptedDate: "December 2024",
    story: "Whiskers came to us as a scared stray, hiding under cars in a parking lot. After months of patient socialization in foster care, he blossomed into a lap cat who can't get enough cuddles. The Martinez family says he greets them at the door every day!",
    beforeStatus: "Scared stray",
    location: "North Austin",
    tags: ["Former stray", "Lap cat", "Family home"],
  },
  {
    id: "2",
    petName: "Duke",
    species: "dog",
    adopter: "Sarah & Tom",
    adoptedDate: "November 2024",
    story: "Duke was surrendered when his elderly owner could no longer care for him. At 8 years old, we worried he'd be overlooked. Sarah and Tom saw his gentle spirit immediately. Now Duke spends his golden years hiking Barton Creek and napping in sunbeams.",
    beforeStatus: "Senior surrender",
    location: "South Austin",
    tags: ["Senior dog", "Hiking buddy", "Gentle giant"],
  },
  {
    id: "3",
    petName: "Luna & Star",
    species: "cat",
    adopter: "James K.",
    adoptedDate: "October 2024",
    story: "These bonded sisters were born in a colony we manage. Our TNR team brought them in as kittens. James adopted them together, and they've turned his home office into their personal playground. They even help with Zoom calls!",
    beforeStatus: "TNR colony kittens",
    location: "East Austin",
    tags: ["Bonded pair", "Office cats", "Former colony cats"],
  },
  {
    id: "4",
    petName: "Buddy",
    species: "dog",
    adopter: "The Nguyen Family",
    adoptedDate: "September 2024",
    story: "Buddy was found wandering the streets, underweight and scared. With our vet fund covering his medical care and foster providing love, he transformed. He's now the family's loyal protector and their kids' best friend.",
    beforeStatus: "Street rescue",
    location: "Round Rock",
    tags: ["Medical rescue", "Family dog", "Kid-friendly"],
  },
  {
    id: "5",
    petName: "Mittens",
    species: "cat",
    adopter: "Dr. Patricia H.",
    adoptedDate: "August 2024",
    story: "Mittens lost her leg in an accident but never lost her spirit. Our deposit assistance program helped Patricia adopt her despite vet concerns. Mittens now rules the house and proves that three legs are more than enough!",
    beforeStatus: "Special needs",
    location: "Cedar Park",
    tags: ["Special needs", "Tripod cat", "Survivor"],
  },
  {
    id: "6",
    petName: "Rocky",
    species: "dog",
    adopter: "Mike & David",
    adoptedDate: "July 2024",
    story: "Rocky spent 6 months in the shelter before his foster saw past his \"difficult\" label. With training and patience, he became the sweetest boy. Mike and David adopted him, and now he's a certified therapy dog visiting nursing homes!",
    beforeStatus: "Long-term shelter dog",
    location: "West Austin",
    tags: ["Former \"difficult\" dog", "Therapy dog", "Training success"],
  },
];

export const metadata = {
  title: "Success Stories | PawsNClaws ATX",
  description: "Heartwarming adoption success stories from PawsNClaws ATX. See how rescued pets found their forever homes.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💕</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Success Stories Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every adoption creates a forever home. Meet some of our happily-ever-afters
            and see the transformations made possible by our community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">247</div>
            <div className="text-sm text-gray-600">Adoptions in 2024</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">98%</div>
            <div className="text-sm text-gray-600">Successful Placements</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">45</div>
            <div className="text-sm text-gray-600">Senior Pets Adopted</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">32</div>
            <div className="text-sm text-gray-600">Special Needs Saved</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium">
            All Stories
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">
            🐱 Cats
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">
            🐕 Dogs
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">
            Senior Pets
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">
            Special Needs
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Placeholder */}
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-48 flex items-center justify-center relative">
                <span className="text-6xl opacity-50">
                  {story.species === "cat" ? "🐱" : "🐕"}
                </span>
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {story.adoptedDate}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{story.petName}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Adopted
                  </span>
                </div>
                <p className="text-sm text-amber-600 mb-3">
                  Adopted by {story.adopter} • {story.location}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {story.story}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Before Status */}
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>Before:</span>
                  <span className="font-medium">{story.beforeStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Story */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">📸</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share Your Story!
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Adopted from PawsNClaws ATX or one of our partner rescues? We'd love to
            feature your furry family member in our gallery!
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Write Your Own Success Story?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quiz"
              className="px-6 py-3 bg-white text-amber-600 font-bold rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-colors"
            >
              Take the Pet Match Quiz
            </Link>
            <Link
              href="/foster"
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
            >
              See Adoptable Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
