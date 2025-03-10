/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
 */
import type { PostCreateRequestPriority } from './postCreateRequestPriority';
import type { PostCreateRequestStatus } from './postCreateRequestStatus';
import type { LinkInput } from './linkInput';

export interface PostCreateRequest {
  projectStepId: number;
  parentPostId?: number;
  priority?: PostCreateRequestPriority;
  status: PostCreateRequestStatus;
  /**
   * @minLength 5
   * @maxLength 100
   */
  title: string;
  /**
   * @minLength 10
   * @maxLength 10000
   */
  content: string;
  deadline?: string;
  /**
   * @minItems 0
   * @maxItems 10
   */
  linkInputList?: LinkInput[];
}
