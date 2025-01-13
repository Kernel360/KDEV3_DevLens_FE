"use client";

import { Company } from "@/types/company";
import { ColumnDef } from "@/types/table";

export const companyColumns: ColumnDef<Company>[] = [
  {
    id: "companyName",
    header: "회사명",
  },
  {
    id: "representativeName",
    header: "대표자명",
  },
  {
    id: "representativeContact",
    header: "대표자 연락처",
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
  },
  {
    id: "businessRegistrationNumber",
    header: "사업자 등록번호",
  },
  {
    id: "isActive",
    header: "활성화 상태",
  },
];
