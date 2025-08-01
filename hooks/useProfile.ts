import { UserProfile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error("Failed to get user");
      }

      if (!user) {
        throw new Error("No authenticated user found");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      setProfile(profileData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
