import { ADMIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import type {
  PaginatedResponse,
  PaginationParams
} from "@/types/common";
import { Company } from "@/types/company";

export const CompanyApi = {
  /*
    회사 목록 조회
    **/
  getList: ({ page, size = 10, sort }: PaginationParams) =>
    restClient.get<PaginatedResponse<Company>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.BASE}`,
      { page: String(page), size: String(size), sort: sort?.join(",") },
    ),

  /*
    회사 선택 select용
    **/
  getAll: () =>
    restClient.get<Company[]>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.ALL}`,
    ),

  getDetail: (id: number) =>
    restClient.get<Company>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.DETAIL(id)}`,
    ),

  create: (data: Omit<Company, "id" | "isActive">) =>
    restClient.post<Omit<Company, "id" | "isActive">, void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.BASE}`,
      data,
    ),

  update: (id: number, data: Partial<Omit<Company, "id">>) =>
    restClient.put<Partial<Omit<Company, "id">>, void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.DETAIL(id)}`,
      data,
    ),

  delete: (id: number) =>
    restClient.delete<void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.DETAIL(id)}`,
    ),

  uploadLogo: (companyId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return restClient.post<FormData, void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.COMPANY.LOGO(companyId)}`,
      formData,
    );
  },
};
