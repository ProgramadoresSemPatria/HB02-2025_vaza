"use client";

import {
  DesktopSidebar,
  MobileSidebar,
  SidebarLink,
} from "@/components/ui/sidebar";
import { signOutUser } from "@/services/auth";
import { GlobeIcon, LayoutIcon, LogOut, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navigationItems = [
  {
    label: "Countries",
    href: "/dashboard/countries",
    icon: (
      <GlobeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Your plan",
    href: "/dashboard/plan",
    icon: (
      <LayoutIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: (
      <UserIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between gap-10">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="mt-8 flex flex-col gap-2">
          {navigationItems.map((item, idx) => (
            <SidebarLink key={idx} link={item} />
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 group/sidebar cursor-pointer py-2 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition duration-150 text-neutral-700 dark:text-neutral-200 text-sm w-full text-left"
      >
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150">
          Logout
        </span>
      </button>
    </div>
  );

  return (
    <>
      <DesktopSidebar>
        <SidebarContent />
      </DesktopSidebar>
      <MobileSidebar>
        <SidebarContent />
      </MobileSidebar>
    </>
  );
}

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/vaza-logo.webp"
        className="h-8 w-8 flex-shrink-0"
        width={32}
        height={32}
        alt="Vaza Logo"
      />
      <span className="font-medium text-black dark:text-white">VAZA</span>
    </Link>
  );
};
