// 기본 엔티티 타입
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// API 응답 타입
export interface APIResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// 상태 코드 타입
export type StatusCode = "ACTIVE" | "INACTIVE" | "WITHDRAW" | "SUSPENDED";

// 승인 상태 타입
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

// 프로젝트 상태 타입
export type ProjectStatus =
  | "PREPARED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED"
  | "DELETED";

// 기본 요청 타입
export interface BaseRequest {
  requesterId?: number;
  requesterIp?: string;
}

export interface PaginationParams {
  page: number;
  size?: number;
  sort?: string[];
}

export class APIError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = "APIError";
  }
}
