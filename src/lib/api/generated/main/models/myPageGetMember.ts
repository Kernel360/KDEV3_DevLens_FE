/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Devlens Admin API 문서
 * Devlens Admin API 문서
 * OpenAPI spec version: 1.0
 */
import type { MyPageGetMemberCompanyStatus } from './myPageGetMemberCompanyStatus';

export interface MyPageGetMember {
  memberId?: number;
  companyId?: number;
  company?: string;
  companyStatus?: MyPageGetMemberCompanyStatus;
  loginId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  department?: string;
  position?: string;
  imageUrl?: string;
}
