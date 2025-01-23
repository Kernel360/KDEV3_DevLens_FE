import ProjectList from "./_components/project-list";

import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";

export default function Dashboard() {
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
