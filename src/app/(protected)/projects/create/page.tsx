import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";
import ProjectForm from "./_components/project-form";

export const dynamic = "force-dynamic";

export default function CreateProjectPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "프로젝트 목록", href: "/projects" },
          { label: "프로젝트 생성" },
        ]}
      />
      <SectionTitle>프로젝트 생성</SectionTitle>
      <ProjectForm />
    </>
  );
}
