"use client";

import { ProjectListSkeleton } from "@/components/skeleton/project-list-skeleton";
import ProjectList from "./project-list";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetMyProject } from "@/lib/api/generated/main/services/project-dashboard-api/project-dashboard-api";
import { useGetAdminMain } from "@/lib/api/generated/admin/services/administrator-project-management-api/administrator-project-management-api";
import { GetMyProjectListGetMyProjectResponseInfo } from "@/lib/api/generated/main/models";

export default function ProjectSection() {
  const { user } = useAuthStore();

  const isAdmin = user?.role === "ADMIN";

  const { data: userData, isLoading: userLoading } = useGetMyProject(
    undefined,
    {
      query: {
        enabled: !isAdmin && !!user,
      },
    },
  );

  const { data: adminData, isLoading: adminLoading } = useGetAdminMain({
    query: {
      enabled: isAdmin && !!user,
    },
  });

  const isLoading = userLoading || adminLoading;
  if (isLoading || !user) {
    return <ProjectListSkeleton />;
  }
  const projects = (
    user?.role === "ADMIN" ? adminData : userData?.myProjects
  ) as GetMyProjectListGetMyProjectResponseInfo[];

  if (!projects) {
    throw new Error("프로젝트 목록을 불러오는데 실패했습니다.");
  }

  return (
    <div className="space-y-6">
      <ProjectList
        projects={projects}
        title={user?.role === "ADMIN" ? "진행 중" : "내 프로젝트"}
      />
    </div>
  );
}
