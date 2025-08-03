"use client";

import { CountryPopover } from "./country-popover";
import { fetchCountryDetails } from "@/services/countries";
import { CountryData } from "@/types/country";
import { useCreatePlan } from "@/hooks/useCreatePlan";
import { useChatContext } from "@/components/chat/ChatContext";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface GoogleMapsProps {
  className?: string;
  height?: string;
  enableChatIntegration?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

export const GoogleMaps = ({
  className = "",
  height = "600px",
  enableChatIntegration = false,
}: GoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popoverData, setPopoverData] = useState<CountryData | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const createPlanMutation = useCreatePlan({
    onSuccess: () => {
      setIsPopoverOpen(false);
      setPopoverData(null);
    }
  });

  // Chat integration
  const chatContext = enableChatIntegration ? useChatContext() : null;
  const openChatWithMessage = chatContext?.openChatWithMessage ?? null;

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
      zoom: 2.5,
      center: { lat: 20, lng: 0 }, // Center of the world
      mapTypeId: "roadmap",
      minZoom: 2,
      maxZoom: 18,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
      styles: [
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#317b22" }, { weight: 1 }],
        },
      ],
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
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
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
                isLoading: true,
              };

              setPopoverData(initialData);
              setIsPopoverOpen(true);

              // Fetch rich country data in the background
              fetchCountryDetails(countryCode).then((additionalData) => {
                setPopoverData((prev) =>
                  prev
                    ? {
                        ...prev,
                        ...additionalData,
                        isLoading: false,
                      }
                    : null
                );
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
      
      if (enableChatIntegration && openChatWithMessage) {
        openChatWithMessage(
          `I'd like to move to ${popoverData.name}. What's the process like?`,
          popoverData.name
        );
      }
      
      setIsPopoverOpen(false);
      setPopoverData(null);
    }
  };

  const handleCreatePlan = () => {
    if (!popoverData) return;

    createPlanMutation.mutate({
      targetCountry: popoverData.name,
    });
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
          <CountryPopover
            data={popoverData}
            isOpen={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
            onSelect={handleCountrySelect}
            onCreatePlan={handleCreatePlan}
            createPlanMutation={createPlanMutation}
          />
        )}
      </div>
    </div>
  );
};
