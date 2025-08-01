"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/hooks/getUser";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarProvider>
    </div>
  );
}
