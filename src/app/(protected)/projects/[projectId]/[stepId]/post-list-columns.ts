"use client";

import { Post } from "@/types/post";
import { ColumnDef } from "@/types/table";

export const postListColumns: ColumnDef<Post>[] = [
  {
    id: "index",
    header: "번호",
    className: "w-20",
    href: (row) => `/${row.id}`,
  },
  {
    id: "status",
    header: "상태",
    className: "w-20",
  },
  {
    id: "title",
    header: "제목",
    className: "min-w-[300px]",
  },
  {
    id: "author",
    header: "작성자",
    className: "w-[100px]",
  },
  {
    id: "createdAt",
    header: "작성일",
    className: "w-[100px]",
  },
  {
    id: "deadline",
    header: "마감일",
    className: "w-[100px]",
  },
] as const;
