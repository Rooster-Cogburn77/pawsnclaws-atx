"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/components/Icons";

export function FeatureCard({
  emoji,
  title,
  description,
  href,
}: {
  emoji: string;
  title: string;
  description: string;
  href: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Force scroll to absolute top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Navigate after scroll
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all block cursor-pointer"
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 text-amber-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more
        <ArrowRightIcon className="w-4 h-4" />
      </div>
    </a>
  );
}
