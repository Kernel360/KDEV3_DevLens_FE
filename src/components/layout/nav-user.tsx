"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { LoginResponse } from "@/types/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@ui";
import Link from "next/link";
import { UserAvatar } from "../composites/user-avatar";
import { logoutAction } from "@/lib/actions/logoutAction";
import { toast } from "sonner";
import { redirect } from "next/navigation";
// import { AuthApi } from "@/lib/apis/main/authApi";

export function NavUser({ user }: { user: LoginResponse | null }) {
  const { isMobile } = useSidebar();
  const { name = "", email, profileUrl } = user || {};

  const handleLogout = async () => {
    const res = await logoutAction();
    if (res.message) {
      toast.info(res.message);
      redirect("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                className="size-8"
                name={name}
                imageSrc={profileUrl || undefined}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar
                  className="size-8"
                  name={name}
                  imageSrc={profileUrl || undefined}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/my"}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  기본 정보
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="line-through">
                <Bell />
                알림
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
