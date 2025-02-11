"use client";

import { ErrorBoundary } from "@/components/error/error-boundary";
import { ProjectListSkeleton } from "@/components/skeleton/project-list-skeleton";
import { Separator } from "@/components/ui";
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

  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <ProjectList projects={data?.myProjects || []} title="내 프로젝트" />
      </ErrorBoundary>

      <Separator />
      {/* <ProjectList projects={companyProjects} title="회사 프로젝트" /> */}
    </div>
  );
}
