"use client";

import { useCallback, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Country, Profile } from '@/types/db';
import { CountryDetailsResponse, fetchCountryDetails } from '@/services/countries';

interface UseCountryReturn {
  isLoading: boolean;
  error: string | null;
  countries: Country[];
  createCountry: (countryName: string, profileId: string) => Promise<Country | null>;
  getCountries: (profileId: string) => Promise<Country[]>;
  getCountryById: (countryId: string) => Promise<Country | null>;
  updateCountry: (countryId: string, updates: Partial<Country>) => Promise<Country | null>;
  deleteCountry: (countryId: string) => Promise<boolean>;
}

export const useCountry = (): UseCountryReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  const supabase = createClient();

  // Create a new country entry
  const createCountry = useCallback(async (countryName: string, profileId: string): Promise<Country | null> => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize empty chat object
      const initialChat = {};

      const { data: newCountry, error: createError } = await supabase
        .from('countries')
        .insert([
          {
            profile_id: profileId,
            name: countryName,
            chat: initialChat
          }
        ])
        .select()
        .single();

      if (createError) throw new Error(createError.message);

      // Update local state
      setCountries(prev => [...prev, newCountry]);

      return newCountry;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create country';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get all countries for a profile
  const getCountries = useCallback(async (profileId: string): Promise<Country[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: countries, error: fetchError } = await supabase
        .from('countries')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (fetchError) throw new Error(fetchError.message);

      setCountries(countries);
      return countries;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch countries';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific country by ID
  const getCountryById = useCallback(async (countryId: string): Promise<Country | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: country, error: fetchError } = await supabase
        .from('countries')
        .select('*')
        .eq('id', countryId)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      return country;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch country';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update a country
  const updateCountry = useCallback(async (countryId: string, updates: Partial<Country>): Promise<Country | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: updatedCountry, error: updateError } = await supabase
        .from('countries')
        .update(updates)
        .eq('id', countryId)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);

      // Update local state
      setCountries(prev => prev.map(country =>
        country.id === countryId ? updatedCountry : country
      ));

      return updatedCountry;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update country';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a country
  const deleteCountry = useCallback(async (countryId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('countries')
        .delete()
        .eq('id', countryId);

      if (deleteError) throw new Error(deleteError.message);

      // Update local state
      setCountries(prev => prev.filter(country => country.id !== countryId));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete country';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    countries,
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry
  };
};
