import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "댓글을 입력해주세요")
    .max(300, "댓글은 100자를 초과할 수 없습니다"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
