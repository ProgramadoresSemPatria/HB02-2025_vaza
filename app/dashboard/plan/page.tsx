"use client";

import { usePlans } from "@/hooks/plans/usePlans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your plans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Immigration Plans</h1>
        <p className="text-muted-foreground">
          Select a plan to view details or create a new one
        </p>
      </div>

      {/* Plans Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Available Plans ({plans.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {plans.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-muted-foreground">
                You don&apos;t have any immigration plans yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
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
              <div className="grid grid-cols-1 gap-3">
                {plans.map(({ plan, country }) => (
                  <Card 
                    key={plan.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{country.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {plan.recommended_visa_type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{plan.expected_timeline}</p>
                          <p className="text-sm text-muted-foreground">{plan.expected_cost}</p>
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
  );
}
