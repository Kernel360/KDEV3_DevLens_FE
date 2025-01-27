import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";
import CompanyListTable from "./_components/company-list-table";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Suspense } from "react";

export default function CompanyPage() {
  return (
    <>
      <Header />
      <SectionTitle>회사 목록</SectionTitle>
      <Suspense fallback={<TableSkeleton />}>
        <CompanyListTable />
      </Suspense>
    </>
  );
}
