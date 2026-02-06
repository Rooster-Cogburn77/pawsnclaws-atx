"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is PawsNClaws ATX?",
        a: "PawsNClaws ATX is a nonprofit organization dedicated to keeping pets and people together in Austin, Texas. We provide resources, financial assistance, and community support to help families keep their beloved pets.",
      },
      {
        q: "Are you a shelter or rescue?",
        a: "No, we don't operate a shelter or take in animals directly. Instead, we focus on prevention - helping people keep their pets through financial assistance, resources, and community support. We also maintain a network of foster homes for emergency situations.",
      },
      {
        q: "How can I contact you?",
        a: "You can reach us through our contact form at pawsandclawsatx.com/contact, or email us at hello@pawsandclawsatx.com. For emergencies involving animal safety, please call Austin 311.",
      },
    ],
  },
  {
    category: "Financial Assistance",
    questions: [
      {
        q: "What is the Pet Deposit Assistance Program?",
        a: "Our Pet Deposit Assistance Program provides interest-free loans to help Austin residents cover pet deposits when moving to pet-friendly housing. This prevents families from having to surrender pets due to housing costs.",
      },
      {
        q: "How do I qualify for deposit assistance?",
        a: "Eligibility is based on financial need, Austin residency, and having a pet that would otherwise be surrendered. We prioritize families facing imminent housing changes. Apply through our website and we'll review within 3-5 business days.",
      },
      {
        q: "What is the Emergency Vet Fund?",
        a: "Our Emergency Vet Fund helps cover unexpected veterinary costs for families who can't afford emergency care. We work directly with veterinary clinics to help as many pets as possible with our available funds.",
      },
      {
        q: "Do I have to pay back the assistance?",
        a: "Pet deposit loans are interest-free and we work with you on a repayment plan that fits your budget. Emergency vet fund assistance is typically a grant, not a loan, but we encourage recipients to 'pay it forward' when they're able.",
      },
    ],
  },
  {
    category: "Volunteering",
    questions: [
      {
        q: "What volunteer opportunities are available?",
        a: "We have many ways to help: colony care (feeding community cats), TNR transport and clinic assistance, fostering, event support, administrative help, photography, social media, and community outreach.",
      },
      {
        q: "Do I need experience to volunteer?",
        a: "No prior experience is needed for most roles. We provide training for all volunteer positions. Some specialized roles like TNR assistance or medical fostering may require additional orientation.",
      },
      {
        q: "How much time do I need to commit?",
        a: "It's up to you! Some volunteers help a few hours per month, others are involved weekly. We appreciate any time you can give. Most colony care shifts are 1-2 hours.",
      },
    ],
  },
  {
    category: "Fostering",
    questions: [
      {
        q: "What does fostering involve?",
        a: "Foster families provide temporary homes for animals in need. This could be bottle-feeding kittens, caring for recovering animals, or providing a calm environment for stressed pets. We cover all supplies and vet care.",
      },
      {
        q: "How long do fosters stay?",
        a: "It varies! Bottle baby kittens typically need 4-8 weeks. Adult cats or dogs recovering from illness might be a few days to a few weeks. We'll give you an estimated timeline when placing an animal.",
      },
      {
        q: "What supplies do you provide?",
        a: "We provide everything: food, litter, crates/carriers, medications, and any specialized supplies. You just provide the love and a safe space.",
      },
      {
        q: "What if I want to adopt my foster?",
        a: "We love 'foster fails'! If you fall in love with your foster, you have first priority to adopt. Just let your foster coordinator know.",
      },
    ],
  },
  {
    category: "Donations",
    questions: [
      {
        q: "Is my donation tax-deductible?",
        a: "Our 501(c)(3) status is currently pending. Once approved, donations will be tax-deductible. You'll receive a receipt for all donations.",
      },
      {
        q: "How are donations used?",
        a: "Donations fund our core programs: pet deposit assistance, emergency vet fund, TNR operations, foster supplies, and community resources. We're committed to transparency - see our Impact page for details.",
      },
      {
        q: "Can I donate supplies instead of money?",
        a: "Yes! We accept pet food, litter, blankets, towels, and other supplies. Check our Amazon wishlist or contact us for current needs. Drop-off locations are listed on our website.",
      },
      {
        q: "Can I set up a monthly donation?",
        a: "Absolutely! Monthly donors are the backbone of our organization. Even $10/month provides consistent support that helps us plan and serve more animals. You can set this up on our donate page.",
      },
    ],
  },
  {
    category: "Lost & Found Pets",
    questions: [
      {
        q: "I lost my pet. What should I do?",
        a: "Post immediately on our Lost & Found board, Nextdoor, and local Facebook groups. Contact Austin Animal Center at (512) 978-0500. Put out familiar-smelling items. Search at dawn/dusk when it's quiet. Check shelters in person daily.",
      },
      {
        q: "I found a stray. What should I do?",
        a: "First, take them to any vet or shelter to scan for a microchip (it's free). Post on our Found board and local groups. If you can keep them temporarily, that's ideal - shelters are often full. Call 311 if you can't keep them safely.",
      },
      {
        q: "How does your Lost & Found board work?",
        a: "Anyone can post a lost or found pet report. We share these across our social media to maximize visibility. Our community helps spread the word and connect owners with their pets.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">❓</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our programs and services.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-lg font-bold text-amber-600 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div
                      key={id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(id)}
                        className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {item.q}
                        </span>
                        <span
                          className={`transform transition-transform text-amber-500 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-amber-100 rounded-xl p-6 text-center">
          <h3 className="font-bold text-amber-900 mb-2">
            Still Have Questions?
          </h3>
          <p className="text-sm text-amber-800 mb-4">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
