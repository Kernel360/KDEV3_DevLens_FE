"use client";

import { useQueryState } from "nuqs";
import { ColumnDef } from "@/types/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui";
import { DataTable } from "./table/data-table";
import PostDetail from "./post-detail";

interface TableWithSheetProps<T extends { id: number }> {
  columns: ColumnDef<T>[];
  data: T[];
  title?: string;
  SheetContent: React.ComponentType<{ id: number }>;
}

export default function TableWithSheet<T extends { id: number }>({
  columns,
  data,
}: TableWithSheetProps<T>) {
  const [postId, setPostId] = useQueryState("post");

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => setPostId(String(row.id))}
      />
      <Sheet open={!!postId} onOpenChange={() => setPostId(null)}>
        <SheetContent
          className="w-3/4 sm:w-[100vw] sm:max-w-3xl"
          transparentOverlay
        >
          <SheetHeader>
            <SheetTitle>게시글</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <PostDetail />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
