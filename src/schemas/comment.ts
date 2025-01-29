import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "댓글을 입력해주세요"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
