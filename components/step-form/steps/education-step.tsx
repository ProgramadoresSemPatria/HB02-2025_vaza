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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Formação Acadêmica
        </h2>
        <p className="text-gray-600">Conte-nos sobre sua educação</p>
      </div>

      <div className="space-y-4">
        {/* Degree */}
        <div className="space-y-2">
          <Label htmlFor="degree" className="text-sm font-medium text-gray-700">
            Formação / Diploma
          </Label>
          <Input
            id="degree"
            type="text"
            placeholder="Ex: Bacharel em Ciência da Computação, Medicina, Administração..."
            value={degree}
            onChange={(e) => onUpdate("degree", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <Label
            htmlFor="institution"
            className="text-sm font-medium text-gray-700"
          >
            Instituição
          </Label>
          <Input
            id="institution"
            type="text"
            placeholder="Ex: Universidade de São Paulo, Harvard, MIT..."
            value={institution}
            onChange={(e) => onUpdate("institution", e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
