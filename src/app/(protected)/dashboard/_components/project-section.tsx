"use client";

import { ProjectListSkeleton } from "@/components/skeleton/project-list-skeleton";
import {
  getGetMyProjectQueryKey,
  getMyProject,
} from "@/lib/api/generated/main/services/project-dashboard-api/project-dashboard-api";
import { useQuery } from "@tanstack/react-query";
import ProjectList from "./project-list";

export default function ProjectSection() {
  const { data, isLoading } = useQuery({
    queryKey: getGetMyProjectQueryKey(),
    queryFn: () => getMyProject(),
  });

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  if (!data?.myProjects) {
    throw new Error("프로젝트 목록을 불러오는데 실패했습니다.");
  }

  return (
    <div className="space-y-6">
      <ProjectList projects={data?.myProjects} title="내 프로젝트" />
      {/* <Separator /> */}
      {/* <ProjectList projects={companyProjects} title="회사 프로젝트" /> */}
    </div>
  );
}
