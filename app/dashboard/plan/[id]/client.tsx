"use client";
import { usePlan } from "@/hooks/plans/usePlan";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardAction 
} from "@/components/ui/card";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Globe, FileText, Clock, DollarSign } from "lucide-react";

export function PlanDetailClient({ id }: { id: string }) {
  const { planData, isLoading, error, updateStepCompletion } = usePlan(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading plan...</div>
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

  if (!planData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Plan not found</div>
      </div>
    );
  }

  const { plan, steps, country } = planData;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Immigration Plan Details</h1>
        <p className="text-muted-foreground">
          Your personalized immigration plan for {country.name}
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Country Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Globe className="mr-2 h-4 w-4" />
              Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{country.name}</div>
          </CardContent>
        </Card>

        {/* Visa Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <FileText className="mr-2 h-4 w-4" />
              Recommended Visa Type
            </CardTitle>
            <CardAction>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Visa Type Explanation</h4>
                    <p className="text-sm text-muted-foreground">
                      {plan.visa_explanation}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan.recommended_visa_type}</div>
          </CardContent>
        </Card>

        {/* Timeline Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Clock className="mr-2 h-4 w-4" />
              Expected Timeline
            </CardTitle>
            <CardAction>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Timeline Explanation</h4>
                    <p className="text-sm text-muted-foreground">
                      {plan.timeline_explanation}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan.expected_timeline}</div>
          </CardContent>
        </Card>

        {/* Cost Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <DollarSign className="mr-2 h-4 w-4" />
              Expected Cost
            </CardTitle>
            <CardAction>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Cost Explanation</h4>
                    <p className="text-sm text-muted-foreground">
                      {plan.cost_explanation}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan.expected_cost}</div>
          </CardContent>
        </Card>
      </div>

      {/* Steps Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Immigration Steps</h2>
        <div className="space-y-3">
          {steps.map((step) => (
            <Card key={step.id} className={`${step.is_completed ? "bg-green-50" : ""}`}>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.is_completed
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.order}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center space-x-3">
                    <Checkbox
                      className="border-gray-300 cursor-pointer"
                      checked={step.is_completed}
                      onCheckedChange={(checked) => {
                        updateStepCompletion(step.id, checked === true);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
