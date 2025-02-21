"use server";

import { cookies } from "next/headers";
import { AuthApi } from "../apis/main/authApi";
import { LoginRequest } from "@/types/auth";
import { APIError } from "@/types/common";
import { APIResponseLoginResponse } from "../api/generated/main/models";

export async function loginAction(data: LoginRequest) {
  try {
    const response = (await AuthApi.login(
      {
        loginId: data.loginId,
        password: data.password,
      },
      { rawResponse: true },
    )) as Response;

    // 쿠키 처리
    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      response.headers.getSetCookie().forEach((cookie) => {
        const [cookiePart] = cookie.split(";");
        const [cookieName, cookieValue] = cookiePart.split("=");
        cookieStore.set(cookieName.trim(), cookieValue, {
          domain: ".devlens.work",
        });
      });
    }

    // 응답 데이터 파싱
    const responseData = (await response.json()) as APIResponseLoginResponse;

    if (!response.ok || (responseData.code && responseData.code >= 400)) {
      throw new APIError(
        responseData.code ?? response.status,
        responseData.message || "서버에서 오류가 발생했습니다.",
      );
    }

    return {
      success: true,
      user: responseData.data,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message:
        error instanceof APIError
          ? error.message
          : (error as Error).message ||
            "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
