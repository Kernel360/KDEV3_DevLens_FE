import ProjectCard from "./project-card";

export default function ProjectList() {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Project 1 description",
      status: "active",
      startAt: "24.12.07",
      endAt: "25.01.23",
      client: "서울대학교",
    },
    { id: 2, title: "Project 2", status: "active" },
    { id: 3, title: "Project 3", status: "active" },
  ];
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
