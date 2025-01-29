import type { Comment } from "./comment";

export interface Post {
  postId: number;
  projectStepId: number;
  status: "DEFAULT" | "IN_PROGRESS" | "COMPLETED";
  priority: number;
  title: string;
  writer: string;
  createDate: string;
  deadline: string | null;
  content: string;
  authorId: number;
  authorName: string;
  updateDate: string;
  attachments?: PostAttachment[];
  comments?: Comment[];
}

export interface PostComment {
  commentId: number;
  parentCommentId: number | null;
  registerId: number;
  writer: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostAttachment {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
}

// API 요청 타입들
export type CreatePostRequest = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "authorId" | "authorName"
>;
export type UpdatePostRequest = Partial<CreatePostRequest>;

// Add missing types for API requests
export interface PostCreateRequest {
  projectStepId: number;
  title: string;
  content: string;
  deadline: string;
  attachments?: PostAttachment[];
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
  deadline?: string;
  attachments?: PostAttachment[];
}

export interface PostListResponse {
  content: Post[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface FileMetadata {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}
