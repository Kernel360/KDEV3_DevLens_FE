/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
 */
import type { Project } from './project';
import type { ProjectTag } from './projectTag';
import type { PostProjectResponseProjectStatusCode } from './postProjectResponseProjectStatusCode';

export interface PostProjectResponse {
  project?: Project;
  tags?: ProjectTag[];
  id?: number;
  projectName?: string;
  customerCompanyName?: string;
  developerCompanyName?: string;
  projectDescription?: string;
  projectTypeName?: string;
  projectStatusCode?: PostProjectResponseProjectStatusCode;
  bnsManager?: string;
  contractNumber?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  projectTags?: string[];
}
