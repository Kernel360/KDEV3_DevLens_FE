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
  name: string;
  role: string;
  headers: {
    get(name: string): string | null;
  };
}
