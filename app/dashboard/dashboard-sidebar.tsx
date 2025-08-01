"use client";

import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { GlobeIcon, LayoutIcon, LogOut, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  {
    label: "Logout",
    href: "/logout",
    icon: (
      <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function DashboardSidebar() {
  return (
    <SidebarBody className="justify-between gap-10">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="mt-8 flex flex-col gap-2">
          {navigationItems.map((item, idx) => (
            <SidebarLink key={idx} link={item} />
          ))}
        </div>
      </div>
      <div>
        <SidebarLink
          link={{
            label: "User Profile",
            href: "/dashboard/profile",
            icon: (
              <Image
                src="/vaza-logo.webp"
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
            ),
          }}
        />
      </div>
    </SidebarBody>
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
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        VAZA
      </motion.span>
    </Link>
  );
};
