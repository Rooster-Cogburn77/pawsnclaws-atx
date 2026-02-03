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

  const handleClick = () => {
    // Force scroll to absolute top
    window.scrollTo(0, 0);
    // Navigate with scroll disabled - we handle it ourselves
    router.push(href, { scroll: false });
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick(e as unknown as React.MouseEvent)}
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
    </div>
  );
}
