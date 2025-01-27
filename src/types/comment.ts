export interface Comment {
  id: number;
  postId: number;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCommentRequest {
  content: string;
}

export interface PatchCommentRequest {
  content: string;
}

export interface DeleteCommentRequest {
  authorId: number;
}
