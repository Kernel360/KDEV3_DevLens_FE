interface RouteConfig {
  path: string;
  breadcrumb: {
    parent?: string;
    label: string;
  };
}

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  members: {
    path: "/members",
    breadcrumb: {
      parent: "계정관리",
      label: "계정 목록",
    },
  },
  projects: {
    path: "/projects",
    breadcrumb: {
      parent: "프로젝트",
      label: "프로젝트 목록",
    },
  },
  "projects/[id]": {
    path: "/projects/[id]",
    breadcrumb: {
      parent: "프로젝트",
      label: "프로젝트 상세",
    },
  },
} as const;
