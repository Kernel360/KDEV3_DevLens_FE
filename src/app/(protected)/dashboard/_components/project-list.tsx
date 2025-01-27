import SectionTitle from "@/components/composites/section-title";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import ProjectCard from "./project-card";

export default function ProjectList({
  projects,
  title,
}: {
  projects: Project[];
  title: "내 프로젝트" | "회사 프로젝트";
}) {
  if (!projects?.length) {
    return (
      <>
        <SectionTitle>{title}</SectionTitle>
        <Card className="w-fit bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              {title === "내 프로젝트"
                ? "참여 중인 프로젝트가 없습니다"
                : "현재 진행중인 프로젝트가 없습니다"}
            </CardTitle>
          </CardHeader>
        </Card>
      </>
    );
  }

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.projectId} {...project} />
        ))}
      </div>
    </>
  );
}
