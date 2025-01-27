import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import {
  CreateProjectChecklistRequest,
  CreateProjectStepRequest,
  Project,
  ProjectChecklist,
  ProjectListResponse,
  ProjectStep,
  ProjectStepResponse,
} from "@/types/project";

export const ProjectApi = {
  // GET {BASE_URL}/main/api/projects/{memberId}
  getList: (memberId: number) =>
    restClient.get<ProjectListResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.BASE}/${memberId}`,
    ),

  // GET {BASE_URL}/main/api/projects/{projectId}
  getDetail: (projectId: number) =>
    restClient.get<Project>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.DETAIL(projectId)}`,
    ),

  steps: {
    // GET {BASE_URL}/main/api/projects/{projectId}/steps
    getList: (projectId: number) =>
      restClient.get<ProjectStepResponse>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(projectId)}`,
      ),

    // POST {BASE_URL}/main/api/projects/steps
    create: (data: CreateProjectStepRequest) =>
      restClient.post<CreateProjectStepRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        data,
      ),

    // PUT {BASE_URL}/main/api/projects/steps
    update: (data: ProjectStep) =>
      restClient.put<ProjectStep, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        data,
      ),

    // DELETE {BASE_URL}/main/api/projects/steps?projectId={projectId}&stepId={stepId}
    delete: (projectId: number, stepId: number) =>
      restClient.delete<void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}`,
        { projectId: String(projectId), stepId: String(stepId) },
      ),
  },

  checklist: {
    // GET {BASE_URL}/main/api/projects?projectId={projectId}
    getList: (projectId: number) =>
      restClient.get<ProjectChecklist[]>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        {
          queryParams: {
            projectId: String(projectId),
          },
        },
      ),

    // POST {BASE_URL}/main/api/projects
    create: (data: CreateProjectChecklistRequest) =>
      restClient.post<CreateProjectChecklistRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        data,
      ),

    // PUT {BASE_URL}/main/api/projects
    update: (data: ProjectChecklist) =>
      restClient.put<ProjectChecklist, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        data,
      ),

    // DELETE {BASE_URL}/main/api/projects?checklistId={checklistId}
    delete: (checklistId: number) =>
      restClient.delete<void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
        { checklistId: String(checklistId) },
      ),
  },
};
