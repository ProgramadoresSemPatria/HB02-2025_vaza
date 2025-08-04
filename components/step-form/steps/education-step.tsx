"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EducationStepProps {
  degree: string;
  institution: string;
  onUpdate: (field: string, value: string) => void;
}

export const EducationStep = ({
  degree,
  institution,
  onUpdate,
}: EducationStepProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Education
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">Tell us about your academic background</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Degree */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="degree" className="text-sm font-medium text-gray-700">
            Degree / Diploma
          </Label>
          <Input
            id="degree"
            type="text"
            placeholder="e.g. Bachelor of Computer Science, Medicine, Business Administration..."
            value={degree}
            onChange={(e) => onUpdate("degree", e.target.value)}
            className="w-full h-11 sm:h-10 text-sm sm:text-base"
          />
        </div>

        {/* Institution */}
        <div className="space-y-1 sm:space-y-2">
          <Label
            htmlFor="institution"
            className="text-sm font-medium text-gray-700"
          >
            Institution
          </Label>
          <Input
            id="institution"
            type="text"
            placeholder="e.g. University of São Paulo, Harvard, MIT..."
            value={institution}
            onChange={(e) => onUpdate("institution", e.target.value)}
            className="w-full h-11 sm:h-10 text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};
