"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, PauseIcon, PlayIcon } from "lucide-react";

interface PlanHeaderProps {
  planStatus: "not-started" | "in-progress" | "completed";
  onStartPlan: () => void;
  onPausePlan: () => void;
  onCompletePlan: () => void;
}

export function PlanHeader({
  planStatus,
  onStartPlan,
  onPausePlan,
  onCompletePlan,
}: PlanHeaderProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Immigration Plan
          </h1>
          <p className="text-gray-600">
            Track your journey to a new country step by step
          </p>
        </div>
        <div className="flex gap-3">
          {planStatus === "not-started" && (
            <Button
              onClick={onStartPlan}
              className="bg-green-600 hover:bg-green-700"
            >
              <PlayIcon className="h-4 w-4 mr-2" />
              Start Plan
            </Button>
          )}
          {planStatus === "in-progress" && (
            <>
              <Button onClick={onPausePlan} variant="outline">
                <PauseIcon className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button
                onClick={onCompletePlan}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Complete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
