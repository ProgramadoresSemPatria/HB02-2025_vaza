"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

const animatedTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient:
        "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent",
      glow: "text-green-300 drop-shadow-[0_0_8px_rgba(74,124,74,0.6)]",
      metallic:
        "bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent",
      white: "text-white font-semibold",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  typewriter: {
    initial: { width: 0 },
    animate: { width: "100%" },
    exit: { width: 0 },
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    exit: { opacity: 0, y: -20 },
  },
};

export interface AnimatedTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedTextVariants> {
  children: React.ReactNode;
  animation?: keyof typeof animationVariants;
  delay?: number;
  duration?: number;
  repeat?: boolean;
  className?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      className,
      variant,
      size,
      children,
      animation = "fadeIn",
      delay = 0,
      duration = 0.5,
      repeat = false,
      ...props
    },
    ref
  ) => {
    const selectedAnimation = animationVariants[animation];

    return (
      <motion.div
        className={cn(animatedTextVariants({ variant, size, className }))}
        ref={ref}
        initial={selectedAnimation.initial}
        animate={selectedAnimation.animate}
        exit={selectedAnimation.exit}
        transition={{
          duration,
          delay,
          repeat: repeat ? Infinity : 0,
          repeatType: repeat ? "reverse" : undefined,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedText.displayName = "AnimatedText";

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  variant?: VariantProps<typeof animatedTextVariants>["variant"];
  size?: VariantProps<typeof animatedTextVariants>["size"];
}

const TypewriterText = React.forwardRef<HTMLDivElement, TypewriterTextProps>(
  (
    { text, speed = 100, delay = 0, className, variant, size, ...props },
    ref
  ) => {
    const [displayText, setDisplayText] = React.useState("");
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayText("");
      }, delay);
      return () => clearTimeout(timeout);
    }, [delay]);

    return (
      <div
        ref={ref}
        className={cn(animatedTextVariants({ variant, size, className }))}
        {...props}
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </div>
    );
  }
);
TypewriterText.displayName = "TypewriterText";

export { AnimatedText, animatedTextVariants, TypewriterText };
