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
    description: "América do Sul",
    coordinates: { lat: 6.42375, lng: -66.58973 },
  },
  {
    id: "peru",
    name: "Peru",
    flag: "🇵🇪",
    description: "América do Sul",
    coordinates: { lat: -9.19, lng: -75.0152 },
  },
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    description: "América do Sul",
    coordinates: { lat: -35.6751, lng: -71.543 },
  },
  {
    id: "ecuador",
    name: "Equador",
    flag: "🇪🇨",
    description: "América do Sul",
    coordinates: { lat: -1.8312, lng: -78.1834 },
  },
  {
    id: "bolivia",
    name: "Bolívia",
    flag: "🇧🇴",
    description: "América do Sul",
    coordinates: { lat: -16.2902, lng: -63.5887 },
  },
  {
    id: "paraguay",
    name: "Paraguai",
    flag: "🇵🇾",
    description: "América do Sul",
    coordinates: { lat: -23.4425, lng: -58.4438 },
  },
  {
    id: "uruguay",
    name: "Uruguai",
    flag: "🇺🇾",
    description: "América do Sul",
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          De onde você está partindo? 🛫
        </h2>
        <p className="text-sm md:text-base text-gray-600">Seu país de origem</p>
      </div>

      <div className="space-y-3">
        <OptionButton
          isSelected={currentCountry === "brazil"}
          onClick={() => onUpdate("brazil")}
          icon={MapPin}
        >
          🇧🇷 Brasil
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
          🇨🇴 Colômbia
        </OptionButton>

        <OptionButton
          isSelected={currentCountry === "other"}
          onClick={() => setShowMap(true)}
          icon={Globe}
        >
          🌍 Outro país
        </OptionButton>
      </div>

      {/* Mapa do país selecionado */}
      {currentCountry && currentCountry !== "other" && (
        <div className="mt-6">
          <div className="h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
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
          <p className="text-xs md:text-sm text-gray-600 mt-2 text-center">
            Localização do seu país de origem
          </p>
        </div>
      )}

      {/* Modal para outros países */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 z-[60]">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-3 md:p-4 border-b flex justify-between items-center">
              <h3 className="text-base md:text-lg font-semibold">
                Escolha seu país de origem
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700 p-1 md:p-2 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-3 md:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Lista de países */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">
                    Outros países da América do Sul:
                  </h4>
                  <div className="max-h-64 md:max-h-80 overflow-y-auto space-y-2">
                    {otherCountries.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => handleMapCountrySelect(country)}
                        className="w-full p-2 md:p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-xl md:text-2xl mr-2 md:mr-3">
                            {country.flag}
                          </span>
                          <div>
                            <div className="font-medium text-sm md:text-base">
                              {country.name}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">
                              {country.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mapa */}
                <div className="h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
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

              <div className="mt-3 md:mt-4 text-center">
                <p className="text-xs md:text-sm text-gray-600">
                  Clique em um país da lista ou explore o mapa para escolher seu
                  país de origem
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
