"use client";

import { Separator } from "@/components/ui";
import {
  getGetMyProjectQueryKey,
  getMyProject,
} from "@/lib/api/generated/main/services/project-dashboard-api/project-dashboard-api";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProjectList from "./project-list";

export default function ProjectSection() {
  // const projects = await ProjectApi.getList();
  // const { data } = useSuspenseQuery({
  //   queryKey: ["myProjects"],
  //   queryFn: () => ProjectApi.getList(),
  // });
  const { data } = useSuspenseQuery({
    queryKey: getGetMyProjectQueryKey(),
    queryFn: () => getMyProject(),
  });

  return (
    <div className="space-y-6">
      <ProjectList projects={data.myProjects || []} title="내 프로젝트" />
      <Separator />
      {/* <ProjectList projects={companyProjects} title="회사 프로젝트" /> */}
    </div>
  );
}
