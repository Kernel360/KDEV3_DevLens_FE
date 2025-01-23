import { ADMIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import {
  PaginatedResponse,
  PaginationParams
} from "@/types/common";
import { Member, MemberUpdateRequest } from "@/types/member";

export const adminMemberApi = {
  /*
  @description 계정 목록 조회
  */
  getList: ({ page, size = 10, sort }: PaginationParams) =>
    restClient.get<PaginatedResponse<Member>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.BASE}`,
      { page: String(page), size: String(size), sort: sort?.join(",") },
    ),
  /*
  @description 계정 상세
  */
  getDetail: (id: number) =>
    restClient.get<Member>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.DETAIL(id)}`,
    ),

  update: (id: number, data: MemberUpdateRequest) =>
    restClient.patch<MemberUpdateRequest, void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.DETAIL(id)}`,
      data,
    ),

  updateStatus: (id: number, status: Member["status"]) =>
    restClient.patch<{ status: Member["status"] }, void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.STATUS(id)}`,
      { status },
    ),

  search: (query: string, { page, size = 10 }: PaginationParams) =>
    restClient.get<PaginatedResponse<Member>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.SEARCH}`,
      { query, page: String(page), size: String(size) },
    ),

  batchUpdate: (data: MemberUpdateRequest[]) =>
    restClient.post<MemberUpdateRequest[], void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.BATCH}`,
      data,
    ),
};
