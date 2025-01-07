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
import { MockData, projectsData } from "@/lib/mockData";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login", "/forgot"];

  if (hideSidebarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/projects">
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
        <NavUser user={MockData.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MockData.navMain} />
        <NavProjects projects={projectsData} />
      </SidebarContent>
      <SidebarFooter>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
