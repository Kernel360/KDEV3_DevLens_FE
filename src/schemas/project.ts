import { z } from "zod";

export const createProjectSchema = z
  .object({
    projectName: z
      .string()
      .min(1, "프로젝트명은 필수입니다")
      .max(20, "프로젝트명은 20자를 초과할 수 없습니다"),
    customerId: z.number().min(1, "고객사를 선택해주세요"),
    developerId: z.number().min(1, "개발사를 선택해주세요"),
    projectDescription: z
      .string()
      .min(1, "프로젝트 설명은 필수입니다")
      .max(200, "프로젝트 설명은 200자를 초과할 수 없습니다"),
    projectTypeId: z.number().min(1, "프로젝트 유형을 선택해주세요"),
    bnsManager: z
      .string()
      .max(10, "시스템 담당자명은 10자를 초과할 수 없습니다")
      .optional(),
    contractNumber: z
      .string()
      .min(1, "계약번호는 필수입니다")
      .max(20, "계약번호는 20자를 초과할 수 없습니다"),
    plannedStartDate: z.string().min(1, "계획 시작일은 필수입니다"),
    plannedEndDate: z.string().min(1, "계획 종료일은 필수입니다"),
    projectTags: z
      .array(z.string().max(15, "각 태그는 15자를 초과할 수 없습니다"))
      .max(10, "태그는 최대 10개까지만 추가할 수 있습니다")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.plannedStartDate || !data.plannedEndDate) return true;
      return new Date(data.plannedStartDate) <= new Date(data.plannedEndDate);
    },
    {
      message: "종료일은 시작일 이후여야 합니다",
      path: ["plannedEndDate"],
    },
  );

export type ProjectFormData = z.infer<typeof createProjectSchema>;

// 멤버 권한 스키마
// const memberAuthorizationSchema = z.object({
//   memberId: z.number(),
//   memberName: z.string(),
//   memberType: z.enum(["CLIENT", "DEVELOPER"]),
//   projectAuthorization: z.string(),
// });

export const updateProjectSchema = z
  .object({
    // 읽기 전용 필드들
    customerCompanyId: z.number().readonly(),
    developerCompanyId: z.number().readonly(),
    customerCompanyName: z.string().optional().readonly(),
    developerCompanyName: z.string().optional().readonly(),
    contractNumber: z.string().readonly(),
    finalApprover: z.string().optional().readonly(),
    finalApprovalDate: z.string().nullable().optional().readonly(),
    projectTypeName: z.string().optional().readonly(),

    // 수정 가능한 필드들
    projectName: z
      .string()
      .min(1, "프로젝트명은 필수입니다")
      .max(20, "프로젝트명은 20자를 초과할 수 없습니다"),
    projectDescription: z
      .string()
      .min(1, "프로젝트 설명은 필수입니다")
      .max(200, "프로젝트 설명은 200자를 초과할 수 없습니다"),
    projectTypeId: z.number().min(1, "프로젝트 유형을 선택해주세요"),
    projectStatusCode: z.enum([
      "PREPARED",
      "IN_PROGRESS",
      "COMPLETED",
      "CLOSED",
      "CANCELLED",
      "DELETED",
    ]),
    bnsManager: z
      .string()
      .max(10, "시스템 담당자명은 10자를 초과할 수 없습니다")
      .optional(),
    plannedStartDate: z.string().min(1, "계획 시작일은 필수입니다"),
    plannedEndDate: z.string().min(1, "계획 종료일은 필수입니다"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    projectTags: z
      .array(z.string().max(15, "각 태그는 15자를 초과할 수 없습니다"))
      .max(10, "태그는 최대 10개까지만 추가할 수 있습니다")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.plannedStartDate || !data.plannedEndDate) return true;
      return new Date(data.plannedStartDate) <= new Date(data.plannedEndDate);
    },
    {
      message: "종료일은 시작일 이후여야 합니다",
      path: ["plannedEndDate"],
    },
  );

export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
