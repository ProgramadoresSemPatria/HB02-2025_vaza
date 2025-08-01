"use client";

import { GoogleMaps } from "@/components/google-maps";
import { useChatContext } from "@/components/chat/ChatContext";

const CountriesPage = () => {
  const { openChatWithMessage } = useChatContext();

  const handleCountrySelect = (countryName: string, countryCode: string) => {
    console.log(`Selected country: ${countryName} (${countryCode})`);
    
    // Open chat with personalized message
    openChatWithMessage(`I'd like to move to ${countryName}. What's the process like?`);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Countries</h1>
        <p className="text-gray-600">
          Select your destination country to start planning your journey.
        </p>
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
