"use client";

import { useQueryState } from "nuqs";
import { ColumnDef } from "@/types/table";
import { DataTable } from "./data-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui";
import { PostList } from "@/types/post";

interface DataTableProps<T> {
  columns: ColumnDef<PostList>[];
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
        <SheetContent className="w-3/4 sm:max-w-3xl" transparentOverlay>
          <SheetHeader>
            <SheetTitle>{postId}제목</SheetTitle>
            <SheetDescription>본문</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
