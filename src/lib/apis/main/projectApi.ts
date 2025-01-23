import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import {
  CreateProjectChecklistRequest,
  CreateProjectStepRequest,
  Project,
  ProjectChecklist,
  ProjectStep,
} from "@/types/project";

export const ProjectApi = {
  getList: (memberId: number) =>
    restClient.get<Project[]>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(memberId)}`,
    ),
  getDetail: (projectId: number) =>
    restClient.get<Project>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.DETAIL(projectId)}`,
    ),
  steps: {
    getList: (projectId: number) =>
      restClient.get<ProjectStep[]>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(projectId)}`,
      ),

    create: (data: CreateProjectStepRequest) =>
      restClient.post<CreateProjectStepRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        data,
      ),

    update: (data: ProjectStep) =>
      restClient.put<ProjectStep, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        data,
      ),

    delete: (projectId: number, stepId: number) =>
      restClient.delete<void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        { projectId: String(projectId), stepId: String(stepId) },
      ),
  },
  checklist: {
    getList: (projectId: number) =>
      restClient.get<ProjectChecklist[]>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        { projectId: String(projectId) },
      ),

    create: (data: CreateProjectChecklistRequest) =>
      restClient.post<CreateProjectChecklistRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        data,
      ),

    update: (data: ProjectChecklist) =>
      restClient.put<ProjectChecklist, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        data,
      ),

    delete: (checklistId: number) =>
      restClient.delete<void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        { checklistId: String(checklistId) },
      ),
  },
};
