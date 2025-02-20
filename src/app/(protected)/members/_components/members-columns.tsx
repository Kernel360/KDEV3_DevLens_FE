"use client";

import { Member } from "@/types/member";
import { ColumnDef } from "@/types/table";
import { Badge } from "@ui";

const statusVariants = {
  ACTIVE: "success",
  INACTIVE: "secondary",
  WITHDRAW: "warning",
  SUSPENDED: "destructive",
} as const;

const statusLabels = {
  ACTIVE: "활성",
  INACTIVE: "비활성",
  WITHDRAW: "탈퇴",
  SUSPENDED: "정지",
} as const;

export const memberColumns: ColumnDef<Member>[] = [
  {
    id: "loginId",
    header: "아이디",
  },
  {
    id: "name",
    header: "이름",
  },
  {
    id: "email",
    header: "이메일",
  },
  {
    id: "phoneNumber",
    header: "연락처",
    cell: ({ row }) => (
      <span className="font-mono">{row.original.phoneNumber}</span>
    ),
  },
  {
    id: "role",
    header: "권한",
  },
  {
    id: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
      );
    },
  },
  {
    id: "birthDate",
    header: "생년월일",
  },
];
