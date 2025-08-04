"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, ClockIcon } from "lucide-react";
import { PlanTask } from "./types";
import { getCategoryIcon } from "./utils";

interface TasksListProps {
  tasks: PlanTask[];
  onToggleTask: (taskId: number) => void;
}

export function TasksList({ tasks, onToggleTask }: TasksListProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Application Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
                task.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getCategoryIcon(task.category)}
                  <span
                    className={`text-sm font-medium ${
                      task.completed
                        ? "text-green-700 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task.id}. {task.text}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-2">
                    <ClockIcon className="h-3 w-3" />
                    {task.estimatedDays} days
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                </div>
              </div>
              {task.completed && (
                <CheckIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
