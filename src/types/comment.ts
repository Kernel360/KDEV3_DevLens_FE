// API 응답 타입
export interface Comment {
  commentId: number;
  parentCommentId: number | null;
  registerId: number;
  writer: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 댓글 트리 구조를 위한 타입
export interface CommentWithReplies extends Comment {
  replies?: Comment[];
}

// API 요청 타입
export interface CommentRequest {
  content: string;
  parentCommentId?: number | null;
}

export type UpdateCommentRequest = Pick<CommentRequest, "content">;

export interface DeleteCommentRequest {
  authorId: number;
}
