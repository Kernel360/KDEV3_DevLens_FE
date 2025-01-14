import { DataTable } from "@/components/table/data-table";
import { memberColumns } from "./members-columns";
import { Member } from "@/types/member";
import { fetchMemberData } from "@/lib/dummy/fetch-member";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import Header from "@/components/layout/Header";
import SectionTitle from "@/components/section-title";

export default async function MembersPage() {
  const data = await fetchMemberData();
  return (
    <>
      <Header />
      <SectionTitle>계정 목록</SectionTitle>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable<Member> columns={memberColumns} data={data} />
      </Suspense>
    </>
  );
}
