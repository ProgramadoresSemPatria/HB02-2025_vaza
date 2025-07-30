import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FormData } from '@/components/step-form/types';
import { toast } from 'sonner';

export const useStepForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: user.user_metadata.full_name,
          current_country: formData.currentCountry,
          job_title: formData.jobTitle,
          age: parseInt(formData.age),
          degree: formData.degree,
          institution: formData.institution,
          citizenships: formData.citizenships,
          marital_status: formData.maritalStatus,
          children: formData.children,
          email: user.email,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) {
        throw upsertError;
      }

      toast.success('Profile saved successfully!');
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save profile';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveProfile,
    isLoading,
    error,
  };
}; 