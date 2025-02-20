import { z } from "zod";

// 기본 회사 스키마 (공통 필드)
const baseCompanySchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "회사명은 필수입니다" })
    .max(20, { message: "회사명은 20자 이내로 입력해주세요" }),
  businessType: z.enum(["CORPORATION", "INDIVIDUAL"], {
    required_error: "사업자 유형을 선택해주세요",
  }),
  registrationNumber: z
    .string()
    .min(1, { message: "사업자등록번호는 필수입니다" })
    .regex(/^\d{3}-\d{2}-\d{5}$/, {
      message: "올바른 사업자등록번호 형식이 아닙니다 (예: 123-45-67890)",
    }),
  representativeName: z
    .string()
    .min(1, { message: "대표자명은 필수입니다" })
    .max(12, { message: "대표자명은 12자 이내로 입력해주세요" }),
  representativeContact: z
    .string()
    .min(1, { message: "대표번호는 필수입니다" })
    .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
      message: "올바른 전화번호 형식이 아닙니다 (예: 02-1234-5678)",
    }),
  email: z
    .string()
    .min(1, { message: "이메일은 필수입니다" })
    .email({ message: "올바른 이메일 형식이 아닙니다" }),
  address: z
    .string()
    .min(1, { message: "주소는 필수입니다" })
    .max(200, { message: "주소는 200자 이내로 입력해주세요" }),
});

// 회사 생성 스키마
export const createCompanySchema = baseCompanySchema;

// 회사 수정 스키마
export const updateCompanySchema = baseCompanySchema.extend({
  isActive: z.enum(["Y", "N"], {
    required_error: "활성화 상태를 선택해주세요",
  }),
  // departments: z
  //   .array(z.string())
  //   .min(1, { message: "최소 1개 이상의 부서를 입력해주세요" }),
});

// 타입 정의
export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;
export type UpdateCompanyFormData = z.infer<typeof updateCompanySchema>;
