"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/types/db";
import {
  Baby,
  Briefcase,
  GraduationCap,
  Heart,
  LucideIcon,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

interface ProfileInfoProps {
  profile: Profile | null;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  if (!profile) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500 text-center">
            Nenhuma informação de perfil encontrada
          </p>
        </CardContent>
      </Card>
    );
  }

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon?: LucideIcon;
    label: string;
    value?: string | number;
  }) => (
    <div className="flex items-center gap-3 py-2">
      {Icon && <Icon className="h-5 w-5 text-gray-500" />}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-900">{value || "Não informado"}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem icon={Mail} label="Email" value={profile.email} />
          <Separator />
          <InfoItem icon={MapPin} label="País Atual" value={profile.country} />
          <Separator />
          <InfoItem icon={Briefcase} label="Cargo" value={profile.job_title} />
          <Separator />
          <InfoItem
            icon={Users}
            label="Idade"
            value={profile.age ? `${profile.age} anos` : undefined}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Educação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem
            icon={GraduationCap}
            label="Formação"
            value={profile.degree}
          />
          <Separator />
          <InfoItem
            icon={GraduationCap}
            label="Instituição"
            value={profile.institution}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Cidadanias</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.citizenships && profile.citizenships.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.citizenships.map((citizenship, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {citizenship}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma cidadania informada</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Informações Familiares
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem
            icon={Heart}
            label="Estado Civil"
            value={profile.marital_status}
          />
          <Separator />
          <InfoItem icon={Baby} label="Filhos" value={profile.children} />
        </CardContent>
      </Card>
    </div>
  );
};
