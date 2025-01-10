"use client";

import { Checklist } from "@/types/checklist";
import { ColumnDef } from "@/types/table";

export const checkListColumns: ColumnDef<Checklist>[] = [
  {
    id: "step",
    header: "단계",
  },
  {
    id: "checklistType",
    header: "체크리스트",
  },
  {
    id: "title",
    header: "제목",
  },
  {
    id: "author",
    header: "작성자",
  },
  {
    id: "submittedAt",
    header: "신청일",
  },
];
