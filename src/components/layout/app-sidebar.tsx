"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { NAV_LIST } from "@/lib/constants/nav-list";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login", "/forgot"];

  if (hideSidebarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/dashboard">
          <h1
            className={cn(
              "logo py-4 font-mono text-2xl font-bold",
              "group-data-[collapsible=icon]:hidden",
              "group-data-[state=expanded]:block",
            )}
          >
            DevLens
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_LIST} />
        <NavProjects projects={[]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
