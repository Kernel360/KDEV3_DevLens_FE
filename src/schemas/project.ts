import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string().min(1, "프로젝트명은 필수입니다"),
  customerId: z.number().min(1, "고객사를 선택해주세요"),
  developerId: z.number().min(1, "개발사를 선택해주세요"),
  projectDescription: z.string().min(1, "프로젝트 설명은 필수입니다"),
  projectTypeId: z.number().min(1, "프로젝트 유형을 선택해주세요"),
  // projectStatusCode: z.enum([
  //   "PREPARED",
  //   "IN_PROGRESS",
  //   "COMPLETED",
  //   "CLOSED",
  //   "CANCELLED",
  //   "DELETED",
  // ]),
  bnsManager: z.string().optional(),
  contractNumber: z.string().min(1, "계약번호는 필수입니다"),
  plannedStartDate: z.string().min(1, "계획 시작일은 필수입니다"),
  plannedEndDate: z.string().min(1, "계획 종료일은 필수입니다"),
});

export type ProjectFormData = z.infer<typeof createProjectSchema>;
