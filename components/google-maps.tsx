"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface GoogleMapsProps {
  onCountrySelect?: (country: string, countryCode: string) => void;
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    google: typeof google;
    selectCountry: (country: string, code: string) => void;
  }
}

export const GoogleMaps = ({ 
  onCountrySelect, 
  className = "", 
  height = "500px" 
}: GoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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
      if (!event.latLng) return;
      
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
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
              
              setSelectedCountry(countryName);
              
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

              // Create info window
              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${countryName}</h3>
                    <button 
                      onclick="window.selectCountry('${countryName}', '${countryCode}')"
                      style="
                        background: #4285f4; 
                        color: white; 
                        border: none; 
                        padding: 8px 16px; 
                        border-radius: 4px; 
                        cursor: pointer;
                        font-size: 14px;
                      "
                    >
                      Select ${countryName}
                    </button>
                  </div>
                `
              });

              // Open info window on marker click
              marker.addListener("click", () => {
                infoWindow.open(map, marker);
              });

              // Open info window immediately
              infoWindow.open(map, marker);
              
              // Set up global function for button click
              (window as any).selectCountry = (country: string, code: string) => {
                onCountrySelect?.(country, code);
                infoWindow.close();
              };
            }
          }
        }
      );
    });
  };

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={className}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`}
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />
      
      <div 
        ref={mapRef} 
        style={{ width: "100%", height }}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
      
      {selectedCountry && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {selectedCountry}
          </p>
        </div>
      )}
    </div>
  );
};