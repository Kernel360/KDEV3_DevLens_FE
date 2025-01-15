import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { testUsers } from "./lib/mockData";

declare module "next-auth" {
  interface Session {
    user: {
      role: string; // 사용자 역할 정보
      email: string; // 사용자 이메일
    } & DefaultSession["user"]; // 기본 세션 사용자 타입 확장
  }
  interface User {
    loginId: string; // 로그인 시 사용
    pwd: string; // 로그인 시 사용
    role: string; // 사용자 정보
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        loginId: {},
        pwd: {},
      },
      authorize: async (credentials) => {
        const user = Object.values(testUsers).find(
          (user) =>
            user.loginId === credentials?.loginId &&
            user.pwd === credentials?.pwd,
        );

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   // 유저 인증 확인
    //   const isLoggedIn = !!auth?.user;
    //   // 보호하고 싶은 경로 설정
    //   //  /login 경로를 제외한 모든 경로가 보호
    //   const isOnProtected = !nextUrl.pathname.startsWith("/login");

    //   if (isOnProtected) {
    //     if (isLoggedIn) return true;
    //     return false; // '/login' 경로로 강제이동
    //   } else if (isLoggedIn) {
    //     // 홈페이지로 이동
    //     return Response.redirect(new URL("/", nextUrl));
    //   }
    //   return true;
    // },
  },
  pages: {
    signIn: "/login",
  },
});
