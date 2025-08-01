"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@/components/ui";
import { fetchCountryDetails } from "@/services/countries";
import { CountryData } from "@/types/country";

interface GoogleMapsProps {
  onCountrySelect?: (country: string, countryCode: string, countryData?: CountryData) => void;
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

export const GoogleMaps = ({ 
  onCountrySelect, 
  className = "", 
  height = "500px" 
}: GoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popoverData, setPopoverData] = useState<CountryData | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && mapRef.current && window.google) {
      initializeMap();
    }
  }, [isLoaded]);

  // Failsafe: Also check if Google Maps API becomes available
  useEffect(() => {
    if (mapRef.current && window.google && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 2,
      center: { lat: 20, lng: 0 }, // Center of the world
      mapTypeId: "roadmap",
      styles: [
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            { color: "#317b22" },
            { weight: 1 }
          ]
        }
      ]
    });

    // Create a geocoder instance
    const geocoder = new window.google.maps.Geocoder();

    // Add click listener to the map
    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (!event.latLng || !mapRef.current) return;
      
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      // Get the center position for the popover (simplified approach)
      const mapRect = mapRef.current.getBoundingClientRect();
      const clickX = mapRect.width / 2;
      const clickY = mapRect.height / 3; // Position it in the upper third of the map
      
      // Reverse geocode to get country information
      geocoder.geocode(
        { location: { lat, lng } },
        (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            // Find the country component
            const countryComponent = results[0].address_components?.find(
              (component: google.maps.GeocoderAddressComponent) => 
                component.types.includes("country")
            );
            
            if (countryComponent) {
              const countryName = countryComponent.long_name;
              const countryCode = countryComponent.short_name;
              

              // Set initial popover data with loading state
              const initialData: CountryData = {
                name: countryName,
                code: countryCode,
                position: { x: clickX, y: clickY },
                coordinates: { lat, lng },
                isLoading: true
              };
              
              setPopoverData(initialData);
              setIsPopoverOpen(true);

              // Fetch rich country data in the background
              fetchCountryDetails(countryCode).then(additionalData => {
                setPopoverData(prev => prev ? {
                  ...prev,
                  ...additionalData,
                  isLoading: false
                } : null);
              });
            }
          }
        }
      );
    });
  };

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  const handleScriptReady = () => {
    // Handle case where script is cached and onLoad doesn't fire
    if (window.google) {
      setIsLoaded(true);
    }
  };

  const handleCountrySelect = () => {
    if (popoverData) {
      onCountrySelect?.(popoverData.name, popoverData.code, popoverData);
      setIsPopoverOpen(false);
      setPopoverData(null);
    }
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    setPopoverData(null);
  };

  return (
    <div className={className}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`}
        onLoad={handleScriptLoad}
        onReady={handleScriptReady}
        strategy="afterInteractive"
      />
      
      <div className="relative">
      <div 
        ref={mapRef} 
        style={{ width: "100%", height }}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
      
        {/* Popover for country selection */}
        {popoverData && (
          <div
            style={{
              position: "absolute",
              left: popoverData.position.x,
              top: popoverData.position.y,
              transform: "translate(-50%, -100%)",
              zIndex: 50,
            }}
          >
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="w-0 h-0" />
              </PopoverTrigger>
              <PopoverContent className="w-96 p-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {/* Header with flag */}
                  <div className="flex items-center gap-3">
                    {popoverData.flag && !popoverData.isLoading && (
                      <img 
                        src={popoverData.flag} 
                        alt={`${popoverData.name} flag`}
                        className="w-8 h-6 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {popoverData.name}
                        {popoverData.isLoading && (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {popoverData.code} • {popoverData.region}{popoverData.subregion && `, ${popoverData.subregion}`}
                      </p>
                    </div>
                  </div>

                  {/* Country Details */}
                  {!popoverData.isLoading && (
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      {popoverData.capital && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Capital:</span>
                          <span className="text-gray-900">{popoverData.capital}</span>
                        </div>
                      )}
                      
                      {popoverData.population && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Population:</span>
                          <span className="text-gray-900">{popoverData.population.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {popoverData.area && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Area:</span>
                          <span className="text-gray-900">{popoverData.area.toLocaleString()} km²</span>
                        </div>
                      )}
                      
                      {popoverData.currencies && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Currency:</span>
                          <span className="text-gray-900">
                            {Object.values(popoverData.currencies).map(currency => 
                              `${currency.name} (${currency.symbol})`
                            ).join(', ')}
                          </span>
                        </div>
                      )}
                      
                      {popoverData.languages && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Languages:</span>
                          <span className="text-gray-900">
                            {Object.values(popoverData.languages).join(', ')}
                          </span>
                        </div>
                      )}
                      
                      {popoverData.timezones && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Timezone:</span>
                          <span className="text-gray-900">{popoverData.timezones[0]}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                        <span>Coordinates:</span>
                        <span>{popoverData.coordinates.lat.toFixed(4)}, {popoverData.coordinates.lng.toFixed(4)}</span>
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {popoverData.isLoading && (
                    <div className="text-center py-4">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Loading country details...</p>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      onClick={handleCountrySelect}
                      className="flex-1"
                      disabled={popoverData.isLoading}
                    >
                      Select {popoverData.name}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handlePopoverClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
        </div>
      )}
      </div>
    </div>
  );
};