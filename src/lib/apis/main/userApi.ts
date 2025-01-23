import { MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { UpdateUserRequest, User } from "@/types/user";

export const userApi = {
  getDetail: (loginId: string) =>
    restClient.get<User>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.DETAIL(loginId)}`,
    ),

  update: (loginId: string, data: UpdateUserRequest) =>
    restClient.patch<UpdateUserRequest, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.DETAIL(loginId)}`,
      data,
    ),
  getProfileImage: (memberId: number) => {
    return restClient.get<string>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
    );
  },
  uploadProfileImage: (memberId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return restClient.post<FormData, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
      formData,
    );
  },
  deleteProfileImage: (memberId: number) =>
    restClient.delete<void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.MEMBER.PROFILE_IMAGE(memberId)}`,
    ),
};
