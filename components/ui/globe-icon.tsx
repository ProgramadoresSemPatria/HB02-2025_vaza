"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface GlobeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const GlobeIcon = React.forwardRef<SVGSVGElement, GlobeIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide lucide-globe", className)}
        aria-hidden="true"
        {...props}
      >
        {/* Círculo principal do globo */}
        <circle cx="12" cy="12" r="10" />

        {/* Meridianos */}
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />

        {/* Paralelos adicionais para mais detalhe */}
        <path d="M12 2a10 10 0 0 0 0 20" opacity="0.3" />
        <path d="M12 2a6 6 0 0 0 0 20" opacity="0.2" />

        {/* Pontos de destaque */}
        <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="16" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="6" cy="18" r="1" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
);

GlobeIcon.displayName = "GlobeIcon";

export { GlobeIcon };
