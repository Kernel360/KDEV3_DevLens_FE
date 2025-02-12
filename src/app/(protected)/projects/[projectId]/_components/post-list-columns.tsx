"use client";

import { Badge } from "@/components/ui/badge";
import {
  getStatusLabel,
  getStatusVariant,
  formatDateToRelative,
  getPriorityLabel,
  getPriorityVariant,
} from "@/lib/utils";
import { Post } from "@/types/post";
import { ColumnDef } from "@/types/table";

export const postListColumns: ColumnDef<Post>[] = [
  {
    id: "postId",
    header: "번호",
    className: "w-20",
    cell: ({ row }) => <span className="font-mono">{row.original.postId}</span>,
  },
  {
    id: "priority",
    header: "우선순위",
    className: "w-20",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge variant={getPriorityVariant(row.original.priority)}>
          {getPriorityLabel(row.original.priority)}
        </Badge>
      </div>
    ),
  },
  {
    id: "status",
    header: "상태",
    className: "w-20",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge variant={getStatusVariant(row.original.status)}>
          {getStatusLabel(row.original.status)}
        </Badge>
      </div>
    ),
  },
  {
    id: "title",
    header: "제목",
    className: "min-w-[300px]",
    cell: ({ row }) => <span className="font-bold">{row.original.title}</span>,
  },
  {
    id: "writer",
    header: "작성자",
    className: "w-[100px]",
    cell: ({ row }) => row.original.writer,
  },
  {
    id: "createDate",
    header: "작성일",
    className: "w-[100px]",
    cell: ({ row }) => (
      <span className="font-mono">
        {formatDateToRelative(row.original.createDate)}
      </span>
    ),
  },
  {
    id: "deadline",
    header: "마감일",
    className: "w-[100px]",
    cell: ({ row }) => (
      <span className="font-mono">
        {row.original.deadline
          ? new Date(row.original.deadline).toLocaleDateString()
          : "-"}
      </span>
    ),
  },
] as const;
