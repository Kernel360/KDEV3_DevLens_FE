"use client";

import { useQueryState } from "nuqs";
import { ColumnDef } from "@/types/table";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui";
import { PostList } from "@/types/post";
import { DataTable } from "./table/data-table";
import PostDetail from "./post-detail";


interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function PostTableWithSheet({
  columns,
  data,
}: DataTableProps<PostList>) {
  const [postId, setPostId] = useQueryState("post");

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => setPostId(row.id)}
      />
      <Sheet open={!!postId} onOpenChange={() => setPostId(null)}>
        <SheetContent
          className="w-3/4 sm:w-[90vw] sm:max-w-3xl"
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
