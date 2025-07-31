import {
  AlertCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  PlayIcon,
} from "lucide-react";
import { PlanTask } from "./types";

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "research":
      return <FileTextIcon className="h-4 w-4" />;
    case "documents":
      return <FileTextIcon className="h-4 w-4" />;
    case "medical":
      return <AlertCircleIcon className="h-4 w-4" />;
    case "appointment":
      return <CalendarIcon className="h-4 w-4" />;
    case "preparation":
      return <PlayIcon className="h-4 w-4" />;
    case "submission":
      return <CheckCircleIcon className="h-4 w-4" />;
    case "waiting":
      return <ClockIcon className="h-4 w-4" />;
    case "travel":
      return <PlayIcon className="h-4 w-4" />;
    default:
      return <FileTextIcon className="h-4 w-4" />;
  }
};

export const calculateProgress = (tasks: PlanTask[]) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const estimatedTotalDays = tasks.reduce(
    (sum, task) => sum + task.estimatedDays,
    0
  );
  const completedDays = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.estimatedDays, 0);
  const remainingDays = estimatedTotalDays - completedDays;

  return {
    completedTasks,
    totalTasks,
    progressPercentage,
    estimatedTotalDays,
    completedDays,
    remainingDays,
  };
};
