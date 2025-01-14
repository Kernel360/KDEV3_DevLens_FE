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
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui";
import { parseAsInteger, useQueryState } from "nuqs";
import TableTools from "./table-tools";

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  onRowClick,
}: DataTableProps<T> & {
  onRowClick?: (row: T) => void;
}) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <>
      <TableTools />
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className={cn(column.className)}>
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
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  columns[0].href && "cursor-pointer hover:bg-muted",
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column.id}`}
                    className={cn(column.className)}
                  >
                    {String(row[column.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={cn(page <= 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          {/* TODO: 페이지 번호들 */}
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
    </>
  );
}
