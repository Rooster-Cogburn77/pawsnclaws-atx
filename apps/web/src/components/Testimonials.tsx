"use client";


// Note: This component is ready to display real testimonials
// when approved by the people quoted. Until then, it shows
// a placeholder encouraging visitors to share their stories.

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className = "" }: TestimonialsProps) {
  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <span className="text-4xl mb-4 block">💬</span>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Share Your Story
        </h3>
        <p className="text-gray-600 mb-4">
          Has PawsNClaws ATX helped you or your pet? We&apos;d love to hear from you.
          With your permission, your story could inspire others.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          Share Your Experience
        </a>
      </div>
    </div>
  );
}

// Grid version - placeholder until real testimonials are collected
export function TestimonialsGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 text-center">
        <span className="text-4xl mb-4 block">🐾</span>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Community Stories Coming Soon
        </h3>
        <p className="text-gray-600 text-sm">
          We&apos;re collecting real stories from our community.
          Check back soon or share your own experience!
        </p>
      </div>
    </div>
  );
}

// Single testimonial card - for use when we have real approved testimonials
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating?: number;
  approved: boolean; // Must be true to display
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Safety check - never display unapproved testimonials
  if (!testimonial.approved) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
      {testimonial.rating && (
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-amber-500">★</span>
          ))}
        </div>
      )}
      <blockquote className="text-gray-700 italic mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
          <span className="text-amber-700 font-bold">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-medium text-gray-900">{testimonial.author}</div>
          <div className="text-xs text-gray-500">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
