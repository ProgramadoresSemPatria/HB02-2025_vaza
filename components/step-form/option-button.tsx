import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const OptionButton = ({
  children,
  isSelected,
  onClick,
  icon: Icon,
  className,
}: OptionButtonProps) => (
  <Button
    type="button"
    variant="outline"
    className={cn(
      "w-full h-14 text-left justify-start transition-all duration-300 ease-out border-2",
      isSelected
        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
        : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50",
      className
    )}
    onClick={onClick}
  >
    {Icon && <Icon className="w-5 h-5 mr-3" />}
    {children}
  </Button>
);
