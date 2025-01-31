export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmailVerificationRequest {
  email: string;
  verificationCode: string;
}

export interface LoginResponse {
  loginId: string;
  name: string;
  email: string;
  role: string;
  profileUrl: string | null;
  companyId: number;
  companyName: string;
  department: string | null;
  position: string | null;
}
