"use client";

import {
  ProfileDetails,
  ProfileHeader,
  ProfileLoadingModern,
  ProfileStatsOverview,
} from "@/components/profile";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

export default function ProfilePage() {
  const { profile, isLoading, error, refetch } = useProfile();

  const [ isEditing, setIsEditing ] = useState(false)

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <ProfileLoadingModern />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">Error</h1>
              <p className="text-red-600 text-lg">
                Error loading profile: {error}
              </p>
              <button
                onClick={refetch}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProfileHeader profile={profile} onEditProfile={handleEditProfile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileStatsOverview profile={profile} />
          </div>

          <div className="lg:col-span-2">
            <ProfileDetails 
              profile={profile}
              refetch={refetch} 
              onEdit={{
                isEditing, 
                closeEditForm
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
