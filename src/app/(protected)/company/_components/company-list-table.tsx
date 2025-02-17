"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
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
  });

  return (
    <TableWithSheet
      columns={companyColumns}
      data={data?.content || []}
      content={CompanyDetail}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      last={data?.last || false}
      pageNumber={data?.pageNumber || 1}
    />
  );
}
