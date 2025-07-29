"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StepForm } from "./step-form";

export const OnboardingTrigger = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowOnboarding(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Começar Onboarding
      </Button>

      {showOnboarding && (
        <StepForm onClose={() => setShowOnboarding(false)} />
      )}
    </>
  );
};
