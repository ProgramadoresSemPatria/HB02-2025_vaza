"use client";

import { ChatProvider } from "@/components/chat/ChatContext";
import FloatingChat from "@/components/chat/FloatingChat";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return (
    <ChatProvider>
      <div className="min-h-screen bg-background flex">
        <SidebarProvider>
          <DashboardSidebar />
          <main className="flex-1 overflow-auto relative">
            <div className="md:hidden absolute top-4 left-4 z-50">
              <MobileMenuButton />
            </div>
            {children}
          </main>
        </SidebarProvider>
        <FloatingChat />
      </div>
    </ChatProvider>
  );
}

function MobileMenuButton() {
  const { setOpen } = useSidebar();

  return (
    <button
      onClick={() => setOpen(true)}
      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
    >
      <Menu className="h-5 w-5 text-gray-700" />
    </button>
  );
}
