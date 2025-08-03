"use client";

import { GoogleMaps } from "@/components/countries/google-maps";
import { ChatCards } from "@/components/countries/chat-cards";
import { useProfile } from "@/hooks/useProfile";

const CountriesPage = () => {
  const { profile } = useProfile();

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
          height="600px"
          className="w-full mb-8"
        />
        {profile && <ChatCards profileId={profile.id} />}
      </div>
    </div>
  );
};

export default CountriesPage;
