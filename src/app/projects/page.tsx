import Header from "@/components/layout/Header";
import SectionTitle from "@/components/section-title";
import ProjectList from "./_components/project-list";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>내 프로젝트</SectionTitle>
      </div>
      <ProjectList />
    </>
  );
}
