"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/types/db";
import {
  Baby,
  Briefcase,
  Building,
  Calendar,
  Globe,
  GraduationCap,
  Heart,
  LucideIcon,
  Mail,
  MapPin,
  User,
} from "lucide-react";

interface ProfileDetailsProps {
  profile: Profile | null;
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!profile) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center py-8 space-y-3">
            <User className="h-12 w-12 text-gray-400 mx-auto" />
            <div className="space-y-1">
              <p className="text-gray-600 text-lg font-medium">
                No profile information found
              </p>
              <p className="text-gray-500 text-base">
                Complete your profile to see your information here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    color = "text-gray-600",
  }: {
    icon: LucideIcon;
    label: string;
    value?: string | number;
    color?: string;
  }) => (
    <div className="flex items-start sm:items-center gap-3 py-2">
      <div className="flex-shrink-0 mt-0.5 sm:mt-0">
        <Icon className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
        <p className={`text-sm ${color} ${!value ? "italic" : ""} break-words`}>
          {value
            ? typeof value === "string"
              ? capitalize(value)
              : value
            : "Not provided"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-3 text-gray-900">
            <User className="h-6 w-6 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoItem icon={Mail} label="Email" value={profile.email} />
          <Separator className="my-2" />
          <InfoItem
            icon={MapPin}
            label="Current Country"
            value={profile.country}
          />
          <Separator className="my-2" />
          <InfoItem
            icon={Briefcase}
            label="Job Title"
            value={profile.job_title}
          />
          <Separator className="my-2" />
          <InfoItem
            icon={Calendar}
            label="Age"
            value={profile.age ? `${profile.age} years` : undefined}
          />
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-3 text-gray-900">
            <GraduationCap className="h-6 w-6 text-green-600" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoItem
            icon={GraduationCap}
            label="Degree"
            value={profile.degree}
          />
          <Separator className="my-2" />
          <InfoItem
            icon={Building}
            label="Institution"
            value={profile.institution}
          />
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-3 text-gray-900">
            <Globe className="h-6 w-6 text-purple-600" />
            Citizenships
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.citizenships && profile.citizenships.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.citizenships.map((citizenship, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1"
                >
                  <Globe className="h-3 w-3 mr-2" />
                  {citizenship}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 py-2">
              <Globe className="h-5 w-5 text-gray-400" />
              <p className="text-gray-500 italic">
                No citizenship information provided
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-3 text-gray-900">
            <Heart className="h-6 w-6 text-pink-600" />
            Family Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoItem
            icon={Heart}
            label="Marital Status"
            value={profile.marital_status}
          />
          <Separator className="my-2" />
          <InfoItem icon={Baby} label="Children" value={profile.children} />
        </CardContent>
      </Card>
    </div>
  );
}
