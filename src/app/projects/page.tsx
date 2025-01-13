import Header from "@/components/layout/Header";
import ProjectList from "@/components/projects/project-list";
import { SearchInput } from "@/components/search-input";
import SectionTitle from "@/components/section-title";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>내 프로젝트</SectionTitle>
        <SearchInput />
      </div>
      <ProjectList />
    </>
  );
}
