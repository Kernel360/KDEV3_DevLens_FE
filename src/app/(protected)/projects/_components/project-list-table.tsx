"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { adminProjectApi } from "@/lib/apis/admin/adminProjectApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { projectColumns } from "./project-columns";
import ProjectDetail from "./project-detail";

export default function ProjectListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data } = useSuspenseQuery({
    queryKey: ["projectList", page],
    queryFn: () => adminProjectApi.getList({ page }),
    retry: 1,
  });

  return (
    <TableWithSheet
      columns={projectColumns}
      data={data.content || []}
      content={ProjectDetail}
      totalPages={data.totalPages}
    />
  );
}
