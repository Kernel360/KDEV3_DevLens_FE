import { MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { API_PATH } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  EmailVerificationRequest,
} from "@/types/auth";

export const AuthApi = {
  // POST /api/login
  login: (data: LoginRequest) =>
    restClient.post<LoginRequest, LoginResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.LOGIN}`,
      data,
    ),

  // POST /api/logout
  logout: () =>
    restClient.post<void, string>( // 응답 타입을 string으로 변경 (OK, UPDATED 등)
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.LOGOUT}`,
      undefined,
    ),

  // POST /api/send-mail
  sendMail: (email: string) =>
    restClient.post(`${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.SEND_MAIL}`, {
      email,
    }),

  // POST /api/check-mail
  verifyEmail: (data: EmailVerificationRequest) =>
    restClient.post(`${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.CHECK_MAIL}`, data),

  // PATCH /api/members/reset-password
  resetPassword: (data: ResetPasswordRequest) =>
    restClient.patch(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.RESET_PASSWORD}`,
      data,
    ),

  // POST /api/auth/refresh
  refreshToken: () =>
    restClient.post<void, void>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.REFRESH}`,
      undefined,
    ),
};
