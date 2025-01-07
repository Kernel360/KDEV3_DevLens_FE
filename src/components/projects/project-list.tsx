import { projectsData } from "@/lib/mockData";
import ProjectCard from "./project-card";

export default function ProjectList() {
  const projects = projectsData;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
}
