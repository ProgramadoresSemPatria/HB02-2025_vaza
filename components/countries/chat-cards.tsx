"use client";

import { useEffect } from "react";
import { useCountry } from "@/hooks/country/useCountry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface ChatCardsProps {
  profileId: string;
}

export const ChatCards = ({ profileId }: ChatCardsProps) => {
  const { countries, getCountries, isLoading } = useCountry();

  useEffect(() => {
    getCountries(profileId);
  }, [profileId, getCountries]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!countries.length) {
    return (
      <Card className="p-6">
        <p className="text-gray-600">No countries added yet.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {countries.map((country) => (
        <Card key={country.id} className="p-6 flex flex-row justify-between items-center">
          <h3 className="text-xl font-semibold">{country.name}</h3>
          <Button>
            <Play className="w-4 h-4" />
            Continue
          </Button>
        </Card>
      ))}
    </div>
  );
};
