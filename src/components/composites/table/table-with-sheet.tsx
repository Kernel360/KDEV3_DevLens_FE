"use client";

import { useQueryState } from "nuqs";
import { ColumnDef } from "@/types/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { ErrorBoundary } from "@/components/error/error-boundary";

interface TableWithSheetProps<T extends { id: number }> {
  columns: ColumnDef<T>[];
  data: T[];
  title?: string;
  content: React.ComponentType<{ id: number }>;
  totalPages: number;
  isLoading?: boolean;
}

export default function TableWithSheet<T extends { id: number }>({
  columns,
  data,
  content: Content,
  totalPages,
  isLoading,
}: TableWithSheetProps<T>) {
  const [Id, setId] = useQueryState("id");
  const id = Id ? Number(Id) : null;

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => setId(String(row.id))}
        totalPages={totalPages}
      />
      <Sheet open={!!Id} onOpenChange={() => setId(null)}>
        <SheetContent
          className="w-[100vw] px-10 sm:max-w-3xl md:w-4/5"
          transparentOverlay
        >
          <SheetHeader>
            <SheetTitle className="sr-only">상세 조회</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            {id && (
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                    </div>
                  }
                >
                  <Content id={id} />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
