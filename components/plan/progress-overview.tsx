"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ProgressOverviewProps {
  completedTasks: number;
  totalTasks: number;
  progressPercentage: number;
  estimatedTotalDays: number;
  remainingDays: number;
}

export function ProgressOverview({
  completedTasks,
  totalTasks,
  progressPercentage,
  estimatedTotalDays,
  remainingDays,
}: ProgressOverviewProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="font-semibold text-gray-900">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="bg-green-50 p-5 rounded-xl border border-green-100">
            <div className="font-medium text-green-900 mb-2">Completed</div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {completedTasks}
            </div>
            <div className="text-green-600 font-medium">tasks</div>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
            <div className="font-medium text-blue-900 mb-2">Remaining</div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {totalTasks - completedTasks}
            </div>
            <div className="text-blue-600 font-medium">tasks</div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Time Estimate</span>
            <span className="font-semibold text-gray-900">
              {remainingDays} days left
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Total estimated: {estimatedTotalDays} days
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
