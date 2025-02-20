"use server";

import { cookies } from "next/headers";
import { APIError } from "@/types/common";
import { API_PATH, MAIN_ENDPOINTS } from "../constants/api-endpoints";

export async function logoutAction(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const cookieStore = await cookies();
    const accessCookie = cookieStore.get("X-Access-Token");
    const refreshCookie = cookieStore.get("X-Refresh-Token");
    const cookieHeaderParts = [];
    if (accessCookie?.value) {
      cookieHeaderParts.push(`X-Access-Token=${accessCookie.value}`);
    }
    if (refreshCookie?.value) {
      cookieHeaderParts.push(`X-Refresh-Token=${refreshCookie.value}`);
    }
    const cookieHeader = cookieHeaderParts.join("; ");

    await fetch(`${API_PATH.MAIN}${MAIN_ENDPOINTS.AUTH.LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        credentials: "include",
      },
      credentials: "include",
    });

    if (cookieHeader) {
      const cookies = cookieHeader.split(";");
      cookies.forEach((cookie) => {
        const [cookieName] = cookie.split("=");

        if (
          cookieName.trim() === "X-Access-Token" ||
          cookieName.trim() === "X-Refresh-Token"
        ) {
          cookieStore.set(cookieName.trim(), "", {
            path: "/",
            maxAge: 0,
            expires: new Date(0),
            domain: ".devlens.work",
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
        }
      });
    }

    return { success: true, message: "로그아웃에 성공했습니다." };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof APIError
          ? error.message
          : "로그아웃 중 오류가 발생했습니다.",
    };
  }
}
