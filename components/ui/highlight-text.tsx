import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const highlightVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary",
      success: "text-green-400",
      warning: "text-yellow-400",
      error: "text-red-400",
      info: "text-blue-400",
      gradient:
        "bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent",
      glow: "text-green-300 drop-shadow-[0_0_8px_rgba(74,124,74,0.6)]",
      metallic:
        "bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent",
      underline: "text-primary underline decoration-2 underline-offset-4",
      highlight: "bg-green-400/20 text-green-300 px-1 rounded",
      white: "text-white font-semibold",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface HighlightTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof highlightVariants> {
  children: React.ReactNode;
}

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        className={cn(highlightVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);
HighlightText.displayName = "HighlightText";

export { HighlightText, highlightVariants };
