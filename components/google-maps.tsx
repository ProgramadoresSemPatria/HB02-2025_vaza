"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@/components/ui";

interface GoogleMapsProps {
  onCountrySelect?: (country: string, countryCode: string) => void;
  className?: string;
  height?: string;
}

interface CountryData {
  name: string;
  code: string;
  position: { x: number; y: number };
  coordinates: { lat: number; lng: number };
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
            { color: "#4285f4" },
            { weight: 2 }
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
              
              // Add a marker at the clicked location
              const marker = new window.google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: countryName,
                icon: {
                  url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285f4"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(24, 24),
                  anchor: new window.google.maps.Point(12, 24),
                }
              });

              // Set popover data and open it
              setPopoverData({
                name: countryName,
                code: countryCode,
                position: { x: clickX, y: clickY },
                coordinates: { lat, lng }
              });
              setIsPopoverOpen(true);
            }
          }
        }
      );
    });
  };

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  const handleCountrySelect = () => {
    if (popoverData) {
      onCountrySelect?.(popoverData.name, popoverData.code);
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
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {popoverData.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Country Code: {popoverData.code}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {popoverData.coordinates.lat.toFixed(4)}, {popoverData.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCountrySelect}
                      className="flex-1"
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