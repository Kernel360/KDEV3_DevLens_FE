import SectionTitle from "@/components/composites/section-title";
import { ErrorBoundary } from "@/components/error/error-boundary";
import Header from "@/components/layout/Header";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Suspense } from "react";
import ProjectListTable from "./_components/project-list-table";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <SectionTitle>프로젝트 목록</SectionTitle>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <ProjectListTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
