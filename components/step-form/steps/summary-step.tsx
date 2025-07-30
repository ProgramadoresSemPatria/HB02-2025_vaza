import { Check } from "lucide-react";
import { FormData } from "../types";

interface SummaryStepProps {
  formData: FormData;
}

export const SummaryStep = ({ formData }: SummaryStepProps) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <Check className="w-8 h-8 text-white" />
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-2">Perfeito! 🎉</h2>
      <p className="text-gray-600 mb-6">
        Vamos criar seu plano personalizado para conquistar seu passaporte!
      </p>
    </div>
    <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 border">
      <h3 className="font-semibold text-gray-900 mb-3">
        Resumo das suas informações:
      </h3>
      <div className="space-y-1 text-sm">
        <p>
          <span className="text-gray-500">De:</span> {formData.currentCountry}
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
          {formData.maritalStatus}
        </p>
        <p>
          <span className="text-gray-500">Filhos:</span> {formData.children}
        </p>
        <p>
          <span className="text-gray-500">Nome:</span> {formData.name}
        </p>
      </div>
    </div>
  </div>
);
