"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthApi } from "../apis/main/authApi";
import { LoginRequest } from "@/types/auth";
import { APIError } from "@/types/common";

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
      const cookies = setCookieHeader.split(",");
      cookies.forEach((cookie) => {
        const [cookieMain] = cookie.split(";");
        const [cookieName, cookieValue] = cookieMain.split("=");

        if (
          cookieName.trim() === "X-Access-Token" ||
          cookieName.trim() === "X-Refresh-Token"
        ) {
          cookieStore.set(cookieName.trim(), cookieValue, {
            path: "/",
            maxAge: cookieName.trim() === "X-Access-Token" ? 86400 : 3600,
            expires: new Date(
              Date.now() +
                (cookieName.trim() === "X-Access-Token" ? 86400000 : 3600000),
            ),
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
        }
      });
    }

    const responseData = await response.json();
    return {
      success: true,
      user: {
        loginId: responseData.data.loginId,
        name: responseData.data.name,
        email: responseData.data.email,
        role: responseData.data.role,
        profileUrl: responseData.data.profileUrl,
        companyId: responseData.data.companyId,
        companyName: responseData.data.companyName,
        department: responseData.data.department,
        position: responseData.data.position,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof APIError
          ? error.message
          : "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

export async function logoutAction() {
  try {
    // 서버에 로그아웃 요청
    await AuthApi.logout();

    // 쿠키 삭제
    const cookieStore = await cookies();
    cookieStore.delete("X-Access-Token");
    cookieStore.delete("X-Refresh-Token");
  } catch (error) {
    return { success: false, message: error };
  }

  redirect("/login");
}
