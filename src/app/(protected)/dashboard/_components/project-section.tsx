import { ProjectApi } from "@/lib/apis/main/projectApi";
import ProjectList from "./project-list";

export default async function ProjectSection() {
  const projects = await ProjectApi.getList();
  const { myProjects, companyProjects } = projects;

  console.log(myProjects);
  console.log(companyProjects);

  return (
    <div className="space-y-6">
      <ProjectList projects={myProjects} title="내 프로젝트" />
      <ProjectList projects={companyProjects} title="회사 프로젝트" />
    </div>
  );
}
