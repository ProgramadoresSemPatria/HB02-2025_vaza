import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CountryData } from "@/types/country";
import { useCountry } from "@/hooks/country/useCountry";
import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { Lock, MessageCircle, Play} from "lucide-react";
import { CreatePlanDialog } from "@/components/plan/create-plan-dialog";
import { useState } from "react";

interface CountryPopoverProps {
  data: CountryData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: () => void;
  onCreatePlan: () => void;
  createPlanMutation: {
    isPending: boolean;
  };
}

export const CountryPopover = ({
  data: popoverData,
  isOpen,
  onOpenChange,
  onSelect: handleCountrySelect,
  onCreatePlan: handleCreatePlan,
  createPlanMutation,
}: CountryPopoverProps) => {
  const { profile } = useProfile();
  const { getCountryByNameAndProfileId } = useCountry();
  const [countryExists, setCountryExists] = useState<boolean>(false);
  const [isCheckingCountry, setIsCheckingCountry] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

  useEffect(() => {
    const checkCountryExists = async () => {
      if (!profile?.id || !popoverData.name) return;
      
      setIsCheckingCountry(true);
      try {
        const existingCountry = await getCountryByNameAndProfileId(popoverData.name, profile.id);
        console.log("existingCountry", existingCountry);
        setCountryExists(!!existingCountry);
        console.log("countryExists", countryExists);
      } catch (error) {
        console.error('Error checking country existence:', error);
      } finally {
        setIsCheckingCountry(false);
      }
    };

    checkCountryExists();
  }, [profile?.id, popoverData.name, getCountryByNameAndProfileId, countryExists]);

  return (
    <div
      style={{
        position: "absolute",
        left: popoverData.position.x,
        top: popoverData.position.y,
        transform: "translate(-50%, -100%)",
        zIndex: 50,
      }}
    >
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <div className="w-0 h-0" />
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {/* Header with flag */}
            <div className="flex items-center gap-3">
              {popoverData.flag && !popoverData.isLoading && (
                <Image
                  src={popoverData.flag}
                  alt={`${popoverData.name} flag`}
                  width={32}
                  height={32}
                  className="w-8 h-6 object-cover rounded border"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {popoverData.name}
                  {popoverData.isLoading && (
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  {popoverData.code} • {popoverData.region}
                  {popoverData.subregion && `, ${popoverData.subregion}`}
                </p>
              </div>
            </div>

            {/* Country Details */}
            {!popoverData.isLoading && (
              <div className="grid grid-cols-1 gap-3 text-sm">
                {popoverData.capital && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Capital:
                    </span>
                    <span className="text-gray-900">
                      {popoverData.capital}
                    </span>
                  </div>
                )}

                {popoverData.population && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Population:
                    </span>
                    <span className="text-gray-900">
                      {popoverData.population.toLocaleString()}
                    </span>
                  </div>
                )}

                {popoverData.area && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Area:
                    </span>
                    <span className="text-gray-900">
                      {popoverData.area.toLocaleString()} km²
                    </span>
                  </div>
                )}

                {popoverData.currencies && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Currency:
                    </span>
                    <span className="text-gray-900">
                      {Object.values(popoverData.currencies)
                        .map(
                          (currency) =>
                            `${currency.name} (${currency.symbol})`
                        )
                        .join(", ")}
                    </span>
                  </div>
                )}

                {popoverData.languages && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Languages:
                    </span>
                    <span className="text-gray-900">
                      {Object.values(popoverData.languages).join(", ")}
                    </span>
                  </div>
                )}

                {popoverData.timezones && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Timezone:
                    </span>
                    <span className="text-gray-900">
                      {popoverData.timezones[0]}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>Coordinates:</span>
                  <span>
                    {popoverData.coordinates.lat.toFixed(4)},{" "}
                    {popoverData.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {popoverData.isLoading && (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                onClick={handleCountrySelect}
                className="flex-1"
                disabled={popoverData.isLoading || isCheckingCountry || countryExists}
                title={countryExists ? "Plan already exists" : ""}
              >
                {isCheckingCountry ? "Loading..." : (
                  <>
                    {countryExists ? (
                      <Lock className="w-4 h-4 mr-2" />
                    ) : (
                      <MessageCircle className="w-4 h-4 mr-2" />
                    )}
                    {`Discover ${popoverData.name}`}
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false); // Close the popover
                  setIsPlanDialogOpen(true); // Open the plan dialog
                }}
                className="flex-1 bg-brand-primary hover:bg-brand-primary/80 text-white"
                disabled={popoverData.isLoading || createPlanMutation.isPending || isCheckingCountry || !countryExists}
                title={!countryExists ? "You need to create a plan first" : ""}
              >
                {createPlanMutation.isPending ? "Creating..." : 
                 isCheckingCountry ? "Loading..." : (
                   <>
                     {!countryExists ? (
                      <Lock className="w-4 h-4 mr-2" />
                     ) : (
                      <Play className="w-4 h-4 mr-2" />
                     )}
                     Create Plan
                   </>
                 )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <CreatePlanDialog
        isOpen={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        targetCountry={popoverData.name}
      />
    </div>
  );
};