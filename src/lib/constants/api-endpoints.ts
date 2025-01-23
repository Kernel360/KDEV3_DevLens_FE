const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_PATH = {
  ADMIN: `${BASE_URL}/admin`,
  MAIN: `${BASE_URL}/main`,
};

export const ADMIN_ENDPOINTS = {
  MEMBER: {
    BASE: "/api/admin/members",
    DETAIL: (id: number) => `/api/admin/members/${id}`,
    BATCH: "/api/admin/members/batch",
    SEARCH: "/api/admin/members/search",
    STATUS: (id: number) => `/api/admin/members/${id}/status`,
  },

  PROJECT: {
    BASE: "/api/admin/projects",
    DETAIL: (id: number) => `/api/admin/projects/${id}`,
    SEARCH: "/api/admin/projects/search",
    HISTORY: (id: number) => `/api/admin/projects/${id}/history`,
  },

  COMPANY: {
    BASE: "/api/admin/companies",
    DETAIL: (id: number) => `/api/admin/companies/${id}`,
    SEARCH: "/api/admin/companies/search",
    ALL: "/api/admin/companies/all",
    LOGO: (companyId: number) => `/api/company/${companyId}/logo-image`,
  },
} as const;

export const MAIN_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/login",
    LOGOUT: "/api/logout",
    SEND_MAIL: "/api/send-mail",
    CHECK_MAIL: "/api/check-mail",
    RESET_PASSWORD: "/api/members/reset-password",
  },

  MEMBER: {
    BASE: "/api/members",
    DETAIL: (loginId: string) => `/api/members/${loginId}`,
    PROFILE_IMAGE: (memberId: number) =>
      `/api/members/${memberId}/profile-image`,
  },

  PROJECT: {
    BASE: "/api/projects",
    DETAIL: (id: number) => `/api/projects/${id}`,
    STEPS: {
      BASE: "/api/projects/steps",
      LIST: (projectId: number) => `/api/projects/${projectId}/steps`,
      DETAIL: (stepId: number) => `/api/projects/steps/${stepId}`,
    },
    CHECKLIST: {
      BASE: "/api/projects",
      APPLICATIONS: "/api/projects/applications",
      APPLICATION_DETAIL: (applicationId: number) =>
        `/api/projects/applications/${applicationId}`,
      ACCEPT: (applicationId: number) =>
        `/api/projects/accept/${applicationId}`,
      REJECT: (applicationId: number) =>
        `/api/projects/reject/${applicationId}`,
    },
  },

  POST: {
    BASE: "/api/posts",
    DETAIL: (postId: number) => `/api/posts/${postId}`,
    LIST_BY_STEP: (projectStepId: number) =>
      `/api/posts/steps/${projectStepId}`,
  },
} as const;
