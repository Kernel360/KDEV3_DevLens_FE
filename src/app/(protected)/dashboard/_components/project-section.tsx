"use client";

import { ProjectApi } from "@/lib/apis/main/projectApi";
import ProjectList from "./project-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui";

export default function ProjectSection() {
  // const projects = await ProjectApi.getList();
  const { data: projects } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: () => ProjectApi.getList(),
  });

  const { myProjects, companyProjects } = projects;

  return (
    <div className="space-y-6">
      <ProjectList projects={myProjects} title="내 프로젝트" />
      <Separator />
      <ProjectList projects={companyProjects} title="회사 프로젝트" />
    </div>
  );
}
