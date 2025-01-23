"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import TableSkeleton from "@/components/skeleton/table-skeleton";
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
    retry: 2,
  });

  if (isLoading) return <TableSkeleton />;
  // TODO: 에러 처리
  // if (isError) return <TableError />;
  if (!data) return null;

  return (
    <TableWithSheet
      columns={projectColumns}
      data={data.content}
      content={ProjectDetail}
      totalPages={data.totalPages}
    />
  );
}
