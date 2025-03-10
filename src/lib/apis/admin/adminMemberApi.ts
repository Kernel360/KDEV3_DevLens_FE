import { ADMIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { PaginatedResponse, PaginationParams } from "@/types/common";
import { Member, MemberUpdateRequest } from "@/types/member";
import { MemberFormValues } from "@/schemas/member";

interface MemberListParams extends PaginationParams {
  name?: string;
  status?: Member["status"];
  role?: Member["role"];
  loginId?: string;
  sort?: string[];
  direction?: "asc" | "desc";
}

export const adminMemberApi = {
  /*
  @description 계정 목록 조회
  */
  getList: ({
    page,
    size = 10,
    sort,
    name,
    status,
    role,
    loginId,
    direction,
  }: MemberListParams) =>
    restClient.get<PaginatedResponse<Member>>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.BASE}`,
      {
        queryParams: {
          page: page - 1,
          size,
          ...(sort && { sort: sort.join(",") }),
          ...(name && { name }),
          ...(status && { status }),
          ...(role && { role }),
          ...(loginId && { loginId }),
          ...(direction && { direction }),
        },
      },
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
      {
        queryParams: {
          query,
          page: String(page),
          size: String(size),
        },
      },
    ),
  create: (data: Omit<MemberFormValues, "confirmPassword">) =>
    restClient.post<Omit<MemberFormValues, "confirmPassword">, Member>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.BASE}`,
      data,
    ),
  batchMembers: (data: MemberUpdateRequest[]) =>
    restClient.post<MemberUpdateRequest[], void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.BATCH}`,
      data,
    ),
  delete: (id: number) =>
    restClient.delete<void>(
      `${API_PATH.ADMIN}${ADMIN_ENDPOINTS.MEMBER.DETAIL(id)}`,
    ),
};
