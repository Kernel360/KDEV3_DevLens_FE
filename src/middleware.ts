import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { AuthApi } from "./lib/apis/main/authApi";

// 공개 경로 목록
const publicPaths = ["/login", "/forgot"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("X-Access-Token");
  const refreshToken = request.cookies.get("X-Refresh-Token");
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 로그인하지 않은 사용자가 공개 경로가 아닌 곳에 접근하면 로그인 페이지로 리다이렉트
  // if (!accessToken && !isPublicPath) {
  // 기존 접근하려던 경로 저장 - 로그인 후 리다이렉트

  // 액세스 토큰이 없고 리프레시 토큰이 있는 경우
  if (!accessToken && refreshToken && !isPublicPath) {
    // try {
    //   // 토큰 재발급 시도
    //   await AuthApi.refreshToken();
    //   // 재발급 성공시 다음 미들웨어로
    //   return NextResponse.next();
    // } catch (error) {
    //   console.error(error);
      // 재발급 실패시 로그인 페이지로
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect_to", pathname);
      return NextResponse.redirect(loginUrl);
    // }
  }

  // 둘 다 없는 경우 로그인 페이지로
  if (!accessToken && !refreshToken && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인한 사용자가 공개 경로 접근시 대시보드로
  if (accessToken && isPublicPath) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
