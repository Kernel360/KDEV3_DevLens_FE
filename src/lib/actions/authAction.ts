"use server";

import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AuthApi } from "../apis/main/authApi";
import { redirect } from "next/navigation";
import { LoginRequest } from "@/types/auth";

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  email: string;
  auth: string;
}

const isProduction = process.env.NODE_ENV === "production";

export async function loginAction(data: LoginRequest) {
  try {
    const response = await AuthApi.login({
      loginId: data.loginId,
      password: data.password,
    });

    // 응답 헤더에서 토큰 확인
    const accessToken = response.headers?.get("authorization");
    if (!accessToken) throw new Error("No access token found");

    // JWT 토큰을 쿠키에 저장
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction || process.env.API_URL?.startsWith("https://"),
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
    });

    const decodedAccessToken = jwtDecode<CustomJwtPayload>(accessToken);
    const { auth, email } = decodedAccessToken;
    const { name, role } = response;

    return {
      success: true,
      user: {
        loginId: data.loginId,
        name,
        email,
        auth,
        role,
      },
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    console.log("logout");
    await AuthApi.logout();
  } catch (error) {
    return { success: false, message: error };
  }
  redirect("/login");
}
