import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Suspense } from "react";
import MemberListTable from "./_components/member-list-table";

export default async function MembersPage() {
  return (
    <>
      <Header />
      <SectionTitle>계정 목록</SectionTitle>
      <Suspense fallback={<TableSkeleton />}>
        <MemberListTable />
      </Suspense>
    </>
  );
}
