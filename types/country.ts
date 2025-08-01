/**
 * Country Data Types
 * Shared interfaces for country-related data across the application
 */

import { CountryDetailsResponse } from '@/services/countries';

export interface CountryData {
  name: string;
  code: string;
  position: { x: number; y: number };
  coordinates: { lat: number; lng: number };
  isLoading?: boolean;
  // Merge with detailed country information
  capital?: string;
  population?: number;
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  region?: string;
  subregion?: string;
  flag?: string;
  coatOfArms?: string;
  timezones?: string[];
  area?: number;
}

export interface SelectedCountryData {
  name: string;
  code: string;
  capital?: string;
  population?: number;
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  region?: string;
  flag?: string;
}

// Re-export for convenience
export type { CountryDetailsResponse } from '@/services/countries';