import { Plan, Country } from "@/types/db";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export interface PlanWithCountry {
  plan: Plan;
  country: Country;
}

export const usePlans = () => {
  const [plans, setPlans] = useState<PlanWithCountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Get current user
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

      // Get user's profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
        throw new Error(`Failed to fetch profile: ${profileError.message}`);
      }

      if (!profileData) {
        setPlans([]);
        return;
      }

      // Get countries for this profile
      const { data: countriesData, error: countriesError } = await supabase
        .from("countries")
        .select("*")
        .eq("profile_id", profileData.id);

      if (countriesError) {
        throw new Error(`Failed to fetch countries: ${countriesError.message}`);
      }

      if (!countriesData || countriesData.length === 0) {
        setPlans([]);
        return;
      }

      // Get plans for these countries
      const countryIds = countriesData.map(country => country.id);
      const { data: plansData, error: plansError } = await supabase
        .from("plans")
        .select("*")
        .in("country_id", countryIds);

      if (plansError) {
        throw new Error(`Failed to fetch plans: ${plansError.message}`);
      }

      // Combine plans with their country information
      const userPlansWithCountries: PlanWithCountry[] = (plansData || []).map(plan => {
        const country = countriesData.find(c => c.id === plan.country_id);
        return {
          plan,
          country: country!,
        };
      });

      setPlans(userPlansWithCountries);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch user plans";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    isLoading,
    error,
    refetch: fetchPlans,
  };
};