import { MAIN_ENDPOINTS, API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { UpdateUserRequest, User } from "@/types/user";

export const UserApi = {
  // GET /api/members/{loginId}
  getDetail: (loginId: string) =>
    restClient.get<User>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.DETAIL(loginId)}`,
    ),

  // PATCH /api/members/{loginId}
  update: (loginId: string, data: UpdateUserRequest) =>
    restClient.patch(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.DETAIL(loginId)}`,
      data,
    ),

  // GET /api/members/{memberId}/profile-image
  getProfileImage: (memberId: number) =>
    restClient.get<string>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
    ),

  // POST /api/members/{memberId}/profile-image
  uploadProfileImage: (memberId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return restClient.post(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
      formData,
    );
  },

  // DELETE /api/members/{memberId}/profile-image
  deleteProfileImage: (memberId: number) =>
    restClient.delete(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
    ),
};
