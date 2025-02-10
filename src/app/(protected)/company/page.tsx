import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";
import CompanyListTable from "./_components/company-list-table";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error/error-boundary";

export const dynamic = "force-dynamic";

export default function CompanyPage() {
  return (
    <>
      <Header />
      <SectionTitle>회사 목록</SectionTitle>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <CompanyListTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
