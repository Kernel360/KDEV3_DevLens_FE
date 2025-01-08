"use client";

import { PostList } from "@/types/post";
import { ColumnDef } from "@tanstack/react-table";

export const postListColumns: ColumnDef<PostList>[] = [
  {
    accessorKey: "index",
    header: "번호",
  },
  {
    accessorKey: "status",
    header: "상태",
  },
  {
    accessorKey: "title",
    header: "제목",
  },
  {
    accessorKey: "author",
    header: "작성자",
  },
  {
    accessorKey: "createdAt",
    header: "작성일",
  },
  {
    accessorKey: "deadline",
    header: "마감일",
  },
];
