"use client";

import { Company } from "@/types/company";
import { ColumnDef } from "@/types/table";
import { Badge } from "@/components/ui/badge";

export const companyColumns: ColumnDef<Company>[] = [
  {
    id: "companyName",
    header: "회사명",
    cell: ({ row }) => (
      <span className="font-bold">{row.original.companyName}</span>
    ),
  },
  {
    id: "representativeName",
    header: "대표자명",
    cell: ({ row }) => row.original.representativeName,
  },
  {
    id: "representativeContact",
    header: "대표자 연락처",
    cell: ({ row }) => (
      <span className="font-mono">{row.original.representativeContact}</span>
    ),
  },
  {
    id: "representativeEmail",
    header: "대표자 이메일",
  },
  {
    id: "address",
    header: "주소",
  },
  {
    id: "businessType",
    header: "사업자 구분",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.businessType === "INDIVIDUAL" ? "개인" : "법인"}
      </Badge>
    ),
  },
  {
    id: "businessRegistrationNumber",
    header: "사업자 등록번호",
    cell: ({ row }) => (
      <span className="font-mono">
        {row.original.businessRegistrationNumber}
      </span>
    ),
  },
  {
    id: "isActive",
    header: "상태",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActive === "Y" ? "success" : "destructive"}
      >
        {row.original.isActive === "Y" ? "활성" : "비활성"}
      </Badge>
    ),
  },
];
