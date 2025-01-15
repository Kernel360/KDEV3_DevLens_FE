import { IssueList } from "@/types/issue-list";
import { Member } from "@/types/member";
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
    title: "전자서명 시스템 고도화",
    description: "블록체인 기반 전자서명 시스템 개선 및 신규 기능 개발",
    status: "active",
    startAt: "24.01.15",
    endAt: "24.06.30",
    client: "한국전자인증",
  },
  {
    id: 2,
    title: "클라우드 마이그레이션",
    description: "레거시 시스템의 AWS 클라우드 마이그레이션 및 인프라 최적화",
    status: "active",
    startAt: "24.03.01",
    endAt: "24.08.31",
    client: "SK텔레콤",
  },
  {
    id: 3,
    title: "모바일 뱅킹 앱 리뉴얼",
    description: "React Native 기반 모바일 뱅킹 애플리케이션 전면 개편",
    status: "active",
    startAt: "24.02.15",
    endAt: "24.07.31",
    client: "신한은행",
  },
  {
    id: 4,
    title: "AI 기반 고객센터 챗봇",
    description: "자연어 처리 기술을 활용한 고객 상담 자동화 시스템 구축",
    status: "active",
    startAt: "24.04.01",
    endAt: "24.09.30",
    client: "LG CNS",
  },
  {
    id: 5,
    title: "스마트팩토리 MES 구축",
    description: "제조 공정 모니터링 및 품질 관리 시스템 개발",
    status: "active",
    startAt: "24.03.15",
    endAt: "24.12.31",
    client: "현대자동차",
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

export const postListData: PostList[] = [
  {
    id: "1",
    index: "1",
    status: "진행중",
    title: "2024년 1분기 프로젝트 계획서 검토 요청",
    author: "김민서",
    createdAt: "2024-03-15",
    deadline: "2024-03-20",
  },
  {
    id: "2",
    index: "2",
    status: "대기",
    title: "신규 서비스 UI/UX 디자인 가이드라인 리뷰",
    author: "이서연",
    createdAt: "2024-03-14",
    deadline: "2024-03-25",
  },
  {
    id: "3",
    index: "3",
    status: "완료",
    title: "클라우드 마이그레이션 보안 검토 보고서",
    author: "최준호",
    createdAt: "2024-03-13",
    deadline: "2024-03-18",
  },
  {
    id: "4",
    index: "4",
    status: "진행중",
    title: "전자서명 시스템 성능 테스트 결과 공유",
    author: "정유진",
    createdAt: "2024-03-12",
    deadline: "2024-03-22",
  },
  {
    id: "5",
    index: "5",
    status: "지연",
    title: "모바일 앱 베타 테스트 피드백 정리",
    author: "한도윤",
    createdAt: "2024-03-10",
    deadline: "2024-03-15",
  },
  {
    id: "6",
    index: "6",
    status: "진행중",
    title: "AI 챗봇 학습 데이터 검증 요청",
    author: "박지훈",
    createdAt: "2024-03-14",
    deadline: "2024-03-24",
  },
  {
    id: "7",
    index: "7",
    status: "대기",
    title: "스마트팩토리 시스템 구축 견적 검토",
    author: "송승현",
    createdAt: "2024-03-13",
    deadline: "2024-03-23",
  },
  {
    id: "8",
    index: "8",
    status: "진행중",
    title: "개발 환경 보안 가이드라인 업데이트",
    author: "최준호",
    createdAt: "2024-03-15",
    deadline: "2024-03-21",
  },
  {
    id: "9",
    index: "9",
    status: "완료",
    title: "외부 API 연동 테스트 결과 보고",
    author: "이현준",
    createdAt: "2024-03-11",
    deadline: "2024-03-16",
  },
  {
    id: "10",
    index: "10",
    status: "대기",
    title: "2024년 2분기 인력 충원 계획 검토",
    author: "김민서",
    createdAt: "2024-03-15",
    deadline: "2024-03-25",
  }
];

export const testUsers = {
  admin: {
    loginId: "adminadmin",
    pwd: "admin1234",
    email: "admin@test.com",
    name: "관리자",
    role: "ADMIN",
  },
  super: {
    loginId: "supersuper",
    pwd: "super1234",
    email: "super@test.com",
    name: "슈퍼관리자",
    role: "SUPER",
  },
  user: {
    loginId: "useruser",
    pwd: "user1234",
    email: "user@test.com",
    name: "일반사용자",
    role: "USER",
  },
};

export const dummyMembers: Member[] = [
  {
    id: 1,
    loginId: "kimms",
    name: "김민서",
    email: "kimms@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-1234-5678",
    birthDate: "1985-03-15",
    departmentId: 1, // 경영지원팀
    positionId: 3, // 팀장
  },
  {
    id: 2,
    loginId: "parkjh",
    name: "박지훈",
    email: "parkjh@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-2345-6789",
    birthDate: "1988-07-22",
    departmentId: 2, // 기획팀
    positionId: 3, // 팀장
  },
  {
    id: 3,
    loginId: "leesy",
    name: "이서연",
    email: "leesy@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-3456-7890",
    birthDate: "1992-11-30",
    departmentId: 3, // 디자인팀
    positionId: 2, // 과장
  },
  {
    id: 4,
    loginId: "choijh",
    name: "최준호",
    email: "choijh@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "N",
    phoneNumber: "010-4567-8901",
    birthDate: "1991-05-18",
    departmentId: 4, // 개발팀
    positionId: 3, // 팀장
  },
  {
    id: 5,
    loginId: "hdy",
    name: "한도윤",
    email: "hdy@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-5678-9012",
    birthDate: "1993-09-25",
    departmentId: 4, // 개발팀
    positionId: 2, // 과장
  },
  {
    id: 6,
    loginId: "jungyj",
    name: "정유진",
    email: "jungyj@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "N",
    phoneNumber: "010-6789-0123",
    birthDate: "1994-12-08",
    departmentId: 5, // QA팀
    positionId: 2, // 과장
  },
  {
    id: 7,
    loginId: "songsh",
    name: "송승현",
    email: "songsh@example.com",
    role: "SUPER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-7890-1234",
    birthDate: "1980-01-10",
    departmentId: 1, // 경영지원팀
    positionId: 4, // 이사
  },
  {
    id: 8,
    loginId: "kimjw",
    name: "김지원",
    email: "kimjw@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-8901-2345",
    birthDate: "1995-06-20",
    departmentId: 2, // 기획팀
    positionId: 1, // 사원
  },
  {
    id: 9,
    loginId: "leehj",
    name: "이현준",
    email: "leehj@example.com",
    role: "USER",
    status: "INACTIVE",
    profileImageExists: "N",
    phoneNumber: "010-9012-3456",
    birthDate: "1990-08-15",
    departmentId: 4, // 개발팀
    positionId: 2, // 과장
  },
  {
    id: 10,
    loginId: "parksy",
    name: "박서연",
    email: "parksy@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-0123-4567",
    birthDate: "1996-04-12",
    departmentId: 3, // 디자인팀
    positionId: 1, // 사원
  },
  {
    id: 11,
    loginId: "choims",
    name: "최민수",
    email: "choims@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "N",
    phoneNumber: "010-1122-3344",
    birthDate: "1989-02-28",
    departmentId: 4, // 개발팀
    positionId: 1, // 사원
  },
  {
    id: 12,
    loginId: "kimyj",
    name: "김유진",
    email: "kimyj@example.com",
    role: "USER",
    status: "ACTIVE",
    profileImageExists: "Y",
    phoneNumber: "010-2233-4455",
    birthDate: "1997-10-05",
    departmentId: 5, // QA팀
    positionId: 1, // 사원
  },
];
