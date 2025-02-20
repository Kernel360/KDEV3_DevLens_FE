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

    const responseData = (await response.json()) as APIResponseLoginResponse;
    return {
      success: true,
      user: responseData.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof APIError
          ? error.message
          : "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
