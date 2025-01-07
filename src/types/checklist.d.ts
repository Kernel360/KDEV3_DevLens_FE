export type Checklist = {
  id: string;
  step: "준비" | "진행중" | "검토" | "완료";
  checklistType: "기획" | "디자인" | "개발" | "테스트" | "배포";
  title: string;
  author: string;
  submittedAt: string;
  stepId: string;
};
