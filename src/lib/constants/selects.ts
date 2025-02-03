export const PROJECT_TYPES = [
  { id: 1, label: "내부" },
  { id: 2, label: "고객" },
  { id: 3, label: "연구/개발" },
  { id: 4, label: "외주" },
] as const;

export const BUSINESS_TYPE_OPTIONS = {
  CORPORATION: "법인",
  INDIVIDUAL: "개인",
} as const;

export const DEFAULT_FILTER_OPTIONS: {
  value: "ALL" | "TITLE" | "CONTENT" | "WRITER";
  label: string;
}[] = [
  { value: "ALL", label: "전체" },
  { value: "TITLE", label: "제목" },
  { value: "CONTENT", label: "내용" },
  { value: "WRITER", label: "작성자" },
];

export const DEFAULT_SORT_OPTIONS: {
  value: "NEWEST" | "OLDEST";
  label: string;
}[] = [
  { value: "NEWEST", label: "최신순" },
  { value: "OLDEST", label: "오래된순" },
];

export const DEFAULT_STATUS_OPTIONS: {
  value: "ACTIVE" | "INACTIVE" | "WITHDRAW" | "SUSPENDED";
  label: string;
}[] = [
  { value: "ACTIVE", label: "활성" },
  { value: "INACTIVE", label: "비활성" },
  { value: "WITHDRAW", label: "탈퇴" },
  { value: "SUSPENDED", label: "정지" },
];

export const DEFAULT_ROLE_OPTIONS: {
  value: "ADMIN" | "SUPER" | "USER";
  label: string;
}[] = [
  { value: "ADMIN", label: "관리자" },
  { value: "SUPER", label: "슈퍼관리자" },
  { value: "USER", label: "일반사용자" },
];
