/**
 * Success Stories Data
 *
 * Add new stories here - they'll automatically appear on the /stories page.
 * All stories should have explicit permission from those involved.
 */

export interface Story {
  id: string;
  title: string;
  summary: string;
  content: string; // Can include markdown
  category: "adoption" | "family" | "tnr" | "volunteer" | "rescue";
  date: string; // YYYY-MM-DD
  location?: string;
  image?: string; // Path to image in /public
  featured?: boolean;
  // Optional details
  petName?: string;
  petType?: "cat" | "dog" | "other";
  submittedBy?: string; // "Anonymous" if not provided
}

export const stories: Story[] = [
  // TEMPLATE - Copy this to add a new story:
  // {
  //   id: "unique-story-id",
  //   title: "Story Title",
  //   summary: "One sentence summary for cards",
  //   content: `
  //     Full story content here. Can be multiple paragraphs.
  //
  //     Second paragraph here.
  //   `,
  //   category: "adoption", // adoption | family | tnr | volunteer | rescue
  //   date: "2025-01-25",
  //   location: "Austin, TX",
  //   petName: "Whiskers",
  //   petType: "cat",
  //   featured: true,
  // },

  // Add real stories below as they come in:
];

// Helper functions
export function getFeaturedStories(): Story[] {
  return stories.filter(s => s.featured).slice(0, 3);
}

export function getStoriesByCategory(category: Story["category"]): Story[] {
  return stories.filter(s => s.category === category);
}

export function getRecentStories(count: number = 5): Story[] {
  return [...stories]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export const categoryLabels: Record<Story["category"], string> = {
  adoption: "Adoption Stories",
  family: "Families Kept Together",
  tnr: "TNR Success",
  volunteer: "Volunteer Spotlights",
  rescue: "Rescue Stories",
};

export const categoryIcons: Record<Story["category"], string> = {
  adoption: "🏠",
  family: "💕",
  tnr: "✂️",
  volunteer: "🤝",
  rescue: "🚑",
};
