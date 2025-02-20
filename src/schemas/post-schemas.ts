import { z } from "zod";

export const postFormSchema = z.object({
  step: z.string().min(1, { message: "단계를 선택해주세요" }),
  title: z.string().trim().min(5, { message: "제목은 필수 입력 항목입니다" }),
  status: z.enum([
    "DEFAULT",
    "IN_PROGRESS",
    "ADDITION",
    "COMPLETED",
    "ON_HOLD",
  ] as const),
  priority: z.enum(["DEFAULT", "LOW", "MEDIUM", "HIGH"]),
  dueDate: z.date().optional(),
  content: z
    .string()
    .trim()
    .min(10, { message: "본문을 10자 이상 입력해주세요" }),
  links: z.array(
    z.object({
      id: z.number().optional(), 
      linkTitle: z.string().trim(),
      link: z.string().trim().url({ message: "올바른 URL을 입력해주세요" }),
    }),
  ),
});