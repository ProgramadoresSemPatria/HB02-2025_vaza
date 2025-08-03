"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import { Edit, Settings, Shield, User } from "lucide-react";
import { ProfileAvatar } from "./profile-avatar";

interface ProfileHeaderProps {
  profile: UserProfile | null;
  onEditProfile: () => void;
}

export function ProfileHeader({ profile, onEditProfile }: ProfileHeaderProps) {
  const getProfileStatus = () => {
    if (!profile) return "incomplete";

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
    const percentage = Math.round((filledFields / fields.length) * 100);

    if (percentage >= 80) return "complete";
    if (percentage >= 50) return "partial";
    return "incomplete";
  };

  const status = getProfileStatus();
  const statusConfig = {
    complete: {
      label: "Perfil Completo",
      color: "text-green-600",
      bgColor: "bg-green-100",
      icon: Shield,
    },
    partial: {
      label: "Perfil Parcial",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      icon: User,
    },
    incomplete: {
      label: "Perfil Incompleto",
      color: "text-red-600",
      bgColor: "bg-red-100",
      icon: User,
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <ProfileAvatar profile={profile} size="xl" />
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {profile?.full_name || "Seu Perfil"}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {profile?.email || "Gerencie suas informações pessoais"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.color} w-fit`}
              >
                <StatusIcon className="h-4 w-4" />
                {config.label}
              </div>
              {profile?.country && (
                <span className="capitalize text-sm text-gray-500 font-medium">
                  {profile.country}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto px-5 py-2"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button
            onClick={onEditProfile}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-5 py-2"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}
