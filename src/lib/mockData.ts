import { IssueList } from "@/types/issue-list";
import { PostList } from "@/types/post";
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

export const IssueListData: IssueList[] = [
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

export const projectSteps = [
  { id: "step1", title: "기획" },
  { id: "step2", title: "디자인" },
  { id: "step3", title: "개발" },
  { id: "step4", title: "QA" },
];

export const postListData: PostList[] = [
  {
    id: "1",
    index: "1",
    status: "진행중",
    title: "2024년 1분기 프로젝트 계획서 검토 요청",
    author: "김철수",
    createdAt: "2024-03-15",
    deadline: "2024-03-20",
  },
  {
    id: "2",
    index: "2",
    status: "대기",
    title: "신규 서비스 UI/UX 디자인 가이드라인 리뷰",
    author: "이영희",
    createdAt: "2024-03-14",
    deadline: "2024-03-25",
  },
];
