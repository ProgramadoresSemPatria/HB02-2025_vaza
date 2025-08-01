import { Check } from "lucide-react";
import { FormData } from "../types";

interface SummaryStepProps {
  formData: FormData;
}

export const SummaryStep = ({ formData }: SummaryStepProps) => (
  <div className="space-y-4 sm:space-y-6 text-center">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
      <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </div>
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
        Perfeito! 🎉
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
        Vamos criar seu plano personalizado para conquistar seu passaporte!
      </p>
    </div>
    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-left space-y-2 border">
      <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
        Resumo das suas informações:
      </h3>
      <div className="space-y-1 text-xs sm:text-sm">
        <p>
          <span className="text-gray-500">De:</span>{" "}
          {formData.currentCountry.charAt(0).toUpperCase() +
            formData.currentCountry.slice(1)}
        </p>
        <p>
          <span className="text-gray-500">Profissão:</span> {formData.jobTitle}
        </p>
        <p>
          <span className="text-gray-500">Idade:</span> {formData.age} anos
        </p>
        <p>
          <span className="text-gray-500">Formação:</span> {formData.degree}
        </p>
        <p>
          <span className="text-gray-500">Instituição:</span>{" "}
          {formData.institution}
        </p>
        <p>
          <span className="text-gray-500">Cidadanias:</span>{" "}
          {formData.citizenships}
        </p>
        <p>
          <span className="text-gray-500">Estado Civil:</span>{" "}
          {formData.maritalStatus.charAt(0).toUpperCase() +
            formData.maritalStatus.slice(1)}
        </p>
        <p>
          <span className="text-gray-500">Filhos:</span> {formData.children}
        </p>
      </div>
    </div>
  </div>
);
