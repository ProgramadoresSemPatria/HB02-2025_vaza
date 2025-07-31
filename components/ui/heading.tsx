import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient:
        "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent",
      metallic:
        "bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-500 bg-clip-text text-transparent",
      glow: "text-white drop-shadow-[0_0_10px_rgba(74,124,74,0.5)]",
      white: "text-white font-extrabold",
    },
    size: {
      sm: "text-2xl md:text-3xl",
      md: "text-3xl md:text-4xl lg:text-5xl",
      lg: "text-4xl md:text-5xl lg:text-6xl",
      xl: "text-5xl md:text-6xl lg:text-7xl",
      "2xl": "text-6xl md:text-7xl lg:text-8xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    align: "left",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, variant, size, align, as: Component = "h2", ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(headingVariants({ variant, size, align, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
