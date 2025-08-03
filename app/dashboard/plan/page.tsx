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

export default function PlanPage() {
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
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <PlanHeader />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
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

          <div className="xl:col-span-3 space-y-6">
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
