import { IssueList } from "@/types/issue-list";
import { Post } from "@/types/post";
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
    projectName: "전자서명 시스템 고도화",
    projectDescription: "블록체인 기반 전자서명 시스템 개선 및 신규 기능 개발",
    projectStatusCode: "IN_PROGRESS",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    customerName: "한국전자인증",
    developerName: "한도윤",
    bnsManagerName: "김민서",
    contractNumber: "2024-KEC-0115",
    plannedStartDate: "2024-01-15",
    plannedEndDate: "2024-06-30",
    finalApprover: "송승현",
    finalApprovalDate: "2023-12-20",
    projectTypeName: "",
  },
  {
    id: 2,
    projectName: "전자서명 시스템 고도화",
    projectDescription: "블록체인 기반 전자서명 시스템 개선 및 신규 기능 개발",
    projectStatusCode: "IN_PROGRESS",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    customerName: "한국전자인증",
    developerName: "한도윤",
    bnsManagerName: "김민서",
    contractNumber: "2024-KEC-0115",
    plannedStartDate: "2024-01-15",
    plannedEndDate: "2024-06-30",
    finalApprover: "송승현",
    finalApprovalDate: "2023-12-20",
    projectTypeName: "",
  },
];

export const IssueListData: IssueList[] = [
  {
    id: "1",
    step: "기획",
    checklistType: "요구사항 분석",
    title: "클라이언트 요구사항 명세서",
    author: "김민서",
    submittedAt: "2024-03-15",
    stepId: "step1",
  },
  {
    id: "2",
    step: "기획",
    checklistType: "일정 계획",
    title: "프로젝트 마일스톤 및 WBS 수립",
    author: "박지훈",
    submittedAt: "2024-03-16",
    stepId: "step1",
  },
  {
    id: "3",
    step: "기획",
    checklistType: "리스크 분석",
    title: "프로젝트 위험요소 식별",
    author: "김민서",
    submittedAt: "2024-03-16",
    stepId: "step1",
  },
  {
    id: "4",
    step: "디자인",
    checklistType: "UI설계",
    title: "메인 대시보드 와이어프레임",
    author: "이서연",
    submittedAt: "2024-03-17",
    stepId: "step2",
  },
  {
    id: "5",
    step: "디자인",
    checklistType: "프로토타입",
    title: "사용자 플로우 프로토타입",
    author: "이서연",
    submittedAt: "2024-03-18",
    stepId: "step2",
  },
  {
    id: "6",
    step: "개발",
    checklistType: "백엔드",
    title: "API 엔드포인트 설계 및 문서화",
    author: "최준호",
    submittedAt: "2024-03-19",
    stepId: "step3",
  },
  {
    id: "7",
    step: "개발",
    checklistType: "프론트엔드",
    title: "상태관리 아키텍처 구현",
    author: "한도윤",
    submittedAt: "2024-03-19",
    stepId: "step3",
  },
  {
    id: "8",
    step: "개발",
    checklistType: "인프라",
    title: "CI/CD 파이프라인 구성",
    author: "최준호",
    submittedAt: "2024-03-20",
    stepId: "step3",
  },
];

export const projectSteps = [
  { id: "step1", title: "기획" },
  { id: "step2", title: "디자인" },
  { id: "step3", title: "개발" },
  { id: "step4", title: "QA" },
];

export const postListData: Post[] = [
  {
    id: 1,
    projectStepId: 1,
    title: "2024년 1분기 프로젝트 계획서 검토 요청",
    content: "1분기 프로젝트 계획서 초안을 작성했습니다. 검토 부탁드립니다.",
    authorId: 1,
    authorName: "김민서",
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    deadline: "2024-03-20T18:00:00Z",
    attachments: [
      {
        id: 1,
        fileName: "2024_Q1_계획서_v1.pdf",
        fileSize: 1024576,
        fileType: "application/pdf",
        downloadUrl: "/api/files/1",
      },
    ],
  },
  {
    id: 2,
    projectStepId: 2,
    title: "신규 서비스 UI/UX 디자인 가이드라인 리뷰",
    content: "디자인 시스템 가이드라인 초안입니다. 피드백 부탁드립니다.",
    authorId: 3,
    authorName: "이서연",
    createdAt: "2024-03-14T11:30:00Z",
    updatedAt: "2024-03-14T15:45:00Z",
    deadline: "2024-03-25T18:00:00Z",
    attachments: [
      {
        id: 2,
        fileName: "디자인_가이드라인_v2.fig",
        fileSize: 5242880,
        fileType: "application/figma",
        downloadUrl: "/api/files/2",
      },
    ],
  },
];
