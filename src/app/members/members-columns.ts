"use client";

import { Member } from "@/types/member";
import { ColumnDef } from "@/types/table";

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
  },
  {
    id: "role",
    header: "권한",
  },
  {
    id: "status",
    header: "상태",
  },
  {
    id: "birthDate",
    header: "생년월일",
  },
];
