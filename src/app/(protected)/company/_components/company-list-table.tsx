"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { companyColumns } from "./company-columns";
import CompanyDetail from "./company-detail";

export default function CompanyListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery({
    queryKey: ["companyList", page],
    queryFn: () => adminCompanyApi.getList({ page }),
    retry: 2,
  });
  if (isLoading) return <TableSkeleton />;
  // TODO: 에러 처리
  // if (isError) return <TableError />;
  if (!data) return null;

  return (
    <TableWithSheet
      columns={companyColumns}
      data={data.content}
      content={CompanyDetail}
      totalPages={data.totalPages}
    />
  );
}
