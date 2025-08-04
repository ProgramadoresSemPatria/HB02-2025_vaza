import { Profile } from "@/types/db";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileData {
  profile: Profile
}

export function useEditProfile() {
  const [error, setError] = useState<string | null>(null);

  const editProfile = async ({ profile }: ProfileData) => {
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

      const { error } = await supabase
        .from("profiles")
        .update({
          email: profile.email,
          country: profile.country,
          job_title: profile.job_title,
          age: profile.age,
          degree: profile.degree,
          institution: profile.institution,
          citizenships: profile.citizenships,
          marital_status: profile.marital_status,
          children: profile.children
        })
        .eq("id", profile.id)

        if (error) {
          return { error }
        } else {
          toast.success("Profile was successfully updated")
        }

    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to edit profile";
      setError(errorMessage);
    }
  };

  return {
    editProfile,
    error,
  };
};
