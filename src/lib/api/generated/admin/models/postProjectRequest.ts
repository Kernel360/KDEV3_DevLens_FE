/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
 */

export interface PostProjectRequest {
  projectName: string;
  customerId?: number;
  developerId?: number;
  projectDescription?: string;
  projectTypeId?: number;
  bnsManager?: string;
  contractNumber?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  projectTags?: string[];
}
