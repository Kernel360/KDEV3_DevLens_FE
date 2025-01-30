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
