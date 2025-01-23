// 회원 관련 타입
export interface Member {
  id: number;
  loginId: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER" | "USER";
  // profileImageExists: "Y" | "N";
  status: "ACTIVE" | "INACTIVE" | "WITHDRAW" | "SUSPENDED";
  phoneNumber: string;
  birthDate: string;
  department: string;
  position: string;
  companyId?: number;
  company?: string;
}

export interface MemberUpdateRequest {
  name?: string;
  companyId?: number;
  role?: "ADMIN" | "SUPER" | "USER";
  phoneNumber?: string;
  department?: string;
  position?: string;
}
