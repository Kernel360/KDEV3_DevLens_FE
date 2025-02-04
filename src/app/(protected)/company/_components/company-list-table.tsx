"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { companyColumns } from "./company-columns";
import CompanyDetail from "./company-detail";

export default function CompanyListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data } = useSuspenseQuery({
    queryKey: ["companyList", page],
    queryFn: () => adminCompanyApi.getList({ page }),
    retry: 1,
  });

  return (
    <TableWithSheet
      columns={companyColumns}
      data={data.content || []}
      content={CompanyDetail}
      totalPages={data.totalPages}
    />
  );
}
