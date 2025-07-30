import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { GlobeIcon, LayoutIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const navigationItems = [
  {
    label: 'Countries',
    href: '/dashboard/countries',
    icon: GlobeIcon,
  },
  {
    label: 'Plan',
    href: '/dashboard/plan',
    icon: LayoutIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-start justify-center pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Image
            src="/vaza-logo.webp"
            alt="VAZA Logo"
            width={40}
            height={40}
            className="dark:invert"
          />
          <p className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            VAZA
          </p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <hr className="my-2 border-border" />
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="hover:bg-brand-secondary hover:text-white" asChild>
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-6 rounded-md hover:bg-accent">
                      <item.icon className="h-4 w-4 hover:text-white" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button asChild variant="ghost" className="w-full justify-start hover:bg-brand-secondary hover:text-white">
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-6 rounded-md hover:bg-accent">
            <UserIcon className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}