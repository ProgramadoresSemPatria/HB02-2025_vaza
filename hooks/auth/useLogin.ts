import { signInUser, type SignInPayload } from "@/services/auth";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseLoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useLogin(options: UseLoginOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: async (data: SignInPayload) => {
      const user = await signInUser(data);

      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      return { user, hasProfile: !!profile };
    },
    onSuccess: (result) => {
      toast.success("Logged in successfully");

      if (result.hasProfile) {
        router.push("/dashboard/profile");
      } else {
        router.push("/dashboard/get-started");
      }

      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("Failed to log in");
      onError?.(error);
    },
  });
}
