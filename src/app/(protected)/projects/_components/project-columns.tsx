"use client";

import { Badge } from "@/components/ui/badge";
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
    id: "customerName",
    header: "고객사",
    cell: ({ row }) => row.original.customerName,
  },
  {
    id: "developerName",
    header: "개발사",
    cell: ({ row }) => row.original.developerName,
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
    id: "bnsManagerName",
    header: "BNS 담당자",
    cell: ({ row }) => row.original.bnsManagerName,
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

// 상태 관련 헬퍼 함수들
function getStatusVariant(status: Project["projectStatusCode"]) {
  switch (status) {
    case "IN_PROGRESS":
      return "default";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
    case "DELETED":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusLabel(status: Project["projectStatusCode"]) {
  switch (status) {
    case "PREPARED":
      return "준비";
    case "IN_PROGRESS":
      return "진행중";
    case "COMPLETED":
      return "완료";
    case "CLOSED":
      return "종료";
    case "CANCELLED":
      return "취소";
    case "DELETED":
      return "삭제";
  }
}
