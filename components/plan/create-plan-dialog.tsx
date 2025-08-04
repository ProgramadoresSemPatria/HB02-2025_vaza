"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useCreatePlan } from "@/hooks/useCreatePlan";

interface CreatePlanDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  targetCountry: string;
}

const STEPS = [
  "Analyzing country requirements",
  "Gathering visa information",
  "Creating personalized checklist",
  "Finalizing your plan"
];

export function CreatePlanDialog({
  isOpen,
  onOpenChange,
  targetCountry,
}: CreatePlanDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasMutationStarted = useRef(false);

  const createPlanMutation = useCreatePlan({
    redirectToGenerated: true,
    onSuccess: () => {
      // Reset the ref when the mutation succeeds
      hasMutationStarted.current = false;
    },
    onError: () => {
      // Close the dialog and reset on error
      onOpenChange(false);
      hasMutationStarted.current = false;
    }
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      hasMutationStarted.current = false;
      return;
    }

    // Only start the mutation if it hasn't been started yet
    if (!hasMutationStarted.current) {
      hasMutationStarted.current = true;
      createPlanMutation.mutate({ targetCountry });
    }

    // Progress animation
    const stepDuration = 7500; // 7.5 seconds per step
    const totalSteps = STEPS.length;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        return next > 100 ? 100 : next;
      });
    }, (stepDuration * totalSteps) / 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          clearInterval(stepInterval);
          clearInterval(progressInterval);
        }
        return next >= totalSteps ? prev : next;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen, targetCountry, onOpenChange]); // Removed createPlanMutation from deps

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">
            Creating Your Immigration Plan
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <Progress value={progress} className="h-2" />
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-900">
              {STEPS[currentStep]}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Please wait while we prepare your personalized immigration plan. You will be redirected to the plan after it is ready.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}