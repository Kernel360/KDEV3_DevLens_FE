"use server";

// import { signIn, signOut } from "@/auth";
// import { AuthError } from "next-auth";

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn("credentials", {
//       loginId: formData.get("loginId"),
//       pwd: formData.get("pwd"),
//       role: formData.get("role"),
//       redirectTo: "/",
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       return "로그인 실패";
//     }
//     throw error;
//   }
// }

// export async function logout() {
//   try {
//     await signOut({ redirectTo: "/login" });
//   } catch (error) {
//     throw error;
//   }
// }
