"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import { Country } from "./types";
import { getDifficultyColor } from "./utils";

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export function CountrySelector({
  countries,
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GlobeIcon className="h-5 w-5" />
          Destination Country
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{selectedCountry.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{selectedCountry.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedCountry.avgTime}
                  </div>
                </div>
              </div>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[400px]">
            {countries.map((country) => (
              <DropdownMenuItem
                key={country.id}
                onClick={() => onCountryChange(country)}
                className="flex items-center gap-3 cursor-pointer p-3"
              >
                <span className="text-xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{country.name}</div>
                  <div className="text-sm text-gray-500">{country.avgTime}</div>
                </div>
                <Badge className={getDifficultyColor(country.difficulty)}>
                  {country.difficulty}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Difficulty</div>
            <Badge className={getDifficultyColor(selectedCountry.difficulty)}>
              {selectedCountry.difficulty}
            </Badge>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Avg. Time</div>
            <div className="text-gray-600">{selectedCountry.avgTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
