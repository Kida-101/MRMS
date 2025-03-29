import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "/components/ui/sidebar";
import Link from "next/link";
import { SidebarFooter, SidebarTrigger } from "../../ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Tenants",
    url: "/dashboard/tenants",
    icon: Calendar,
  },
  {
    title: "Leases",
    url: "/dashboard/leases",
    icon: Inbox,
  },
  {
    title: "Admins",
    url: "/dashboard/admins",
    icon: Search,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span className="text-lg">{item.title}</span>
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
