import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProjectList from "./project-list";
import { prefetchProjects } from "@/lib/queries/project";

export default async function ProjectSection() {
  const queryClient = new QueryClient();

  const { myProjects, companyProjects } = await prefetchProjects(queryClient);

  console.log(myProjects);
  console.log(companyProjects);

  return (
    <div className="space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectList projects={myProjects} title="내 프로젝트" />
        <ProjectList projects={companyProjects} title="회사 프로젝트" />
      </HydrationBoundary>
    </div>
  );
}
