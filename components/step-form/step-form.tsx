"use client";

import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CitizenshipStep } from "./steps/citizenship-step";
import { CurrentCountryStep } from "./steps/current-country-step";
import { EducationStep } from "./steps/education-step";
import { FamilyStep } from "./steps/family-step";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { SummaryStep } from "./steps/summary-step";
import { FormData } from "./types";
import { useStepForm } from "@/hooks/useStepForm";
import { useRouter } from "next/navigation";

interface StepFormProps {
  onClose?: () => void;
}

export const StepForm = ({ onClose }: StepFormProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    currentCountry: "",
    jobTitle: "",
    age: "",
    degree: "",
    institution: "",
    citizenships: "",
    maritalStatus: "",
    children: "",
    name: "",
    email: "",
  });

  const { saveProfile, isLoading } = useStepForm();

  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  const closeOnboarding = () => {
    setCurrentStep(1);
    setFormData({
      currentCountry: "",
      jobTitle: "",
      age: "",
      degree: "",
      institution: "",
      citizenships: "",
      maritalStatus: "",
      children: "",
      name: "",
      email: "",
    });
    onClose?.();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CurrentCountryStep
            currentCountry={formData.currentCountry}
            onUpdate={(value: string) =>
              updateFormData("currentCountry", value)
            }
          />
        );

      case 2:
        return (
          <PersonalInfoStep
            jobTitle={formData.jobTitle}
            age={formData.age}
            onUpdate={(field: string, value: string) =>
              updateFormData(field as keyof FormData, value)
            }
          />
        );

      case 3:
        return (
          <EducationStep
            degree={formData.degree}
            institution={formData.institution}
            onUpdate={(field: string, value: string) =>
              updateFormData(field as keyof FormData, value)
            }
          />
        );

      case 4:
        return (
          <CitizenshipStep
            citizenships={formData.citizenships}
            onUpdate={(value: string) => updateFormData("citizenships", value)}
          />
        );

      case 5:
        return (
          <FamilyStep
            maritalStatus={formData.maritalStatus}
            childrenCount={formData.children}
            onUpdate={(field: string, value: string) =>
              updateFormData(field as keyof FormData, value)
            }
          />
        );

      case 6:
        return <SummaryStep formData={formData} />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.currentCountry !== "" && formData.currentCountry !== "other"
        );
      case 2:
        return (
          formData.jobTitle !== "" && formData.age !== ""
        );
      case 3:
        return formData.degree !== "" && formData.institution !== "";
      case 4:
        return formData.citizenships !== "";
      case 5:
        return formData.maritalStatus !== "" && formData.children !== "";
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardContent className="p-0">
          <div className="relative">
            <div className="w-full h-1 bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>

            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={closeOnboarding}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-6 pt-16">
            {renderStep()}

            <div className="mt-8">
              <Button
                onClick={
                  currentStep === totalSteps
                    ? async () => {
                      const success = await saveProfile(formData);
                      if (success) {
                        router.push('/dashboard/countries');
                      }
                    }
                    : nextStep
                }
                disabled={!canProceed() || (currentStep === totalSteps && isLoading)}
                className="w-full bg-green-800 hover:bg-green-900 text-white"
              >
                {currentStep === totalSteps ? (isLoading ? "Salvando..." : "Criar meu plano") : "Próximo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
