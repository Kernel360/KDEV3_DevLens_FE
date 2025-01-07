import { Checklist } from "@/types/checklist";
import { Project } from "@/types/project";
import { Command, GalleryVerticalEnd, Building2, User } from "lucide-react";

export const MockData = {
  user: {
    name: "관리자",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
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
  ],
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "Project 1 description",
    status: "active",
    startAt: "24.12.07",
    endAt: "25.01.23",
    client: "서울대학교",
  },
  { id: 2, title: "Project 2", status: "active" },
  { id: 3, title: "Project 3", status: "active" },
];

export const CheckListData: Checklist[] = [
  {
    id: "1",
    step: "준비",
    checklistType: "기획",
    title: "프로젝트 범위 정의",
    author: "김철수",
    submittedAt: "2024-03-15",
    stepId: "step1",
  },
  {
    id: "22",
    step: "준비",
    checklistType: "기획",
    title: "aaaaaaaaa",
    author: "김철수",
    submittedAt: "2024-03-15",
    stepId: "step1",
  },
  {
    id: "333",
    step: "준비",
    checklistType: "기획",
    title: "bbbbbbb",
    author: "김철수",
    submittedAt: "2024-03-15",
    stepId: "step1",
  },
];
