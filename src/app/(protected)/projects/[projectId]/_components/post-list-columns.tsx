"use client";

import { Badge } from "@/components/ui/badge";
import { PostListResponse } from "@/lib/api/generated/main/models";
import {
  formatDateToRelative,
  getPriorityLabel,
  getPriorityVariant,
  getStatusLabel,
  getStatusVariant,
} from "@/lib/utils";
import { ColumnDef } from "@/types/table";
import { CornerDownRight } from "lucide-react";

type PostListItem = PostListResponse & { id: number };

export const postListColumns: ColumnDef<PostListItem>[] = [
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
      <Badge variant={getPriorityVariant(row.original.priority ?? "NONE")}>
        {getPriorityLabel(row.original.priority ?? "NONE")}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "상태",
    className: "w-20",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status ?? "NONE")}>
        {getStatusLabel(row.original.status ?? "NONE")}
      </Badge>
    ),
  },
  {
    id: "title",
    header: "제목",
    className: "min-w-[300px]",
    cell: ({ row }) => (
      <span className="flex font-bold">
        {row.original.parentPostId && (
          <span className="text-muted-foreground">
            {/* {row.original.parentPostId} */}
            <CornerDownRight className="w-4 h-4 mr-2" />
          </span>
        )}
        {row.original.title}
        {row.original.commentCount !== undefined &&
          row.original.commentCount > 0 && (
            <span className="ml-2 font-normal text-muted-foreground hover:underline">
              ({row.original.commentCount})
            </span>
          )}
      </span>
    ),
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
        {formatDateToRelative(row.original.createDate ?? "-")}
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
