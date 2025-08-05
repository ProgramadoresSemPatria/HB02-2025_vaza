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

    console.log("Checking user");
    checkUser();
    console.log("User checked: ", user);
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
    console.log("No user found, redirecting to login");
    window.location.href = "/login";
    return null;
  }

  return (
    <ChatProvider>
      <div className="min-h-screen bg-background flex">
        <SidebarProvider>
          <DashboardSidebar />
          <main className="flex-1 overflow-auto relative md:ml-[250px]">
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-40">
              <MobileMenuButton />
            </div>
            <div className="md:hidden pt-16">{children}</div>
            <div className="hidden md:block">{children}</div>
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
      className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <Menu className="h-5 w-5 text-gray-700" />
    </button>
  );
}
