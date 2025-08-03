import { Plan, Step, Country } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreatePlanPayload {
  targetCountry: string;
}

interface CreatePlanResponse {
  plan: Plan;
  steps: Step[];
  country: Country;
}

interface UseCreatePlanOptions {
  onSuccess?: (data: CreatePlanResponse) => void;
  onError?: (error: Error) => void;
  redirectToGenerated?: boolean;
}

export function useCreatePlan(options: UseCreatePlanOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError, redirectToGenerated = true } = options;

  return useMutation({
    mutationFn: async (data: CreatePlanPayload): Promise<CreatePlanResponse> => {
      const response = await fetch('/api/create-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create immigration plan');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(`Immigration plan for ${data.country.name} created successfully!`);

      if (redirectToGenerated) {
        router.push('/dashboard/plan/generated');
      }

      onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create immigration plan');
      onError?.(error);
    },
  });
}