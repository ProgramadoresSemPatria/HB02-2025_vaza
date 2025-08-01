"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CitizenshipStepProps {
  citizenships: string;
  onUpdate: (value: string) => void;
}

export const CitizenshipStep = ({
  citizenships,
  onUpdate,
}: CitizenshipStepProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Cidadanias
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Quais cidadanias você possui?
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <Label
            htmlFor="citizenships"
            className="text-sm font-medium text-gray-700"
          >
            Cidadanias (separadas por vírgula)
          </Label>
          <Input
            id="citizenships"
            type="text"
            placeholder="Ex: Brasileira, Italiana, Americana..."
            value={citizenships}
            onChange={(e) => onUpdate(e.target.value)}
            className="w-full h-11 sm:h-10 text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500">
            Se você tem múltiplas cidadanias, separe-as por vírgula
          </p>
        </div>
      </div>
    </div>
  );
};
