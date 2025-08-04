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
        className="bg-green-800 hover:bg-green-900 text-white"
      >
        Começar Onboarding
      </Button>

      {showOnboarding && (
        <StepForm onClose={() => setShowOnboarding(false)} />
      )}
    </>
  );
};
