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

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error('Failed to get auth session');
      }

      if (!session) {
        throw new Error('No authenticated session found - please log in again');
      }

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          user_id: session.user.id,
          full_name: session.user.user_metadata?.full_name,
          country: formData.currentCountry,
          job_title: formData.jobTitle,
          age: parseInt(formData.age),
          degree: formData.degree,
          institution: formData.institution,
          citizenships: formData.citizenships.split(',').map(c => c.trim()),
          marital_status: formData.maritalStatus,
          children: formData.children,
          email: session.user.email,
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