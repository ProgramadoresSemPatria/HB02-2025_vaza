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
      "w-full h-12 sm:h-14 text-left justify-start transition-all duration-300 ease-out border-2 text-sm sm:text-base font-medium",
      isSelected
        ? "bg-green-800 text-white border-green-800 shadow-sm"
        : "bg-white text-gray-700 border-gray-200 hover:border-green-600 hover:bg-green-50",
      className
    )}
    onClick={onClick}
  >
    {Icon && (
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
    )}
    <span className="truncate">{children}</span>
  </Button>
);
