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
