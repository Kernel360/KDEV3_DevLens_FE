import { z } from "zod";

// TODO: 로그인 스키마 확인
export const signInSchema = z.object({
  loginId: z.string().min(8, {
    message: "최소 8자 이상의 아이디를 입력해주세요.",
  }),
  pwd: z.string().min(8, {
    message: "최소 8자 이상의 비밀번호를 입력해주세요.",
  }),
});
