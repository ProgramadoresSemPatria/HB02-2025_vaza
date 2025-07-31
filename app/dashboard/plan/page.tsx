"use client";

import {
  countries,
  CountrySelector,
  PlanHeader,
  planTasks,
  ProgressOverview,
  RequiredDocuments,
  requiredDocuments,
  TasksList,
  usePlan,
  visaTypes,
  VisaTypeSelector,
} from "@/components/plan";
import { useSidebar } from "@/components/ui/sidebar";

export default function PlanPage() {
  const { state: sidebarState } = useSidebar();

  const {
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
  } = usePlan({
    initialCountry: countries[0],
    initialVisaType: visaTypes[0],
    initialTasks: planTasks.italy,
    initialDocuments: requiredDocuments,
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <PlanHeader
          planStatus={planStatus.status}
          onStartPlan={startPlan}
          onPausePlan={pausePlan}
          onCompletePlan={completePlan}
        />

        <div
          className={`grid grid-cols-1 gap-6 ${
            sidebarState === "expanded" ? "xl:grid-cols-3" : "xl:grid-cols-4"
          }`}
        >
          {/* Left Column - Country & Visa Selection */}
          <div className="xl:col-span-1 space-y-6">
            <CountrySelector
              countries={countries}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />

            <VisaTypeSelector
              visaTypes={visaTypes}
              selectedVisaType={selectedVisaType}
              onVisaTypeChange={setSelectedVisaType}
            />

            <ProgressOverview
              completedTasks={progress.completedTasks}
              totalTasks={progress.totalTasks}
              progressPercentage={progress.progressPercentage}
              estimatedTotalDays={progress.estimatedTotalDays}
              remainingDays={progress.remainingDays}
            />
          </div>

          {/* Right Column - Tasks and Documents */}
          <div
            className={`space-y-6 ${
              sidebarState === "expanded" ? "xl:col-span-2" : "xl:col-span-3"
            }`}
          >
            <TasksList tasks={tasks} onToggleTask={toggleTask} />

            <RequiredDocuments
              documents={documents}
              onToggleDocument={toggleDocument}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
