import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { User } from "@/types/user";

// interface SessionUser {
//   loginId: string;
//   name?: string;
//   role?: string;
//   sub?: string;
// }

export async function getServerSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken?.value) {
    redirect("/login");
  }

  try {
    const decoded = jwtDecode<User>(accessToken.value);
    return decoded;
  } catch (error) {
    console.error("세션 정보를 받아오는데 실패했습니다:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session) throw new Error("인증되지 않은 사용자입니다.");
  return session;
}