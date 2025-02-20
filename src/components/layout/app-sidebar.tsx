"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ProjectApi } from "@/lib/apis/main/projectApi";
import { NAV_LIST } from "@/lib/constants/nav-list";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login", "/forgot"];

  // const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => ProjectApi.getList(),
    enabled: user?.role === "USER",
  });

  if (hideSidebarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/dashboard">
          <h1
            className={cn(
              "logo py-4 text-center font-mono text-2xl font-bold",
              "group-data-[collapsible=icon]:hidden",
              "group-data-[state=expanded]:block",
            )}
          >
            DevLens
          </h1>
        </Link>
        <NavUser user={user ?? null} />
      </SidebarHeader>
      <SidebarContent>
        {user?.role === "ADMIN" && <NavMain items={NAV_LIST} />}
        {user?.role === "USER" && projects && (
          <NavProjects projects={projects.myProjects || []} />
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
