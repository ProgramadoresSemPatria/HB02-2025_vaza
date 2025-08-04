import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500/10 text-green-400 border-green-500/20",
        warning:
          "border-transparent bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        info: "border-transparent bg-blue-500/10 text-blue-400 border-blue-500/20",
        gradient:
          "border-transparent bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30",
        glow: "border-transparent bg-green-500/10 text-green-300 border-green-500/20 drop-shadow-[0_0_8px_rgba(74,124,74,0.3)]",
        metallic:
          "border-transparent bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-cyan-500/20 text-green-300 border-green-400/30",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
