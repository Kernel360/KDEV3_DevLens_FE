"use client";

import { useQueryState } from "nuqs";
import { ColumnDef } from "@/types/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui";
import { DataTable } from "./data-table";
import { Suspense } from "react";

interface TableWithSheetProps<T extends { id: number }> {
  columns: ColumnDef<T>[];
  data: T[];
  title?: string;
  content: React.ComponentType<{ id: number }>;
  totalPages: number;
}

export default function TableWithSheet<T extends { id: number }>({
  columns,
  data,
  content: Content,
  totalPages,
}: TableWithSheetProps<T>) {
  const [postId, setPostId] = useQueryState("post");
  const id = postId ? Number(postId) : null;
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => setPostId(String(row.id))}
        totalPages={totalPages}
      />
      <Sheet open={!!postId} onOpenChange={() => setPostId(null)}>
        <SheetContent
          className="w-[100vw] sm:max-w-3xl md:w-4/5"
          transparentOverlay
        >
          <SheetHeader>
            <SheetTitle>게시글</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            {id && (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  </div>
                }
              >
                <Content id={id} />
              </Suspense>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
