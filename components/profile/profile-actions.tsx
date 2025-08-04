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
      label: "Edit Profile",
      description: "Update your personal information",
      action: onEditProfile,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Download,
      label: "Export Data",
      description: "Download your information as PDF",
      action: () => console.log("Export data"),
      color: "bg-green-50 text-green-700 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Share2,
      label: "Share Profile",
      description: "Share with consultants",
      action: () => console.log("Share profile"),
      color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Manage your preferences",
      action: () => console.log("Settings"),
      color: "bg-gray-50 text-gray-700 hover:bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`h-auto p-3 justify-start ${action.color} border-0`}
                  onClick={action.action}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`p-1.5 rounded-lg bg-white/50`}>
                      <Icon className={`h-4 w-4 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{action.label}</p>
                      <p className="text-xs opacity-80">{action.description}</p>
                    </div>
                    <ArrowRight className="h-3 w-3 opacity-60" />
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
