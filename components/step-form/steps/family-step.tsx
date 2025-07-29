"use client";

import { OptionButton } from "../option-button";

interface FamilyStepProps {
  maritalStatus: string;
  childrenCount: string;
  onUpdate: (field: string, value: string) => void;
}

export const FamilyStep = ({
  maritalStatus,
  childrenCount,
  onUpdate,
}: FamilyStepProps) => {
  const maritalStatusOptions = [
    { value: "single", label: "Solteiro(a)" },
    { value: "married", label: "Casado(a)" },
    { value: "divorced", label: "Divorciado(a)" },
    { value: "partner", label: "União estável" },
  ];

  const childrenOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Situação Familiar
        </h2>
        <p className="text-gray-600">Conte-nos sobre sua situação familiar</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Marital Status */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Estado Civil</h3>
          <div className="grid grid-cols-2 gap-2">
            {maritalStatusOptions.map((option) => (
              <OptionButton
                key={option.value}
                isSelected={maritalStatus === option.value}
                onClick={() => onUpdate("maritalStatus", option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </OptionButton>
            ))}
          </div>
        </div>

        {/* Children */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Filhos</h3>
          <div className="grid grid-cols-5 gap-2">
            {childrenOptions.map((option) => (
              <OptionButton
                key={option.value}
                isSelected={childrenCount === option.value}
                onClick={() => onUpdate("children", option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
