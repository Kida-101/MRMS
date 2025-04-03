"use client";

import {
  User,
  LayoutDashboard,
  FileText,
  ChartColumnBig,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "/components/ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tenants",
    url: "/dashboard/tenants",
    icon: User,
  },
  {
    title: "Leases",
    url: "/dashboard/leases",
    icon: FileText,
  },
  {
    title: "Admins",
    url: "/dashboard/admins",
    icon: Settings,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: ChartColumnBig,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      {/* HEADER SECTION */}
      <SidebarHeader className="py-4 px-3 flex justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div>Logo</div>
          {open && <span className="text-xl font-semibold">Mall</span>}
        </Link>
      </SidebarHeader>

      {/* SIDEBAR CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  tooltip={item.title}
                  isActive={item.url === pathname}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon />
                    {open && <span className="text-lg">{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
