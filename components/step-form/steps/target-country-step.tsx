import { Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { OptionButton } from "../option-button";

interface TargetCountryStepProps {
  targetCountry: string;
  onUpdate: (value: string) => void;
}

interface CountryOption {
  id: string;
  name: string;
  flag: string;
  description: string;
  coordinates: { lat: number; lng: number };
  region: string;
}

const popularCountries: CountryOption[] = [
  {
    id: "canada",
    name: "Canadá",
    flag: "🇨🇦",
    description: "Trabalho e estudo",
    coordinates: { lat: 56.1304, lng: -106.3468 },
    region: "América do Norte",
  },
  {
    id: "australia",
    name: "Austrália",
    flag: "🇦🇺",
    description: "Vida e trabalho",
    coordinates: { lat: -25.2744, lng: 133.7751 },
    region: "Oceania",
  },
  {
    id: "newzealand",
    name: "Nova Zelândia",
    flag: "🇳🇿",
    description: "Qualidade de vida",
    coordinates: { lat: -40.9006, lng: 174.886 },
    region: "Oceania",
  },
  {
    id: "germany",
    name: "Alemanha",
    flag: "🇩🇪",
    description: "Tecnologia e inovação",
    coordinates: { lat: 51.1657, lng: 10.4515 },
    region: "Europa",
  },
];

const allCountries: CountryOption[] = [
  // América do Norte
  {
    id: "canada",
    name: "Canadá",
    flag: "🇨🇦",
    description: "Trabalho e estudo",
    coordinates: { lat: 56.1304, lng: -106.3468 },
    region: "América do Norte",
  },
  {
    id: "usa",
    name: "Estados Unidos",
    flag: "🇺🇸",
    description: "Oportunidades",
    coordinates: { lat: 37.0902, lng: -95.7129 },
    region: "América do Norte",
  },

  // Europa
  {
    id: "germany",
    name: "Alemanha",
    flag: "🇩🇪",
    description: "Tecnologia e inovação",
    coordinates: { lat: 51.1657, lng: 10.4515 },
    region: "Europa",
  },
  {
    id: "uk",
    name: "Reino Unido",
    flag: "🇬🇧",
    description: "Educação e negócios",
    coordinates: { lat: 55.3781, lng: -3.436 },
    region: "Europa",
  },
  {
    id: "france",
    name: "França",
    flag: "🇫🇷",
    description: "Cultura e tecnologia",
    coordinates: { lat: 46.2276, lng: 2.2137 },
    region: "Europa",
  },
  {
    id: "netherlands",
    name: "Holanda",
    flag: "🇳🇱",
    description: "Inovação e qualidade de vida",
    coordinates: { lat: 52.1326, lng: 5.2913 },
    region: "Europa",
  },
  {
    id: "sweden",
    name: "Suécia",
    flag: "🇸🇪",
    description: "Bem-estar social",
    coordinates: { lat: 60.1282, lng: 18.6435 },
    region: "Europa",
  },
  {
    id: "norway",
    name: "Noruega",
    flag: "🇳🇴",
    description: "Qualidade de vida",
    coordinates: { lat: 60.472, lng: 8.4689 },
    region: "Europa",
  },
  {
    id: "denmark",
    name: "Dinamarca",
    flag: "🇩🇰",
    description: "Felicidade e inovação",
    coordinates: { lat: 56.2639, lng: 9.5018 },
    region: "Europa",
  },
  {
    id: "switzerland",
    name: "Suíça",
    flag: "🇨🇭",
    description: "Estabilidade e qualidade",
    coordinates: { lat: 46.8182, lng: 8.2275 },
    region: "Europa",
  },
  {
    id: "ireland",
    name: "Irlanda",
    flag: "🇮🇪",
    description: "Tecnologia e crescimento",
    coordinates: { lat: 53.4129, lng: -8.2439 },
    region: "Europa",
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    description: "Custo-benefício",
    coordinates: { lat: 39.3999, lng: -8.2245 },
    region: "Europa",
  },
  {
    id: "spain",
    name: "Espanha",
    flag: "🇪🇸",
    description: "Cultura e clima",
    coordinates: { lat: 40.4637, lng: -3.7492 },
    region: "Europa",
  },
  {
    id: "italy",
    name: "Itália",
    flag: "🇮🇹",
    description: "História e gastronomia",
    coordinates: { lat: 41.8719, lng: 12.5674 },
    region: "Europa",
  },
  {
    id: "belgium",
    name: "Bélgica",
    flag: "🇧🇪",
    description: "Centro da Europa",
    coordinates: { lat: 50.8503, lng: 4.3517 },
    region: "Europa",
  },
  {
    id: "austria",
    name: "Áustria",
    flag: "🇦🇹",
    description: "Cultura e natureza",
    coordinates: { lat: 47.5162, lng: 14.5501 },
    region: "Europa",
  },
  {
    id: "finland",
    name: "Finlândia",
    flag: "🇫🇮",
    description: "Educação e tecnologia",
    coordinates: { lat: 61.9241, lng: 25.7482 },
    region: "Europa",
  },

  // Oceania
  {
    id: "australia",
    name: "Austrália",
    flag: "🇦🇺",
    description: "Vida e trabalho",
    coordinates: { lat: -25.2744, lng: 133.7751 },
    region: "Oceania",
  },
  {
    id: "newzealand",
    name: "Nova Zelândia",
    flag: "🇳🇿",
    description: "Qualidade de vida",
    coordinates: { lat: -40.9006, lng: 174.886 },
    region: "Oceania",
  },

  // Ásia
  {
    id: "japan",
    name: "Japão",
    flag: "🇯🇵",
    description: "Tecnologia e tradição",
    coordinates: { lat: 36.2048, lng: 138.2529 },
    region: "Ásia",
  },
  {
    id: "singapore",
    name: "Singapura",
    flag: "🇸🇬",
    description: "Negócios e inovação",
    coordinates: { lat: 1.3521, lng: 103.8198 },
    region: "Ásia",
  },
  {
    id: "southkorea",
    name: "Coreia do Sul",
    flag: "🇰🇷",
    description: "Tecnologia e cultura",
    coordinates: { lat: 35.9078, lng: 127.7669 },
    region: "Ásia",
  },
  {
    id: "malaysia",
    name: "Malásia",
    flag: "🇲🇾",
    description: "Crescimento econômico",
    coordinates: { lat: 4.2105, lng: 108.9758 },
    region: "Ásia",
  },
  {
    id: "thailand",
    name: "Tailândia",
    flag: "🇹🇭",
    description: "Cultura e turismo",
    coordinates: { lat: 15.87, lng: 100.9925 },
    region: "Ásia",
  },
  {
    id: "vietnam",
    name: "Vietnã",
    flag: "🇻🇳",
    description: "Crescimento rápido",
    coordinates: { lat: 14.0583, lng: 108.2772 },
    region: "Ásia",
  },

  // América do Sul (para quem quer voltar)
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    description: "Estabilidade na América do Sul",
    coordinates: { lat: -35.6751, lng: -71.543 },
    region: "América do Sul",
  },
  {
    id: "uruguay",
    name: "Uruguai",
    flag: "🇺🇾",
    description: "Qualidade de vida na América do Sul",
    coordinates: { lat: -32.5228, lng: -55.7658 },
    region: "América do Sul",
  },

  // África
  {
    id: "southafrica",
    name: "África do Sul",
    flag: "🇿🇦",
    description: "Oportunidades na África",
    coordinates: { lat: -30.5595, lng: 22.9375 },
    region: "África",
  },
  {
    id: "morocco",
    name: "Marrocos",
    flag: "🇲🇦",
    description: "Cultura e proximidade com Europa",
    coordinates: { lat: 31.7917, lng: -7.0926 },
    region: "África",
  },
];

// Países adicionais que podem ser adicionados dinamicamente
const additionalCountries: { [key: string]: CountryOption } = {
  mexico: {
    id: "mexico",
    name: "México",
    flag: "🇲🇽",
    description: "Cultura e proximidade",
    coordinates: { lat: 23.6345, lng: -102.5528 },
    region: "América do Norte",
  },
  "costa-rica": {
    id: "costa-rica",
    name: "Costa Rica",
    flag: "🇨🇷",
    description: "Qualidade de vida",
    coordinates: { lat: 9.9281, lng: -84.0907 },
    region: "América do Norte",
  },
  panama: {
    id: "panama",
    name: "Panamá",
    flag: "🇵🇦",
    description: "Negócios e canal",
    coordinates: { lat: 8.538, lng: -80.7821 },
    region: "América do Norte",
  },
  poland: {
    id: "poland",
    name: "Polônia",
    flag: "🇵🇱",
    description: "Crescimento econômico",
    coordinates: { lat: 51.9194, lng: 19.1451 },
    region: "Europa",
  },
  czech: {
    id: "czech",
    name: "República Tcheca",
    flag: "🇨🇿",
    description: "História e tecnologia",
    coordinates: { lat: 49.8175, lng: 15.473 },
    region: "Europa",
  },
  hungary: {
    id: "hungary",
    name: "Hungria",
    flag: "🇭🇺",
    description: "Cultura e tradição",
    coordinates: { lat: 47.1625, lng: 19.5033 },
    region: "Europa",
  },
  slovakia: {
    id: "slovakia",
    name: "Eslováquia",
    flag: "��🇰",
    description: "Natureza e tecnologia",
    coordinates: { lat: 48.669, lng: 19.699 },
    region: "Europa",
  },
  slovenia: {
    id: "slovenia",
    name: "Eslovênia",
    flag: "🇸🇮",
    description: "Qualidade de vida",
    coordinates: { lat: 46.0569, lng: 14.5058 },
    region: "Europa",
  },
  croatia: {
    id: "croatia",
    name: "Croácia",
    flag: "🇭🇷",
    description: "Costa e turismo",
    coordinates: { lat: 45.1, lng: 15.2 },
    region: "Europa",
  },
  greece: {
    id: "greece",
    name: "Grécia",
    flag: "🇬🇷",
    description: "História e ilhas",
    coordinates: { lat: 39.0742, lng: 21.8243 },
    region: "Europa",
  },
  turkey: {
    id: "turkey",
    name: "Turquia",
    flag: "🇹🇷",
    description: "Ponte entre continentes",
    coordinates: { lat: 38.9637, lng: 35.2433 },
    region: "Europa",
  },
  israel: {
    id: "israel",
    name: "Israel",
    flag: "🇮🇱",
    description: "Tecnologia e inovação",
    coordinates: { lat: 31.0461, lng: 34.8516 },
    region: "Ásia",
  },
  uae: {
    id: "uae",
    name: "Emirados Árabes Unidos",
    flag: "🇦🇪",
    description: "Luxo e oportunidades",
    coordinates: { lat: 24.0, lng: 54.0 },
    region: "Ásia",
  },
  qatar: {
    id: "qatar",
    name: "Catar",
    flag: "🇶🇦",
    description: "Energia e crescimento",
    coordinates: { lat: 25.3548, lng: 51.1839 },
    region: "Ásia",
  },
  india: {
    id: "india",
    name: "Índia",
    flag: "🇮🇳",
    description: "Tecnologia e cultura",
    coordinates: { lat: 20.5937, lng: 78.9629 },
    region: "Ásia",
  },
  philippines: {
    id: "philippines",
    name: "Filipinas",
    flag: "🇵🇭",
    description: "Crescimento e ilhas",
    coordinates: { lat: 12.8797, lng: 121.774 },
    region: "Ásia",
  },
  indonesia: {
    id: "indonesia",
    name: "Indonésia",
    flag: "🇮🇩",
    description: "Diversidade e crescimento",
    coordinates: { lat: -0.7893, lng: 113.9213 },
    region: "Ásia",
  },
  brazil: {
    id: "brazil",
    name: "Brasil",
    flag: "🇧🇷",
    description: "Oportunidades na América do Sul",
    coordinates: { lat: -14.235, lng: -51.9253 },
    region: "América do Sul",
  },
  argentina: {
    id: "argentina",
    name: "Argentina",
    flag: "🇦🇷",
    description: "Cultura e oportunidades",
    coordinates: { lat: -38.4161, lng: -63.6167 },
    region: "América do Sul",
  },
  peru: {
    id: "peru",
    name: "Peru",
    flag: "🇵🇪",
    description: "História e crescimento",
    coordinates: { lat: -9.19, lng: -75.0152 },
    region: "América do Sul",
  },
  colombia: {
    id: "colombia",
    name: "Colômbia",
    flag: "🇨🇴",
    description: "Diversidade e oportunidades",
    coordinates: { lat: 4.5709, lng: -74.2973 },
    region: "América do Sul",
  },
  egypt: {
    id: "egypt",
    name: "Egito",
    flag: "🇪🇬",
    description: "História e cultura",
    coordinates: { lat: 26.8206, lng: 30.8025 },
    region: "África",
  },
  kenya: {
    id: "kenya",
    name: "Quênia",
    flag: "🇰🇪",
    description: "Tecnologia e natureza",
    coordinates: { lat: -0.0236, lng: 37.9062 },
    region: "África",
  },
  nigeria: {
    id: "nigeria",
    name: "Nigéria",
    flag: "🇳🇬",
    description: "Crescimento econômico",
    coordinates: { lat: 9.082, lng: 8.6753 },
    region: "África",
  },
};

export const TargetCountryStep = ({
  targetCountry,
  onUpdate,
}: TargetCountryStepProps) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"list" | "map">("list");
  const [availableCountries, setAvailableCountries] =
    useState<CountryOption[]>(allCountries);

  const handleMapCountrySelect = (country: CountryOption) => {
    onUpdate(country.id);
    setShowMap(false);
  };

  const handleMapClick = (countryId: string) => {
    if (
      !availableCountries.find((c) => c.id === countryId) &&
      additionalCountries[countryId]
    ) {
      const newCountry = additionalCountries[countryId];
      setAvailableCountries((prev) => [...prev, newCountry]);
      handleMapCountrySelect(newCountry);
    } else {
      const country = availableCountries.find((c) => c.id === countryId);
      if (country) {
        handleMapCountrySelect(country);
      }
    }
  };

  const filteredCountries =
    selectedRegion === "all"
      ? availableCountries
      : availableCountries.filter(
          (country) => country.region === selectedRegion
        );

  const regions = Array.from(
    new Set(availableCountries.map((c) => c.region))
  ).sort();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Para onde você quer ir? ✈️
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Seu destino dos sonhos
        </p>
      </div>

      <div className="space-y-3">
        {popularCountries.map((country) => (
          <OptionButton
            key={country.id}
            isSelected={targetCountry === country.id}
            onClick={() => onUpdate(country.id)}
            icon={MapPin}
          >
            {country.flag} {country.name}
            <span className="text-xs text-gray-500 ml-2">
              ({country.description})
            </span>
          </OptionButton>
        ))}

        <OptionButton
          isSelected={targetCountry === "map"}
          onClick={() => setShowMap(true)}
          icon={Globe}
        >
          🗺️ Ver mapa e escolher outro país
        </OptionButton>
      </div>

      {showMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 z-[60]">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="p-3 md:p-4 border-b flex justify-between items-center">
              <h3 className="text-base md:text-lg font-semibold">
                Escolha seu destino
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700 p-1 md:p-2 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="md:hidden border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === "list"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  📋 Lista
                </button>
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === "map"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  🗺️ Mapa
                </button>
              </div>
            </div>

            <div className="p-3 md:p-4">
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-4">
                {/* Filtro por região */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">
                      Filtrar por região:
                    </h4>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="all">Todas as regiões</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lista de países */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <h4 className="font-medium text-gray-700 mb-3">
                      {selectedRegion === "all"
                        ? "Todos os países:"
                        : `Países da ${selectedRegion}:`}
                    </h4>
                    {filteredCountries.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => handleMapCountrySelect(country)}
                        className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{country.flag}</span>
                          <div>
                            <div className="font-medium">{country.name}</div>
                            <div className="text-sm text-gray-500">
                              {country.description}
                            </div>
                            <div className="text-xs text-gray-400">
                              {country.region}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mapa do mundo */}
                <div className="col-span-2">
                  <div className="h-96 bg-gray-100 rounded-lg overflow-hidden relative">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=20,0&zoom=2"
                    />
                    {/* Overlay para capturar cliques */}
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => {
                        // Simula cliques em diferentes países
                        const countries = Object.keys(additionalCountries);
                        const randomCountry =
                          countries[
                            Math.floor(Math.random() * countries.length)
                          ];
                        handleMapClick(randomCountry);
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Explore o mapa ou use a lista ao lado para escolher seu
                    destino
                  </p>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {/* Tab: Lista */}
                {activeTab === "list" && (
                  <div className="space-y-4">
                    {/* Filtro por região */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">
                        Filtrar por região:
                      </h4>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-3 border rounded-lg text-base"
                      >
                        <option value="all">Todas as regiões</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Lista de países */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      <h4 className="font-medium text-gray-700 mb-3">
                        {selectedRegion === "all"
                          ? "Todos os países:"
                          : `Países da ${selectedRegion}:`}
                      </h4>
                      {filteredCountries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => handleMapCountrySelect(country)}
                          className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-3xl mr-4">
                              {country.flag}
                            </span>
                            <div>
                              <div className="font-medium text-base">
                                {country.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {country.description}
                              </div>
                              <div className="text-xs text-gray-400">
                                {country.region}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Mapa */}
                {activeTab === "map" && (
                  <div className="space-y-4">
                    <div className="h-80 bg-gray-100 rounded-lg overflow-hidden relative">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=20,0&zoom=2"
                      />
                      {/* Overlay para capturar cliques */}
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => {
                          const countries = Object.keys(additionalCountries);
                          const randomCountry =
                            countries[
                              Math.floor(Math.random() * countries.length)
                            ];
                          handleMapClick(randomCountry);
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Use a aba &quot;Lista&quot; para selecionar um país
                      específico ou clique no mapa para descobrir novos destinos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
