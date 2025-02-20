import type { MemberRole } from "@/lib/constants/member";

// 회원 관련 타입
export interface Member {
  id: number;
  loginId: string;
  name: string;
  email: string;
  role: MemberRole;
  // profileImageExists: "Y" | "N";
  status: "ACTIVE" | "INACTIVE" | "WITHDRAW" | "SUSPENDED";
  phoneNumber: string;
  birthDate: string;
  department: string;
  position: string;
  companyId?: number;
  company?: string;
  profileUrl?: string;
}

export interface MemberUpdateRequest {
  name?: string;
  companyId?: number;
  role?: MemberRole;
  phoneNumber?: string;
  department?: string;
  position?: string;
}

// 필수 필드만 포함하는 타입 정의
export type BatchMemberFormValues = Pick<
  Member,
  | "loginId"
  | "name"
  | "email"
  | "role"
  | "phoneNumber"
  | "birthDate"
  | "department"
  | "position"
  | "companyId"
>;
