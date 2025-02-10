import Header from "@/components/layout/Header";
import { getProjectStepAndChecklist } from "@/lib/api/generated/main/services/project-step-api/project-step-api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectDetailContent from "./_components/project-detail-content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ step: string }>;
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: PageProps) {
  const queryClient = new QueryClient();
  const projectId = Number((await params).projectId);
  const stepParam = (await searchParams).step;

  // 서버에서 데이터 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => getProjectStepAndChecklist(projectId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "내 프로젝트", href: "/dashboard" },
          // TODO: 프로젝트 이름 동적으로 받아오기
          { label: "프로젝트 이름" },
        ]}
      />
      <HydrationBoundary state={dehydratedState}>
        <ProjectDetailContent projectId={projectId} currentStepId={stepParam} />
      </HydrationBoundary>
      {/* <div className="flex h-full flex-col overflow-hidden">
        <SectionTitle>진행 단계</SectionTitle>
        <div className="mb-4 overflow-hidden">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <KanbanBoard projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <SectionTitle>게시판</SectionTitle>
      </div> */}
    </>
  );
}
