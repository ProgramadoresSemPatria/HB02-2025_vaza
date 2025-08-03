"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlans } from "@/hooks/plans/usePlans";
import { ChevronDown, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlanPage() {
  const { plans, isLoading, error } = usePlans();
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    router.push(`/dashboard/plan/${planId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">
          Loading your plans...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-lg font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Your Immigration Plans
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Select a plan to view details or create a new one
          </p>
        </div>

        {/* Plans Section */}
        <Card className="w-full max-w-2xl border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
              <Globe className="h-5 w-5 text-blue-600" />
              Available Plans ({plans.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {plans.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-gray-600 text-lg">
                  You don&apos;t have any immigration plans yet.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between py-3 px-4"
                    >
                      Select a plan to view
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[300px]">
                    {plans.map(({ plan, country }) => (
                      <DropdownMenuItem
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <Globe className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{country.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {plan.recommended_visa_type}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {plans.map(({ plan, country }) => (
                    <Card
                      key={plan.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Globe className="h-6 w-6 text-blue-500" />
                            <div>
                              <h3 className="font-semibold text-lg">
                                {country.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {plan.recommended_visa_type}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {plan.expected_timeline}
                            </p>
                            <p className="text-sm text-gray-600">
                              {plan.expected_cost}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
