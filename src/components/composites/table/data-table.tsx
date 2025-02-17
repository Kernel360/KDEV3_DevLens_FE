"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTableProps } from "@/types/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@ui";
import { parseAsInteger, useQueryState } from "nuqs";
import PaginationNumbers from "./pagination-numbers";

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  className,
  onRowClick,
  totalPages,
  last,
}: DataTableProps<T> & {
  onRowClick?: (row: T) => void;
}) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <>
      <Table className={cn(className, "mb-8")}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(column.className, "break-keep")}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className="cursor-pointer"
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} className="max-w-[180px]">
                      <div className="truncate">
                        {column.cell
                          ? column.cell({ row: { original: row } })
                          : String(row[column.id as keyof T])}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {last && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="border-t text-center text-sm text-muted-foreground"
                  >
                    마지막 데이터입니다
                  </TableCell>
                </TableRow>
              )}

              {Array.from({ length: 10 - data.length - 1 }).map((_, index) => (
                <TableRow
                  key={`empty-${index}`}
                  className="pointer-events-none !border-b-0"
                >
                  <TableCell colSpan={columns.length}>&nbsp;</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      {totalPages > 0 && data.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={cn(page <= 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            <PaginationNumbers
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
                className={cn(
                  page >= totalPages && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
