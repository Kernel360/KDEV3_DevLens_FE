import { DataTable } from "@/components/data-table";
import { memberColumns } from "./members-columns";
import { Member } from "@/types/member";
import { fetchMemberData } from "@/lib/dummy/fetch-member";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";

export default async function MembersPage() {
  const data = await fetchMemberData();
  return (
    <Suspense fallback={<TableSkeleton />}>
      <DataTable<Member> columns={memberColumns} data={data} />
    </Suspense>
  );
}
