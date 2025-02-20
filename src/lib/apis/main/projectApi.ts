import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import {
  CreateProjectChecklistRequest,
  Project,
  ProjectChecklist,
  ProjectListResponse,
  ProjectStepResponse,
  UpdateStepRequest,
  DeleteStepRequest,
  CreateStepRequest,
} from "@/types/project";

export const ProjectApi = {
  // GET {BASE_URL}/main/api/projects/{memberId}
  getList: () =>
    restClient.get<ProjectListResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.BASE}`,
      // {
      //   next: {
      //     tags: ["projects"],
      //     revalidate: 60,
      //   },
      // },
    ),

  // GET {BASE_URL}/main/api/projects/{projectId}
  getDetail: (projectId: number) =>
    restClient.get<Project>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.DETAIL(projectId)}`,
    ),

  steps: {
    // GET {BASE_URL}/main/api/projects/{projectId}/steps
    getSteps: (projectId: number) =>
      restClient.get<ProjectStepResponse>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(projectId)}`,
        {
          next: {
            tags: [`project-${projectId}-steps`],
          },
        },
      ),

    // POST {BASE_URL}/main/api/projects/steps
    create: (projectId: number, data: CreateStepRequest) =>
      restClient.post<CreateStepRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(projectId)}`,
        data,
      ),

    // PUT {BASE_URL}/main/api/projects/steps
    update: (stepId: number, data: UpdateStepRequest) =>
      restClient.put<UpdateStepRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.BASE}/${stepId}`,
        data,
      ),

    // DELETE {BASE_URL}/main/api/projects/steps
    delete: (projectId: number, stepId: number) =>
      restClient.delete<DeleteStepRequest, void>(
        `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.STEPS.LIST(projectId)}/${stepId}`,
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
    // delete: (checklistId: number) =>
    //   restClient.delete<void>(
    //     `${API_PATH.MAIN}${MAIN_ENDPOINTS.PROJECT.CHECKLIST.BASE}`,
    //   ),
  },
};
