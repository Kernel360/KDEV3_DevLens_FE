/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { GetCompanyDetailResponseBusinessType } from './getCompanyDetailResponseBusinessType';

export interface GetCompanyDetailResponse {
  id?: number;
  companyName?: string;
  representativeName?: string;
  representativeContact?: string;
  representativeEmail?: string;
  address?: string;
  businessType?: GetCompanyDetailResponseBusinessType;
  businessRegistrationNumber?: string;
}
