import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Suspense } from "react";
import ProjectListTable from "./_components/project-list-table";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <SectionTitle>프로젝트 목록</SectionTitle>
      <Suspense fallback={<TableSkeleton />}>
        <ProjectListTable />
      </Suspense>
    </>
  );
}
