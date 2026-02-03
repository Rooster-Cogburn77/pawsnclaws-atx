"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, useCallback } from "react";

type AppLinkProps = ComponentProps<typeof Link>;

/**
 * Custom Link that disables Next.js scroll and manually scrolls to top.
 * Fixes sticky header scroll offset issue.
 */
export function AppLink({ href, onClick, children, ...props }: AppLinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Call original onClick if provided
      onClick?.(e);

      // If not prevented and it's a local link
      if (!e.defaultPrevented && typeof href === "string" && href.startsWith("/")) {
        e.preventDefault();
        // Scroll to top first
        window.scrollTo(0, 0);
        // Then navigate
        router.push(href);
      }
    },
    [href, onClick, router]
  );

  return (
    <Link href={href} onClick={handleClick} scroll={false} {...props}>
      {children}
    </Link>
  );
}
