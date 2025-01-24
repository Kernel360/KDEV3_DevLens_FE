import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 공개 경로 목록
const publicPaths = ["/login", "/forgot"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken");
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 로그인하지 않은 사용자가 공개 경로가 아닌 곳에 접근하면 로그인 페이지로 리다이렉트
  if (!token && !isPublicPath) {
    // 기존 접근하려던 경로 저장 - 로그인 후 리다이렉트
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인한 사용자가 /login 또는 /forgot에 접근하면 /dashboard로 리다이렉트
  if (token && isPublicPath) {
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
