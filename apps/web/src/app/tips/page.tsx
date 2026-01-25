import Link from "next/link";

const tipCategories = [
  {
    id: "new-pet",
    title: "Bringing Home a New Pet",
    emoji: "🏠",
    tips: [
      {
        title: "Set Up a Safe Space",
        content: "Before bringing your new pet home, prepare a quiet room with food, water, litter/pee pads, and a comfy bed. This gives them a safe place to decompress.",
      },
      {
        title: "Go Slow with Introductions",
        content: "If you have other pets, don't rush introductions. Use the 'two-week shutdown' method: keep the new pet separate for at least a few days, then gradually introduce through scent swapping and supervised meetings.",
      },
      {
        title: "Stick to a Routine",
        content: "Pets thrive on routine. Feed at the same times, keep sleeping areas consistent, and establish regular play times. This helps them feel secure.",
      },
      {
        title: "Be Patient",
        content: "It takes about 3 days for initial decompression, 3 weeks to learn routines, and 3 months to feel truly at home. The '3-3-3 rule' is real!",
      },
    ],
  },
  {
    id: "cat-care",
    title: "Cat Care Basics",
    emoji: "🐱",
    tips: [
      {
        title: "Litter Box Rule",
        content: "The golden rule: one litter box per cat, plus one extra. Place them in quiet, accessible locations away from food and water.",
      },
      {
        title: "Scratching is Natural",
        content: "Cats NEED to scratch - it's not bad behavior. Provide multiple scratching posts (vertical and horizontal) and place them near sleeping areas and entrances.",
      },
      {
        title: "Play Daily",
        content: "Interactive play (wand toys, laser pointers) for 15-20 minutes daily prevents behavior problems and keeps cats mentally stimulated.",
      },
      {
        title: "Vertical Space",
        content: "Cats love to climb and observe from high places. Cat trees, shelves, or even cleared bookshelf space gives them confidence and territory.",
      },
    ],
  },
  {
    id: "dog-care",
    title: "Dog Care Basics",
    emoji: "🐕",
    tips: [
      {
        title: "Exercise Needs Vary",
        content: "A tired dog is a good dog, but needs vary by breed and age. Most dogs need at least 30-60 minutes of activity daily - walks, play, or training.",
      },
      {
        title: "Positive Reinforcement Works",
        content: "Reward good behavior with treats, praise, and play. Punishment creates fear and anxiety. Redirect unwanted behaviors to appropriate alternatives.",
      },
      {
        title: "Crate Training Benefits",
        content: "A crate isn't punishment - it's a safe den. Introduce it positively with treats and meals. Never use it for longer than your dog can hold their bladder.",
      },
      {
        title: "Socialization Window",
        content: "Puppies have a critical socialization period (3-14 weeks). Expose them to different people, places, sounds, and surfaces in positive ways.",
      },
    ],
  },
  {
    id: "health",
    title: "Health & Wellness",
    emoji: "💊",
    tips: [
      {
        title: "Preventive Care",
        content: "Annual vet visits, vaccinations, and parasite prevention (fleas, ticks, heartworm) prevent serious illness and save money long-term.",
      },
      {
        title: "Dental Health Matters",
        content: "Dental disease affects 80% of dogs and 70% of cats by age 3. Brush teeth regularly or provide dental treats and annual cleanings.",
      },
      {
        title: "Know the Warning Signs",
        content: "Watch for: loss of appetite, lethargy, vomiting/diarrhea, difficulty breathing, changes in water intake, or behavior changes. When in doubt, call your vet.",
      },
      {
        title: "Pet First Aid Kit",
        content: "Keep gauze, adhesive tape, hydrogen peroxide (for poison - only if vet advises), tweezers, and your vet's number handy. Know the nearest emergency vet.",
      },
    ],
  },
  {
    id: "behavior",
    title: "Common Behavior Issues",
    emoji: "🧠",
    tips: [
      {
        title: "Anxiety Management",
        content: "Separation anxiety and noise phobias are common. Create positive associations, use calming aids (Adaptil/Feliway), and consult a vet for severe cases.",
      },
      {
        title: "Litter Box Problems",
        content: "Cats avoiding the litter box often have a reason: medical issues, dirty box, wrong location, or stress. Rule out health problems first.",
      },
      {
        title: "Excessive Barking",
        content: "Dogs bark to communicate. Identify the trigger (boredom, alert, anxiety) and address the root cause rather than just the symptom.",
      },
      {
        title: "Resource Guarding",
        content: "If your pet guards food, toys, or spaces, work with a professional trainer. Never punish - teach them that good things happen when people approach.",
      },
    ],
  },
  {
    id: "budget",
    title: "Pet Care on a Budget",
    emoji: "💰",
    tips: [
      {
        title: "Low-Cost Vet Options",
        content: "Emancipet, Austin Humane Society, and PAWS offer affordable vet care. Many pet stores offer free vaccine clinics.",
      },
      {
        title: "DIY Enrichment",
        content: "Cardboard boxes, paper bags, and homemade puzzle feeders (muffin tin + tennis balls) provide free entertainment.",
      },
      {
        title: "Buy in Bulk",
        content: "Stock up on food and litter when on sale. Store properly to maintain freshness. Costco and Chewy often have the best prices.",
      },
      {
        title: "Pet Insurance Considerations",
        content: "For young pets, insurance can be worth it. Compare plans and read the fine print. Some conditions are excluded.",
      },
    ],
  },
];

export const metadata = {
  title: "Pet Care Tips | PawsNClaws ATX",
  description: "Helpful tips for pet owners on bringing home a new pet, basic care, health, behavior, and budget-friendly pet care in Austin.",
};

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">💡</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Care Tips
          </h1>
          <p className="text-gray-600">
            Practical advice for keeping your pets happy and healthy.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tipCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-amber-100 transition-colors shadow-sm"
            >
              {cat.emoji} {cat.title}
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {tipCategories.map((category) => (
            <section key={category.id} id={category.id}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.emoji}</span>
                {category.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {category.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-400"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Resources CTA */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-green-900 mb-2">
            Need More Help?
          </h3>
          <p className="text-sm text-green-800 mb-4">
            Check out our comprehensive resources page for Austin-specific pet services,
            or reach out if you need assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              View Resources
            </Link>
            <Link
              href="/help"
              className="px-6 py-2 bg-white text-green-700 font-medium rounded-lg border border-green-300 hover:bg-green-50 transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
