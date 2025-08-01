"use client";

import { useState } from "react";
import { GoogleMaps } from "@/components/google-maps";

const CountriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
  } | null>(null);

  const handleCountrySelect = (countryName: string, countryCode: string) => {
    setSelectedCountry({ name: countryName, code: countryCode });
    
    // TODO: Open chat dialogue here
    console.log(`Selected country: ${countryName} (${countryCode})`);
    
    // For now, let's show an alert - you can replace this with your chat implementation
    alert(`You selected ${countryName}! This is where we'll open the chat dialogue.`);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Countries</h1>
                <p className="text-gray-600">
          Select your destination country to start planning your journey.
        </p>
        
        {selectedCountry && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800">
              Selected Destination
            </h3>
            <p className="text-green-700">
              {selectedCountry.name} ({selectedCountry.code})
            </p>
            <p className="text-sm text-green-600 mt-1">
              Ready to start planning your journey!
            </p>
          </div>
        )}
        </div>
      
      <div className="mt-6">
        <GoogleMaps 
          onCountrySelect={handleCountrySelect}
          height="600px"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CountriesPage;
