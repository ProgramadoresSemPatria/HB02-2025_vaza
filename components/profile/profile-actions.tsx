"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  Edit,
  Settings,
  Share2,
  UserPlus,
} from "lucide-react";

interface ProfileActionsProps {
  onEditProfile: () => void;
}

export function ProfileActions({ onEditProfile }: ProfileActionsProps) {
  const actions = [
    {
      icon: Edit,
      label: "Editar Perfil",
      description: "Atualize suas informações pessoais",
      action: onEditProfile,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Download,
      label: "Exportar Dados",
      description: "Baixe suas informações em PDF",
      action: () => console.log("Export data"),
      color: "bg-green-50 text-green-700 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Share2,
      label: "Compartilhar Perfil",
      description: "Compartilhe com consultores",
      action: () => console.log("Share profile"),
      color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Settings,
      label: "Configurações",
      description: "Gerencie suas preferências",
      action: () => console.log("Settings"),
      color: "bg-gray-50 text-gray-700 hover:bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`h-auto p-4 justify-start ${action.color} border-0`}
                  onClick={action.action}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg bg-white/50`}>
                      <Icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{action.label}</p>
                      <p className="text-xs opacity-80">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-60" />
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
