export interface Member extends Record<string, unknown> {
  id: number;
  loginId: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER";
  status: "ACTIVE" | "INACTIVE";
  profileImageExists: "Y" | "N";
  phoneNumber: string;
  birthDate: string;
  departmentId: number;
  positionId: number;
}
