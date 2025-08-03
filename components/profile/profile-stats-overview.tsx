"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/types/profile";
import {
  Briefcase,
  Calendar,
  Globe,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

interface ProfileStatsOverviewProps {
  profile: UserProfile | null;
}

export function ProfileStatsOverview({ profile }: ProfileStatsOverviewProps) {
  if (!profile) return null;

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const calculateCompletion = () => {
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

  const completionPercentage = calculateCompletion();

  const stats = [
    {
      icon: MapPin,
      label: "País Atual",
      value: profile.country ? capitalize(profile.country) : "Não informado",
      color: "text-green-600",
    },
    {
      icon: Briefcase,
      label: "Profissão",
      value: profile.job_title
        ? capitalize(profile.job_title)
        : "Não informado",
      color: "text-green-600",
    },
    {
      icon: GraduationCap,
      label: "Formação",
      value: profile.degree ? capitalize(profile.degree) : "Não informado",
      color: "text-green-600",
    },
    {
      icon: Globe,
      label: "Cidadanias",
      value: profile.citizenships?.length || 0,
      color: "text-green-600",
    },
  ];

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-3">
          <Users className="h-5 w-5 text-green-600" />
          Visão Geral
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Completude</span>
              <span className="font-semibold text-gray-900">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 bg-green-600 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {completionPercentage < 100
                ? `${
                    8 - Math.round((completionPercentage / 100) * 8)
                  } campos restantes`
                : "Perfil completo!"}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-sm font-semibold ${stat.color} truncate`}>
                    {typeof stat.value === "number"
                      ? `${stat.value} cidadania(s)`
                      : stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Email</span>
              </div>
              <span className="font-medium text-gray-900 truncate max-w-24 sm:max-w-28">
                {profile.email || "Não informado"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Idade</span>
              </div>
              <span className="font-medium text-gray-900">
                {profile.age ? `${profile.age} anos` : "Não informado"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Estado Civil</span>
              </div>
              <span className="font-medium text-gray-900">
                {profile.marital_status
                  ? capitalize(profile.marital_status)
                  : "Não informado"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
