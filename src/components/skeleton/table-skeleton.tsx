import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  const columnWidths = ["w-[10%]", "w-[30%]", "w-[15%]", "w-[20%]", "w-[25%]"];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnWidths.map((width, index) => (
            <TableHead key={index} className={`${width} px-4`}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columnWidths.map((width, colIndex) => (
              <TableCell key={colIndex} className={`${width} px-4`}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
