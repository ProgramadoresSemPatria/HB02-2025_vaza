"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  jobTitle: string;
  age: string;
  onUpdate: (field: string, value: string) => void;
}

export const PersonalInfoStep = ({
  jobTitle,
  age,
  onUpdate,
}: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Informações Pessoais
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Conte-nos sobre sua carreira e idade
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Job Title */}
        <div className="space-y-1 sm:space-y-2">
          <Label
            htmlFor="jobTitle"
            className="text-sm font-medium text-gray-700"
          >
            Cargo / Profissão
          </Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder="Ex: Desenvolvedor Full Stack, Médico, Professor..."
            value={jobTitle}
            onChange={(e) => onUpdate("jobTitle", e.target.value)}
            className="w-full h-11 sm:h-10 text-sm sm:text-base"
          />
        </div>

        {/* Age */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
            Idade
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Ex: 28"
            value={age}
            onChange={(e) => onUpdate("age", e.target.value)}
            className="w-full h-11 sm:h-10 text-sm sm:text-base"
            min="18"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};
