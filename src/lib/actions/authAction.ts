"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthApi } from "../apis/main/authApi";
import { LoginRequest } from "@/types/auth";
import { APIError } from "@/types/common";

export async function loginAction(data: LoginRequest) {
  try {
    const response = await AuthApi.login({
      loginId: data.loginId,
      password: data.password,
    });

    console.log(response);

    return {
      success: true,
      user: {
        loginId: response.loginId,
        name: response.name,
        email: response.email,
        role: response.role,
        profileUrl: response.profileUrl,
        companyId: response.companyId,
        companyName: response.companyName,
        department: response.department,
        position: response.position,
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
