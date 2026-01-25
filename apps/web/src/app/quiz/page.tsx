"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; catPoints: number; dogPoints: number }[];
}

const questions: Question[] = [
  {
    id: "lifestyle",
    question: "How would you describe your lifestyle?",
    options: [
      { label: "Active - I'm always on the go, hiking, running, or outdoors", value: "active", catPoints: 0, dogPoints: 3 },
      { label: "Moderate - I enjoy walks but also love quiet time at home", value: "moderate", catPoints: 2, dogPoints: 2 },
      { label: "Relaxed - I prefer calm activities and staying in", value: "relaxed", catPoints: 3, dogPoints: 1 },
    ],
  },
  {
    id: "living",
    question: "What's your living situation?",
    options: [
      { label: "House with a yard", value: "house-yard", catPoints: 2, dogPoints: 3 },
      { label: "House without a yard", value: "house-no-yard", catPoints: 3, dogPoints: 2 },
      { label: "Apartment/Condo", value: "apartment", catPoints: 3, dogPoints: 1 },
      { label: "I have outdoor space but it's shared", value: "shared", catPoints: 3, dogPoints: 1 },
    ],
  },
  {
    id: "time",
    question: "How much time can you dedicate to your pet daily?",
    options: [
      { label: "2+ hours of active interaction", value: "lots", catPoints: 1, dogPoints: 3 },
      { label: "1-2 hours of quality time", value: "moderate", catPoints: 3, dogPoints: 2 },
      { label: "Less than an hour, but I'm home often", value: "limited", catPoints: 3, dogPoints: 1 },
    ],
  },
  {
    id: "experience",
    question: "What's your pet experience level?",
    options: [
      { label: "First-time pet owner", value: "first-time", catPoints: 3, dogPoints: 1 },
      { label: "I've had pets before", value: "experienced", catPoints: 2, dogPoints: 2 },
      { label: "Very experienced with multiple pets", value: "expert", catPoints: 3, dogPoints: 3 },
    ],
  },
  {
    id: "family",
    question: "Who lives in your household?",
    options: [
      { label: "Just me", value: "solo", catPoints: 3, dogPoints: 2 },
      { label: "With a partner/roommates", value: "partner", catPoints: 2, dogPoints: 2 },
      { label: "Family with young children (under 6)", value: "young-kids", catPoints: 1, dogPoints: 2 },
      { label: "Family with older children", value: "older-kids", catPoints: 2, dogPoints: 3 },
    ],
  },
  {
    id: "travel",
    question: "How often do you travel or work away from home?",
    options: [
      { label: "Rarely - I'm usually home", value: "rarely", catPoints: 2, dogPoints: 3 },
      { label: "Occasionally - A few times a year", value: "occasionally", catPoints: 3, dogPoints: 2 },
      { label: "Frequently - I travel often for work/pleasure", value: "frequently", catPoints: 3, dogPoints: 1 },
    ],
  },
  {
    id: "budget",
    question: "What's your estimated monthly pet budget?",
    options: [
      { label: "$50-100 for basics", value: "budget", catPoints: 3, dogPoints: 1 },
      { label: "$100-200 for good care", value: "moderate", catPoints: 2, dogPoints: 2 },
      { label: "$200+ for premium care", value: "premium", catPoints: 2, dogPoints: 3 },
    ],
  },
  {
    id: "personality",
    question: "What pet personality appeals to you most?",
    options: [
      { label: "Independent but affectionate on their terms", value: "independent", catPoints: 3, dogPoints: 0 },
      { label: "Loyal and always by my side", value: "loyal", catPoints: 1, dogPoints: 3 },
      { label: "Playful and energetic", value: "playful", catPoints: 2, dogPoints: 3 },
      { label: "Calm and cuddly", value: "calm", catPoints: 3, dogPoints: 2 },
    ],
  },
];

interface Result {
  type: "cat" | "dog" | "both";
  title: string;
  description: string;
  recommendations: string[];
  emoji: string;
}

const getResult = (catPoints: number, dogPoints: number): Result => {
  const diff = Math.abs(catPoints - dogPoints);

  if (diff <= 3) {
    return {
      type: "both",
      title: "You're a Great Match for Both!",
      description: "Based on your answers, you'd be a wonderful pet parent for either a cat or a dog. Your lifestyle and preferences are flexible enough to accommodate both species.",
      recommendations: [
        "Consider visiting both cat and dog areas at the shelter",
        "A bonded pair (cat/dog that get along) might be perfect",
        "Start with fostering to test which fits best",
        "Consider a calm, cat-friendly dog or a dog-friendly cat",
      ],
      emoji: "🐱🐕",
    };
  }

  if (catPoints > dogPoints) {
    return {
      type: "cat",
      title: "You're a Perfect Cat Person!",
      description: "Your lifestyle and preferences align beautifully with feline companionship. Cats are independent, low-maintenance, and incredibly rewarding pets.",
      recommendations: [
        "Adult cats are often calmer and great for first-time owners",
        "Consider a bonded pair - they keep each other company",
        "Senior cats are often overlooked but make amazing companions",
        "Look into cat-proofing your space with window screens and hiding cables",
      ],
      emoji: "🐱",
    };
  }

  return {
    type: "dog",
    title: "You're a Natural Dog Person!",
    description: "Your active lifestyle and available time make you an ideal dog parent. Dogs offer unconditional love, companionship, and motivation to stay active.",
    recommendations: [
      "Consider your energy level when choosing a breed/mix",
      "Older dogs are often house-trained and calmer",
      "Look into local dog parks and walking trails",
      "Budget for training classes - they're worth it!",
    ],
    emoji: "🐕",
  };
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [catPoints, setCatPoints] = useState(0);
  const [dogPoints, setDogPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: Question["options"][0]) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: option.value });
    setCatPoints(catPoints + option.catPoints);
    setDogPoints(dogPoints + option.dogPoints);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCatPoints(0);
    setDogPoints(0);
    setShowResult(false);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  if (showResult) {
    const result = getResult(catPoints, dogPoints);

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">{result.emoji}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{result.title}</h1>
            <p className="text-gray-600">{result.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">Our Recommendations:</h2>
            <ul className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-0.5">✓</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-amber-800 mb-2">Your Score Breakdown</h3>
            <div className="flex gap-8 justify-center">
              <div className="text-center">
                <span className="text-2xl">🐱</span>
                <div className="text-xl font-bold text-gray-900">{catPoints}</div>
                <div className="text-sm text-gray-600">Cat Points</div>
              </div>
              <div className="text-center">
                <span className="text-2xl">🐕</span>
                <div className="text-xl font-bold text-gray-900">{dogPoints}</div>
                <div className="text-sm text-gray-600">Dog Points</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retake Quiz
            </button>
            {result.type === "cat" || result.type === "both" ? (
              <Link
                href="/foster"
                className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors text-center"
              >
                See Available Cats
              </Link>
            ) : null}
            {result.type === "dog" || result.type === "both" ? (
              <Link
                href="/foster"
                className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors text-center"
              >
                See Available Dogs
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-2 block">🐾</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Pet Match
          </h1>
          <p className="text-gray-600">
            Answer a few questions to discover which type of pet suits your lifestyle.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
}
