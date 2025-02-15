import { z } from "zod";

export const createProjectSchema = z
  .object({
    projectName: z
      .string()
      .min(1, "프로젝트명은 필수입니다")
      .max(50, "프로젝트명은 50자를 초과할 수 없습니다"),
    customerId: z.number().min(1, "고객사를 선택해주세요"),
    developerId: z.number().min(1, "개발사를 선택해주세요"),
    projectDescription: z
      .string()
      .min(1, "프로젝트 설명은 필수입니다")
      .max(200, "프로젝트 설명은 200자를 초과할 수 없습니다"),
    projectTypeId: z.number().min(1, "프로젝트 유형을 선택해주세요"),
    // projectStatusCode: z.enum([
    //   "PREPARED",
    //   "IN_PROGRESS",
    //   "COMPLETED",
    //   "CLOSED",
    //   "CANCELLED",
    //   "DELETED",
    // ]),
    bnsManager: z
      .string()
      .max(10, "BNS 매니저명은 10자를 초과할 수 없습니다")
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
