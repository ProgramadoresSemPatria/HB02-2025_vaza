"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePlan } from "@/hooks/plans/usePlan";
import { Clock, DollarSign, FileText, Globe, HelpCircle } from "lucide-react";

export function PlanDetailClient({ id }: { id: string }) {
  const { planData, isLoading, error, updateStepCompletion } = usePlan(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading plan...</div>
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

  if (!planData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-lg font-medium">Plan not found</div>
      </div>
    );
  }

  const { plan, steps, country } = planData;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Immigration Plan Details
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Your personalized immigration plan for {country.name}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Country Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="mr-2 h-4 w-4 text-blue-600" />
                Country
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-gray-900">
                {country.name}
              </div>
            </CardContent>
          </Card>

          {/* Visa Type Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-green-600" />
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
              <div className="text-lg font-semibold text-gray-900">
                {plan.recommended_visa_type}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="mr-2 h-4 w-4 text-purple-600" />
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
              <div className="text-lg font-semibold text-gray-900">
                {plan.expected_timeline}
              </div>
            </CardContent>
          </Card>

          {/* Cost Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="mr-2 h-4 w-4 text-orange-600" />
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
              <div className="text-lg font-semibold text-gray-900">
                {plan.expected_cost}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Steps Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Immigration Steps</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <Card
                key={step.id}
                className={`border-gray-200 shadow-sm ${
                  step.is_completed ? "bg-green-50 border-green-200" : ""
                }`}
              >
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
                      <h3 className="text-lg font-medium text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
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
    </div>
  );
}
