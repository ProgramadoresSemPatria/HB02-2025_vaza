"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as React from "react";

const statsVariants = cva(
  "flex flex-col items-center justify-center p-6 rounded-xl border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-background/50",
        gradient:
          "border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10",
        glow: "border-green-500/30 bg-green-500/5 drop-shadow-[0_0_10px_rgba(74,124,74,0.2)]",
        metallic:
          "border-green-400/30 bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-cyan-500/10",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const numberVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient:
        "bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent",
      glow: "text-green-300 drop-shadow-[0_0_8px_rgba(74,124,74,0.6)]",
      metallic:
        "bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent",
      white: "text-white font-extrabold",
    },
    size: {
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const labelVariants = cva("text-center", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      gradient: "text-green-300",
      glow: "text-green-200",
      metallic: "text-green-200",
      white: "text-white font-semibold",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface StatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {
  number: string | number;
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
  numberVariant?: VariantProps<typeof numberVariants>["variant"];
  numberSize?: VariantProps<typeof numberVariants>["size"];
  labelVariant?: VariantProps<typeof labelVariants>["variant"];
  labelSize?: VariantProps<typeof labelVariants>["size"];
  animate?: boolean;
  delay?: number;
}

const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  (
    {
      className,
      variant,
      size,
      number,
      label,
      icon: Icon,
      iconClassName,
      numberVariant,
      numberSize,
      labelVariant,
      labelSize,
      animate = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const [count, setCount] = React.useState(0);
    const targetCount =
      typeof number === "string" ? parseInt(number.replace(/\D/g, "")) : number;

    React.useEffect(() => {
      if (animate && typeof targetCount === "number") {
        const duration = 2000;
        const increment = targetCount / (duration / 16);
        let currentCount = 0;

        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= targetCount) {
            setCount(targetCount);
            clearInterval(timer);
          } else {
            setCount(Math.floor(currentCount));
          }
        }, 16);

        return () => clearInterval(timer);
      } else {
        setCount(targetCount);
      }
    }, [targetCount, animate]);

    const displayNumber =
      typeof number === "string" && !animate
        ? number
        : typeof number === "string"
        ? number.replace(/\d+/, count.toString())
        : count;

    return (
      <motion.div
        className={cn(statsVariants({ variant, size, className }))}
        ref={ref}
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay }}
        {...props}
      >
        {Icon && (
          <Icon
            className={cn(
              "w-6 h-6 mb-3",
              variant === "default" ? "text-primary" : "text-green-400",
              iconClassName
            )}
          />
        )}

        <motion.div
          className={cn(
            numberVariants({ variant: numberVariant, size: numberSize })
          )}
          initial={animate ? { scale: 0.8 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        >
          {displayNumber}
        </motion.div>

        <motion.div
          className={cn(
            labelVariants({ variant: labelVariant, size: labelSize }),
            "mt-2"
          )}
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
        >
          {label}
        </motion.div>
      </motion.div>
    );
  }
);
Stats.displayName = "Stats";

export interface StatsGridProps {
  stats: Omit<StatsProps, "animate" | "delay">[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  staggerDelay?: number;
}

const StatsGrid = React.forwardRef<HTMLDivElement, StatsGridProps>(
  ({ stats, columns = 2, className, staggerDelay = 0.1, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4 sm:gap-6", gridCols[columns], className)}
        {...props}
      >
        {stats.map((stat, index) => (
          <Stats
            key={index}
            {...stat}
            animate={true}
            delay={index * staggerDelay}
          />
        ))}
      </div>
    );
  }
);
StatsGrid.displayName = "StatsGrid";

export { labelVariants, numberVariants, Stats, StatsGrid, statsVariants };
