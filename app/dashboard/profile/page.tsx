"use client";

import {
  ProfileDetails,
  ProfileHeader,
  ProfileLoadingModern,
  ProfileStatsOverview,
} from "@/components/profile";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { profile, isLoading, error, refetch } = useProfile();
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/dashboard/get-started");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <ProfileLoadingModern />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Erro</h1>
              <p className="text-red-600 mb-4">
                Erro ao carregar perfil: {error}
              </p>
              <button
                onClick={refetch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ProfileHeader profile={profile} onEditProfile={handleEditProfile} />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileStatsOverview profile={profile} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProfileDetails profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
