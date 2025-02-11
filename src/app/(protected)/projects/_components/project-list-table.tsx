"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { adminProjectApi } from "@/lib/apis/admin/adminProjectApi";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { projectColumns } from "./project-columns";
import ProjectDetail from "./project-detail";

export default function ProjectListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery({
    queryKey: ["projectList", page],
    queryFn: () => adminProjectApi.getList({ page }),
  });

  return (
    <TableWithSheet
      columns={projectColumns}
      data={data?.content || []}
      content={ProjectDetail}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
    />
  );
}
