import { ADMIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { PaginatedResponse, PaginationParams } from "@/types/common";
import { Project } from "@/types/project";

export const adminProjectApi = {
  getList: ({ page, size = 10, sort }: PaginationParams) =>
    restClient.get<PaginatedResponse<Project>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.PROJECT.BASE}`,
      {
        queryParams: {
          page: String(page),
          size: String(size),
          ...(sort && { sort: sort.join(",") }),
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
