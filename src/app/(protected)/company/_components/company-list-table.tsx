"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { useQuery } from "@tanstack/react-query";
import { companyColumns } from "./company-columns";
import CompanyDetail from "./company-detail";
import { useQueryState } from "nuqs";
import { parseAsInteger } from "nuqs";

export default function CompanyListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  // TODO: 데이터 페칭 로직

  const { data, isLoading } = useQuery({
    queryKey: ["companyList", page],
    queryFn: () => adminCompanyApi.getList({ page }),
    retry: 2,
  });
  if (isLoading) return <TableSkeleton />;
  // TODO: 에러 처리
  // if (isError) return <TableError />;
  if (!data) return null;

  console.log(data);
  return (
    <>
      <TableWithSheet
        columns={companyColumns}
        data={data.content}
        content={CompanyDetail}
        totalPages={data.totalPages}
      />
    </>
  );
}
