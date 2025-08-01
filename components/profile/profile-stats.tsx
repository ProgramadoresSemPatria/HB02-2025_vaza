"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/types/profile";
import { CheckCircle, GraduationCap, Heart, MapPin, Users } from "lucide-react";

interface ProfileStatsProps {
  profile: UserProfile | null;
}

export const ProfileStats = ({ profile }: ProfileStatsProps) => {
  if (!profile) return null;

  const stats = [
    {
      icon: MapPin,
      label: "País Atual",
      value: profile.country || "Não informado",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: GraduationCap,
      label: "Formação",
      value: profile.degree || "Não informado",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      label: "Cidadanias",
      value: profile.citizenships?.length || 0,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Heart,
      label: "Estado Civil",
      value: profile.marital_status || "Não informado",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  const completionPercentage = () => {
    const fields = [
      profile.country,
      profile.job_title,
      profile.age,
      profile.degree,
      profile.institution,
      profile.citizenships?.length,
      profile.marital_status,
      profile.children,
    ];

    const filledFields = fields.filter((field) => field && field !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const percentage = completionPercentage();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Progresso do Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {percentage}% Completo
              </span>
              <span className="text-sm text-gray-500">
                {percentage < 100 ? "Continue preenchendo" : "Perfil completo!"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  percentage < 30
                    ? "bg-red-500"
                    : percentage < 70
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            {percentage < 100 && (
              <p className="text-xs text-gray-500">
                Complete seu perfil para receber recomendações personalizadas
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-900 truncate">
                    {typeof stat.value === "number"
                      ? `${stat.value} cidadania(s)`
                      : stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
