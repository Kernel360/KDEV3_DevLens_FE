/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { LoginResponseRole } from './loginResponseRole';

export interface LoginResponse {
  loginId?: string;
  name?: string;
  email?: string;
  role?: LoginResponseRole;
  profileUrl?: string;
  companyId?: number;
  companyName?: string;
  department?: string;
  position?: string;
}
