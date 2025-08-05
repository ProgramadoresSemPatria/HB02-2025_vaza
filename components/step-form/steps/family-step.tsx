"use client";

import { boolean } from "zod";
import { OptionButton } from "../option-button";

interface FamilyStepProps {
  maritalStatus: string;
  childrenCount: string;
  onUpdate: (field: string, value: string) => void;
  isEditForm?: boolean;
}

export const FamilyStep = ({
  maritalStatus,
  childrenCount,
  onUpdate,
  isEditForm = false
}: FamilyStepProps) => {
  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "partner", label: "Domestic Partnership" },
  ];

  const childrenOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      { !isEditForm && 
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            Family Status
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Tell us about your family situation
          </p>
        </div>
      }

      <div className="space-y-4 sm:space-y-6">
        {/* Marital Status */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Marital Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {maritalStatusOptions.map((option) => (
              <OptionButton
                key={option.value}
                isSelected={maritalStatus === option.value}
                onClick={() => onUpdate("maritalStatus", option.value)}
              >
                {option.label}
              </OptionButton>
            ))}
          </div>
        </div>

        {/* Children */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Children</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {childrenOptions.map((option) => (
              <OptionButton
                key={option.value}
                isSelected={childrenCount === option.value}
                onClick={() => onUpdate("children", option.value)}
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
