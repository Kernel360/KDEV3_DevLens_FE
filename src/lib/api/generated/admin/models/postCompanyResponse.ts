/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { PostCompanyResponseBusinessType } from './postCompanyResponseBusinessType';

export interface PostCompanyResponse {
  id?: number;
  companyName?: string;
  representativeName?: string;
  representativeContact?: string;
  representativeEmail?: string;
  address?: string;
  businessType?: PostCompanyResponseBusinessType;
  businessRegistrationNumber?: string;
}
