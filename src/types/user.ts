// User 타입 (내 정보)
export interface User {
  loginId: string;
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  companyId: number;
  companyStatus?: "Y" | "N";
  department: string;
  position: string;
  birthDate?: string;
  auth?: string;
  role?: string;
  avatar?: string;
  // status: 'ACTIVE' | 'INACTIVE' | 'WITHDRAW' | 'SUSPENDED';
}

export interface UpdateUserRequest {
  email?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
}
