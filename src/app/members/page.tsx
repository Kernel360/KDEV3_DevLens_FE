import { DataTable } from "@/components/data-table";
import TableTools from "@/components/table-tools";
import { memberColumns } from "./members-columns";

export default function MembersPage() {
  return (
    <>
      <TableTools />
      <DataTable columns={memberColumns} data={[]} />
    </>
  );
}
