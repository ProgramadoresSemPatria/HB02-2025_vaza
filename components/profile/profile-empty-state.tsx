"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/types/db";
import { ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

interface ProfileEmptyStateProps {
  profile: Profile | null;
}

export const ProfileEmptyState = ({}: ProfileEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <UserPlus className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Perfil Incompleto
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Complete suas informações para obter recomendações personalizadas de
          viagem e visto.
        </p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            <p>Informações que você pode adicionar:</p>
            <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                País atual e cidadanias
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Informações profissionais e educacionais
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Situação familiar
              </li>
            </ul>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard/get-started">
              Completar Perfil
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
