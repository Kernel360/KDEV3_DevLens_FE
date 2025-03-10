"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
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
  });

  return (
    <TableWithSheet
      columns={memberColumns}
      data={data?.content || []}
      content={MemberDetail}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      last={data?.last || false}
      pageNumber={data?.pageNumber || 1}
    />
  );
}
