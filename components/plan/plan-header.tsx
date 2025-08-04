"use client";

export function PlanHeader() {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Your Immigration Plan
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Track your journey to a new country step by step
          </p>
        </div>
      </div>
    </div>
  );
}
