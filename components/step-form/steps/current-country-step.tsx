import { Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { OptionButton } from "../option-button";

interface CurrentCountryStepProps {
  currentCountry: string;
  onUpdate: (value: string) => void;
}

interface CountryOption {
  id: string;
  name: string;
  flag: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

const getCountryCoordinates = (country: string) => {
  const coordinates = {
    brazil: { lat: -14.235004, lng: -51.92528 },
    argentina: { lat: -38.4161, lng: -63.6167 },
    colombia: { lat: 4.5709, lng: -74.2973 },
    other: { lat: 0, lng: 0 },
  };

  const otherCountryCoords = otherCountries.find(
    (c) => c.id === country
  )?.coordinates;
  return (
    otherCountryCoords ||
    coordinates[country as keyof typeof coordinates] ||
    coordinates.other
  );
};

const otherCountries: CountryOption[] = [
  {
    id: "venezuela",
    name: "Venezuela",
    flag: "🇻🇪",
    description: "South America",
    coordinates: { lat: 6.42375, lng: -66.58973 },
  },
  {
    id: "peru",
    name: "Peru",
    flag: "🇵🇪",
    description: "South America",
    coordinates: { lat: -9.19, lng: -75.0152 },
  },
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    description: "South America",
    coordinates: { lat: -35.6751, lng: -71.543 },
  },
  {
    id: "ecuador",
    name: "Ecuador",
    flag: "🇪🇨",
    description: "South America",
    coordinates: { lat: -1.8312, lng: -78.1834 },
  },
  {
    id: "bolivia",
    name: "Bolivia",
    flag: "🇧🇴",
    description: "South America",
    coordinates: { lat: -16.2902, lng: -63.5887 },
  },
  {
    id: "paraguay",
    name: "Paraguay",
    flag: "🇵🇾",
    description: "South America",
    coordinates: { lat: -23.4425, lng: -58.4438 },
  },
  {
    id: "uruguay",
    name: "Uruguay",
    flag: "🇺🇾",
    description: "South America",
    coordinates: { lat: -32.5228, lng: -55.7658 },
  },
];

export const CurrentCountryStep = ({
  currentCountry,
  onUpdate,
}: CurrentCountryStepProps) => {
  const [showMap, setShowMap] = useState(false);
  const coordinates = getCountryCoordinates(currentCountry);

  const handleMapCountrySelect = (country: CountryOption) => {
    onUpdate(country.id);
    setShowMap(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
          Where are you leaving from? 🛫
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Your origin country
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <OptionButton
          isSelected={currentCountry === "brazil"}
          onClick={() => onUpdate("brazil")}
          icon={MapPin}
        >
          🇧🇷 Brazil
        </OptionButton>

        <OptionButton
          isSelected={currentCountry === "argentina"}
          onClick={() => onUpdate("argentina")}
          icon={MapPin}
        >
          🇦🇷 Argentina
        </OptionButton>

        <OptionButton
          isSelected={currentCountry === "colombia"}
          onClick={() => onUpdate("colombia")}
          icon={MapPin}
        >
          🇨🇴 Colombia
        </OptionButton>

        <OptionButton
          isSelected={currentCountry === "other"}
          onClick={() => setShowMap(true)}
          icon={Globe}
        >
          🌍 Another country
        </OptionButton>
      </div>

      {/* Mapa do país selecionado */}
      {currentCountry && currentCountry !== "other" && (
        <div className="mt-4 sm:mt-6">
          <div className="h-40 sm:h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${coordinates.lat},${coordinates.lng}&zoom=3`}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
            Location of your home country
          </p>
        </div>
      )}

      {/* Modal for other countries */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[60]">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b flex justify-between items-center">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold">
                Choose your origin country
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
                    Other countries in South America:
                  </h4>
                  <div className="max-h-48 sm:max-h-64 md:max-h-80 overflow-y-auto space-y-2 scrollbar-hide">
                    {otherCountries.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => handleMapCountrySelect(country)}
                        className="w-full p-2 sm:p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 flex-shrink-0">
                            {country.flag}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm sm:text-base truncate">
                              {country.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                              {country.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mapa */}
                <div className="h-40 sm:h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=-15,-60&zoom=4"
                  />
                </div>
              </div>

              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Click on a country from the list or explore the map to choose your home country
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
