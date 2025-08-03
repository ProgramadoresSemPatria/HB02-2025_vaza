import { Plan, Step, Country } from "@/types/db";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export interface PlanWithDetails {
  plan: Plan;
  steps: Step[];
  country: Country;
}

export const usePlan = (planId: string | null) => {
  const [planData, setPlanData] = useState<PlanWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async () => {
    if (!planId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch the plan
      const { data: planResult, error: planError } = await supabase
        .from("plans")
        .select("*")
        .eq("id", planId)
        .single();

      if (planError) {
        throw new Error(`Failed to fetch plan: ${planError.message}`);
      }

      if (!planResult) {
        throw new Error("Plan not found");
      }

      // Fetch the steps for this plan
      const { data: stepsResult, error: stepsError } = await supabase
        .from("steps")
        .select("*")
        .eq("plan_id", planId)
        .order("order", { ascending: true });

      if (stepsError) {
        throw new Error(`Failed to fetch steps: ${stepsError.message}`);
      }

      // Fetch the country information
      const { data: countryResult, error: countryError } = await supabase
        .from("countries")
        .select("*")
        .eq("id", planResult.country_id)
        .single();

      if (countryError) {
        throw new Error(`Failed to fetch country: ${countryError.message}`);
      }

      if (!countryResult) {
        throw new Error("Country not found");
      }

      setPlanData({
        plan: planResult,
        steps: stepsResult || [],
        country: countryResult,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch plan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [planId]);

  const updateStepCompletion = async (stepId: string, isCompleted: boolean) => {
    try {
      const supabase = createClient();

      const { error: updateError } = await supabase
        .from("steps")
        .update({ is_completed: isCompleted })
        .eq("id", stepId);

      if (updateError) {
        throw new Error(`Failed to update step: ${updateError.message}`);
      }

      // Optimistically update the local state
      if (planData) {
        const updatedSteps = planData.steps.map(step =>
          step.id === stepId ? { ...step, is_completed: isCompleted } : step
        );
        setPlanData({
          ...planData,
          steps: updatedSteps,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update step";
      setError(errorMessage);
      // Revert optimistic update by refetching
      fetchPlan();
    }
  };

  return {
    planData,
    isLoading,
    error,
    refetch: fetchPlan,
    updateStepCompletion,
  };
};