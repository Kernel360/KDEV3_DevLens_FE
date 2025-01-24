"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import MemberDetail from "./member-detail";
import { memberColumns } from "./members-columns";
import { adminMemberApi } from "@/lib/apis/admin/adminMemberApi";

export default function MemberListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery({
    queryKey: ["memberList", page],
    queryFn: () => adminMemberApi.getList({ page }),
    retry: 2,
  });

  if (isLoading) return <TableSkeleton />;
  if (!data) return null;

  return (
    <TableWithSheet
      columns={memberColumns}
      data={data.content}
      content={MemberDetail}
      totalPages={data.totalPages}
    />
  );
}
