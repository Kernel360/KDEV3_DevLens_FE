"use client";

import { Command, GalleryVerticalEnd, Building2, User } from "lucide-react";
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

const data = {
  user: {
    name: "관리자",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "계정관리",
      url: "#",
      icon: User,
      items: [
        {
          title: "계정 목록",
          url: "/members",
        },
        {
          title: "계정 생성",
          url: "/members/create",
        },
      ],
    },
    {
      title: "회사관리",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "회사 목록",
          url: "/company",
        },
        {
          title: "회사 생성",
          url: "/company/create",
        },
      ],
    },
  ],
  projects: [
    {
      name: "프로젝트1",
      id: "/projects/projectid1",
    },
    {
      name: "프로젝트2",
      id: "/projects/projectid2",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login", "/forgot"];

  if (hideSidebarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1
          className={cn(
            "logo py-4 font-mono text-2xl font-bold",
            "group-data-[collapsible=icon]:hidden",
            "group-data-[state=expanded]:block",
          )}
        >
          DevLens
        </h1>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
