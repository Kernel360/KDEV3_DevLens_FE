// 프로젝트 관련 타입
export interface Project {
  id: number;
  projectId: number;
  projectName?: string;
  name?: string;
  customerCompanyName?: string;
  customerName?: string;
  developerCompanyName: string;
  projectDescription: string;
  projectTypeName: string;
  projectStatusCode:
    | "PREPARED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CLOSED"
    | "CANCELLED"
    | "DELETED";
  bnsManager: string;
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
export interface ProjectStepResponse {
  projectId: number;
  projectStepInfo: ProjectStep[];
}

export interface ProjectStep {
  stepId: number;
  projectId: number;
  stepName: string;
  stepOrder: number;
  projectChecklist: ProjectChecklist[];
  startDate?: string;
  endDate?: string;
  status?: "READY" | "IN_PROGRESS" | "COMPLETED";
  description?: string;
}

export interface ProjectChecklist {
  checklistId: number;
  // projectId: number;
  checklistName: string;
  // description: string;
  checklistStatus: "PENDING" | "APPROVED" | "REJECTED";
  approvalTime: string;
  // createdAt: string;
  // updatedAt: string;
}

// API 요청 타입들
export type UpdateProjectStepRequest = ProjectStep;
export type CreateProjectChecklistRequest = Omit<
  ProjectChecklist,
  "id" | "checklistStatus"
>;
export type UpdateProjectChecklistRequest = ProjectChecklist;

export interface CreateStepRequest {
  stepName: string;
  stepDescription: string;
  stepOrderNumber: number;
  checklists: [];
}
export interface UpdateStepRequest {
  stepName: string;
  stepDescription: string;
  stepOrder: number;
}

export interface DeleteStepRequest {
  projectId: number;
  stepId: number;
}

export interface GetMemberByCompanyResponse {
  memberId: string;
  memberName: string;
  department?: string;
  position?: string;
}
