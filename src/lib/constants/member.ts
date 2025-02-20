export const MEMBER_ROLES = {
  ADMIN: "ADMIN",
  SUPER: "SUPER",
  USER: "USER",
} as const;

export const MEMBER_ROLE_OPTIONS = [
  { label: "관리자", value: MEMBER_ROLES.ADMIN },
  { label: "슈퍼관리자", value: MEMBER_ROLES.SUPER },
  { label: "일반사용자", value: MEMBER_ROLES.USER },
] as const;

export type MemberRole = keyof typeof MEMBER_ROLES;
