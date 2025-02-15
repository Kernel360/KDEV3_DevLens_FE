import { getProjectStepAndChecklist } from "@/lib/api/generated/main/services/project-step-api/project-step-api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectDetailContent from "./_components/project-detail-content";
import ProjectHeader from "./_components/project-header";

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

  // 서버에서 단계 데이터 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => getProjectStepAndChecklist(projectId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <ProjectHeader projectId={projectId} />
      <HydrationBoundary state={dehydratedState}>
        <ProjectDetailContent projectId={projectId} currentStepId={stepParam} />
      </HydrationBoundary>
    </>
  );
}
