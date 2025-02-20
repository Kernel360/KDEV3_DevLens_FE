import { ADMIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { ProjectFormData } from "@/schemas/project";
import { PaginatedResponse, PaginationParams } from "@/types/common";
import { Project } from "@/types/project";

export const adminProjectApi = {
  create: (data: ProjectFormData) =>
    restClient.post<ProjectFormData, Project>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.BASE}`,
      data,
    ),
  getList: ({ page, size = 10 }: PaginationParams) =>
    restClient.get<PaginatedResponse<Project>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.BASE}`,
      {
        queryParams: {
          page: page - 1,
          size,
        },
      },
    ),

  getDetail: (id: number) =>
    restClient.get<Project>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.DETAIL(id)}`,
    ),

  delete: (id: number) =>
    restClient.delete<void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.DETAIL(id)}`,
    ),

  getHistory: (id: number, { page, size = 10 }: PaginationParams) =>
    restClient.get<PaginatedResponse<Project>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.HISTORY(id)}`,
      {
        queryParams: {
          page: String(page),
          size: String(size),
        },
      },
    ),
};
