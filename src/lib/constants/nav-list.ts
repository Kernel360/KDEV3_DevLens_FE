import { Building2, FolderCode, User } from "lucide-react";

export const NAV_LIST = [
  {
    title: "계정관리",
    url: "#",
    icon: User,
    items: [
      {
        title: "계정 목록",
        url: "/members",
      },
      {
        title: "계정 생성",
        url: "/members/create",
      },
    ],
  },
  {
    title: "회사관리",
    url: "#",
    icon: Building2,
    items: [
      {
        title: "회사 목록",
        url: "/company",
      },
      {
        title: "회사 생성",
        url: "/company/create",
      },
    ],
  },
  {
    title: "프로젝트 관리",
    url: "#",
    icon: FolderCode,
    items: [
      {
        title: "프로젝트 목록",
        url: "/projects",
      },
      {
        title: "프로젝트 생성",
        url: "/projects/create",
      },
    ],
  },
];
