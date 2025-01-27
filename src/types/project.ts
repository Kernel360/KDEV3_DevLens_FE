// 프로젝트 관련 타입
export interface Project {
  projectId: number;
  name: string;
  customerCompanyName: string;
  developerName: string;
  projectDescription: string;
  projectTypeName: string;
  projectStatusCode:
    | "PREPARED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CLOSED"
    | "CANCELLED"
    | "DELETED";
  bnsManagerName: string;
  contractNumber: string;
  plannedStartDate: string;
  plannedEndDate: string;
  startDate: string;
  endDate: string;
  finalApprover: string;
  finalApprovalDate: string;
}

export interface ProjectListResponse {
  myProjects: Project[];
  companyProjects: Project[];
}

export interface ProjectStep {
  id: number;
  projectId: number;
  stepName: string;
  stepOrder: number;
  startDate: string;
  endDate: string;
  status: "READY" | "IN_PROGRESS" | "COMPLETED";
  description?: string;
}

export interface ProjectChecklist {
  id: number;
  projectId: number;
  title: string;
  description: string;
  checklistStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

// API 요청 타입들
export type CreateProjectStepRequest = Omit<ProjectStep, "id">;
export type UpdateProjectStepRequest = ProjectStep;
export type CreateProjectChecklistRequest = Omit<
  ProjectChecklist,
  "id" | "checklistStatus"
>;
export type UpdateProjectChecklistRequest = ProjectChecklist;
