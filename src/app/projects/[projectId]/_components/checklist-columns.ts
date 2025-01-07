"use client";

import { Checklist } from "@/types/checklist";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Checklist>[] = [
  {
    accessorKey: "step",
    header: "단계",
  },
  {
    accessorKey: "checklistType",
    header: "체크리스트",
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
    accessorKey: "submittedAt",
    header: "신청일",
  },
];
