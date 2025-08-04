/**
 * Country Data Service
 * Handles fetching rich country information from REST Countries API
 */

export interface CountryDetailsResponse {
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
  // Additional fields available from REST Countries API
  borders?: string[];
  callingCodes?: string[];
  topLevelDomain?: string[];
  independent?: boolean;
  unMember?: boolean;
  car?: { side: string };
  continents?: string[];
}

/**
 * Fetches detailed country information using the country code
 * @param countryCode - 2-letter ISO country code (e.g., 'US', 'FR', 'JP')
 * @returns Promise with country details or empty object if error
 */
export const fetchCountryDetails = async (countryCode: string): Promise<CountryDetailsResponse> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode.toLowerCase()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const [countryData] = await response.json();

    return {
      capital: countryData.capital?.[0],
      population: countryData.population,
      currencies: countryData.currencies,
      languages: countryData.languages,
      region: countryData.region,
      subregion: countryData.subregion,
      flag: countryData.flags?.svg,
      coatOfArms: countryData.coatOfArms?.svg,
      timezones: countryData.timezones,
      area: countryData.area,
      borders: countryData.borders,
      callingCodes: countryData.idd ? [`${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`] : undefined,
      topLevelDomain: countryData.tld,
      independent: countryData.independent,
      unMember: countryData.unMember,
      car: countryData.car,
      continents: countryData.continents,
    };
  } catch (error) {
    console.error('Error fetching country details:', error);
    return {};
  }
};

/**
 * Fetches multiple countries by their codes
 * @param countryCodes - Array of 2-letter ISO country codes
 * @returns Promise with array of country details
 */
export const fetchMultipleCountries = async (countryCodes: string[]): Promise<CountryDetailsResponse[]> => {
  try {
    const codesString = countryCodes.join(',');
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codesString}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries = await response.json();

    return countries.map((countryData: any) => ({
      capital: countryData.capital?.[0],
      population: countryData.population,
      currencies: countryData.currencies,
      languages: countryData.languages,
      region: countryData.region,
      subregion: countryData.subregion,
      flag: countryData.flags?.svg,
      coatOfArms: countryData.coatOfArms?.svg,
      timezones: countryData.timezones,
      area: countryData.area,
      borders: countryData.borders,
      callingCodes: countryData.idd ? [`${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`] : undefined,
      topLevelDomain: countryData.tld,
      independent: countryData.independent,
      unMember: countryData.unMember,
      car: countryData.car,
      continents: countryData.continents,
    }));
  } catch (error) {
    console.error('Error fetching multiple countries:', error);
    return [];
  }
};

/**
 * Search countries by name
 * @param name - Country name to search for
 * @returns Promise with array of matching countries
 */
export const searchCountriesByName = async (name: string): Promise<CountryDetailsResponse[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries = await response.json();

    return countries.map((countryData: any) => ({
      capital: countryData.capital?.[0],
      population: countryData.population,
      currencies: countryData.currencies,
      languages: countryData.languages,
      region: countryData.region,
      subregion: countryData.subregion,
      flag: countryData.flags?.svg,
      coatOfArms: countryData.coatOfArms?.svg,
      timezones: countryData.timezones,
      area: countryData.area,
      borders: countryData.borders,
      callingCodes: countryData.idd ? [`${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`] : undefined,
      topLevelDomain: countryData.tld,
      independent: countryData.independent,
      unMember: countryData.unMember,
      car: countryData.car,
      continents: countryData.continents,
    }));
  } catch (error) {
    console.error('Error searching countries by name:', error);
    return [];
  }
};