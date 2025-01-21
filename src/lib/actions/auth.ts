"use server";

import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from "@/types/user";
import restClient from "../restClient";
import { redirect } from "next/navigation";

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  email: string;
  auth: string;
}

const isProduction = process.env.NODE_ENV === "production";

export async function loginAction(formData: FormData) {
  try {
    const response = await fetch(`${process.env.API_URL}/main/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: formData.get("loginId"),
        password: formData.get("password"),
      }),
    });

    // 응답 헤더에서 토큰 확인
    // TODO: api 변경 후 쿠키에서 토큰 확인
    const accessToken = response.headers.get("authorization");
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
    console.log(decodedAccessToken);

    const data = await response.json();
    const { name, role } = data;

    const user: User = {
      loginId: formData.get("loginId") as string,
      memberId: decodedAccessToken.sub,
      name,
      email,
      auth,
      role,
    };
    return {
      success: true,
      user,
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    await restClient.post(`${process.env.API_URL}/main/api/login`, {});
  } catch (error) {
    return { success: false, message: error };
  } finally {
    redirect("/login");
  }
}
