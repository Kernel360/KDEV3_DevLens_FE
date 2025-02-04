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
  parentPostId?: number;
  priority: "DEFAULT" | "LOW" | "MEDIUM" | "HIGH";
  status: "DEFAULT" | "IN_PROGRESS" | "COMPLETED";
  title: string;
  content: string;
  deadline: string;
  linkInputList?: Array<{
    linkTitle: string;
    link: string;
  }>;
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

export interface LinkResponse {
  id: number;
  linkCategory:
    | "CHECK_APPROVE_REQUEST_LINK"
    | "CHECK_REJECTION_REASON_LINK"
    | "POST_ATTACHMENT_LINK";
  referenceId: number;
  linkTitle: string;
  link: string;
  createdBy: number;
  createdAt: string;
}

export interface FileMetadataDto {
  id: number;
  category: string;
  referenceId: number;
  displayTitle: string;
  title: string;
  contentType: string;
  format: string;
  size: number;
  path: string;
  createdBy: number;
  createdAt: string;
}

export interface CreatePostResponse {
  postId: number;
}
