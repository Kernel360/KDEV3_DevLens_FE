/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
 */
import type { LinkResponseLinkCategory } from './linkResponseLinkCategory';

export interface LinkResponse {
  id?: number;
  linkCategory?: LinkResponseLinkCategory;
  referenceId?: number;
  linkTitle?: string;
  link?: string;
  createdBy?: number;
  createdAt?: string;
}
