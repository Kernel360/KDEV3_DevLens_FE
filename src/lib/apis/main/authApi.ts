import { MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const AuthApi = {
  login: (data: LoginRequest) =>
    restClient.post<LoginRequest, LoginResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.LOGIN}`,
      data,
      { rawResponse: true },
    ),

  logout: () =>
    restClient.post<void, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.LOGOUT}`,
      undefined,
    ),

  sendMail: (email: string) =>
    restClient.post<{ email: string }, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.SEND_MAIL}`,
      { email },
    ),

  resetPassword: (data: { email: string; password: string }) =>
    restClient.patch<{ email: string; password: string }, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.RESET_PASSWORD}`,
      data,
    ),
};
