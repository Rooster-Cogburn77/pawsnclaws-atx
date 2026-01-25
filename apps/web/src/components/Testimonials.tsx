"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "PawsNClaws ATX helped us through a tough time. The deposit assistance program meant we could keep our beloved cat when we moved.",
    author: "Maria S.",
    role: "Pet Owner",
    rating: 5,
  },
  {
    id: "2",
    quote: "Fostering with PawsNClaws has been so rewarding. They provide everything you need and the support is incredible.",
    author: "James T.",
    role: "Foster Parent",
    rating: 5,
  },
  {
    id: "3",
    quote: "The vet fund saved our dog's life when we couldn't afford emergency surgery. We are forever grateful.",
    author: "The Johnson Family",
    role: "Pet Owners",
    rating: 5,
  },
  {
    id: "4",
    quote: "As a colony caretaker, I rely on PawsNClaws for TNR support. They've helped us fix over 40 cats in our neighborhood.",
    author: "Patricia H.",
    role: "Colony Caretaker",
    rating: 5,
  },
  {
    id: "5",
    quote: "I adopted my senior cat through PawsNClaws. The process was smooth and they truly care about finding the right match.",
    author: "David M.",
    role: "Adopter",
    rating: 5,
  },
];

interface TestimonialsProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function Testimonials({ className = "", autoPlay = true, interval = 5000 }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const testimonial = testimonials[current];

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-8 relative">
        {/* Quote mark */}
        <div className="absolute top-4 left-4 text-6xl text-amber-200 font-serif leading-none">
          &ldquo;
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Stars */}
          {testimonial.rating && (
            <div className="flex gap-1 mb-4 justify-center">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-amber-400 text-xl">★</span>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-gray-700 text-lg italic text-center mb-6">
            {testimonial.quote}
          </blockquote>

          {/* Author */}
          <div className="text-center">
            <div className="font-bold text-gray-900">{testimonial.author}</div>
            <div className="text-sm text-amber-600">{testimonial.role}</div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === current ? "bg-amber-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Grid version showing multiple testimonials
export function TestimonialsGrid({ className = "", limit = 3 }: { className?: string; limit?: number }) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {testimonials.slice(0, limit).map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-xl shadow-md p-6">
          {/* Stars */}
          {testimonial.rating && (
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-amber-400">★</span>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-gray-600 text-sm mb-4">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div>
            <div className="font-medium text-gray-900">{testimonial.author}</div>
            <div className="text-xs text-gray-500">{testimonial.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Single testimonial card
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <span key={i} className="text-amber-500">★</span>
        ))}
      </div>
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
