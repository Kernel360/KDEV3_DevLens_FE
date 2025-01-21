import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 공개 경로 목록
const publicPaths = ["/login", "/forgot"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 공개 경로 통과
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken");
  if (!token) {
    // 기존 접근하려던 경로 저장 - 로그인 후 리다이렉트
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
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
