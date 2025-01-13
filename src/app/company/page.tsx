import { DataTable } from "@/components/data-table";
import TableTools from "@/components/table-tools";
import { companyColumns } from "./company-columns";

export default function CompanyPage() {
  return (
    <>
      <TableTools />
      <DataTable columns={companyColumns} data={[]} />
    </>
  );
}
