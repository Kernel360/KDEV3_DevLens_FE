import * as z from "zod";

export const createMemberSchema = z
  .object({
    loginId: z
      .string()
      .min(4, "아이디는 최소 4자 이상이어야 합니다.")
      .max(12, "아이디는 최대 12자까지 가능합니다.")
      .regex(/^[a-zA-Z0-9]+$/, "영문과 숫자만 사용 가능합니다."),
    name: z
      .string()
      .min(2, "이름은 최소 2자 이상이어야 합니다.")
      .max(18, "이름은 최대 18자까지 가능합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 가능합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
      ),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\d{3}-\d{4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다."),
    birthDate: z
      .date({
        required_error: "생년월일을 선택해주세요",
        invalid_type_error: "올바른 날짜를 선택해주세요",
      })
      .transform((date) => date.toISOString().split("T")[0]),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    companyId: z.number(),
    department: z.string(),
    position: z.string(),
    role: z.enum(["ADMIN", "SUPER", "USER"]).default("USER"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type CreateMemberFormData = z.infer<typeof createMemberSchema>;

export type MemberFormValues = Omit<CreateMemberFormData, "confirmPassword">;
