"use client";

import { useState } from "react";
import {
  Country,
  PlanStatus,
  PlanTask,
  RequiredDocument,
  VisaType,
} from "./types";
import { calculateProgress } from "./utils";

interface UsePlanProps {
  initialCountry: Country;
  initialVisaType: VisaType;
  initialTasks: PlanTask[];
  initialDocuments: RequiredDocument[];
}

export function usePlan({
  initialCountry,
  initialVisaType,
  initialTasks,
  initialDocuments,
}: UsePlanProps) {
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(initialCountry);
  const [selectedVisaType, setSelectedVisaType] =
    useState<VisaType>(initialVisaType);
  const [tasks, setTasks] = useState<PlanTask[]>(initialTasks);
  const [documents, setDocuments] =
    useState<RequiredDocument[]>(initialDocuments);
  const [planStatus, setPlanStatus] = useState<PlanStatus>({
    status: "not-started",
    startDate: null,
  });

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleDocument = (index: number) => {
    setDocuments(
      documents.map((doc, i) =>
        i === index
          ? {
              ...doc,
              status: doc.status === "completed" ? "pending" : "completed",
            }
          : doc
      )
    );
  };

  const startPlan = () => {
    setPlanStatus({
      status: "in-progress",
      startDate: new Date(),
    });
  };

  const pausePlan = () => {
    setPlanStatus({
      status: "not-started",
      startDate: null,
    });
  };

  const completePlan = () => {
    setPlanStatus({
      status: "completed",
      startDate: planStatus.startDate,
    });
  };

  const progress = calculateProgress(tasks);

  const completedDocuments = documents.filter(
    (doc) => doc.status === "completed"
  ).length;
  const requiredDocumentsCount = documents.filter((doc) => doc.required).length;
  const documentsProgressPercentage =
    (completedDocuments / requiredDocumentsCount) * 100;

  return {
    selectedCountry,
    selectedVisaType,
    tasks,
    documents,
    planStatus,

    setSelectedCountry,
    setSelectedVisaType,
    toggleTask,
    toggleDocument,
    startPlan,
    pausePlan,
    completePlan,

    progress,
    completedDocuments,
    requiredDocumentsCount,
    documentsProgressPercentage,
  };
}
