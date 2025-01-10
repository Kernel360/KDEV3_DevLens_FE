import { DataTable } from "@/components/data-table";
import TableTools from "@/components/table-tools";

export default function MembersPage() {
  return (
    <>
      <TableTools />
      <DataTable columns={[]} data={[]} />
    </>
  );
}
