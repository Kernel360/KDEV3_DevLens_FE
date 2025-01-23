export interface Post {
  id: number;
  projectStepId: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  attachments?: PostAttachment[];
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
