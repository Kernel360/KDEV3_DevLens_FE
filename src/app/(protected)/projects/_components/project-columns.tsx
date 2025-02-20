"use client";

import { Badge } from "@/components/ui/badge";
import { getStatusLabel } from "@/lib/utils";
import { getStatusVariant } from "@/lib/utils";
import { Project } from "@/types/project";
import { ColumnDef } from "@/types/table";

export const projectColumns: ColumnDef<Project>[] = [
  {
    id: "projectName",
    header: "프로젝트명",
    cell: ({ row }) => (
      <span className="font-bold">{row.original.projectName}</span>
    ),
  },
  {
    id: "customerCompanyName",
    header: "고객사",
    cell: ({ row }) => row.original.customerCompanyName,
  },
  {
    id: "developerCompanyName",
    header: "개발사",
    cell: ({ row }) => row.original.developerCompanyName,
  },
  {
    id: "projectTypeName",
    header: "프로젝트 유형",
    cell: ({ row }) => row.original.projectTypeName,
  },
  {
    id: "projectStatusCode",
    header: "상태",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.projectStatusCode)}>
        {getStatusLabel(row.original.projectStatusCode)}
      </Badge>
    ),
  },
  {
    id: "bnsManager",
    header: "시스템 담당자",
    cell: ({ row }) => row.original.bnsManager,
  },
  {
    id: "plannedStartDate",
    header: "계획 시작일",
    cell: ({ row }) => row.original.plannedStartDate,
  },
  {
    id: "plannedEndDate",
    header: "계획 종료일",
    cell: ({ row }) => row.original.plannedEndDate,
  },
];
