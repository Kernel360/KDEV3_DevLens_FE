"use client";

import { ScrollableTabs } from "@/components/composites/scrollable-tabs";
import SectionTitle from "@/components/composites/section-title";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { KanbanBoardSkeleton } from "@/components/skeleton/kanban-skeleton";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui";
import { getProjectStepAndChecklist } from "@/lib/api/generated/main/services/project-step-api/project-step-api";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import { Suspense, useEffect, useMemo } from "react";
import { KanbanBoard } from "./kanban-board";
import PostListTable from "./post-list-table";
import { CreatePost } from "./post/create-post";

export default function ProjectDetailContent({
  projectId,
  currentStepId,
}: {
  projectId: number;
  currentStepId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNew, setNewPost] = useQueryState("new", parseAsBoolean);

  const { data } = useQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => getProjectStepAndChecklist(projectId),
    staleTime: 5 * 60 * 1000,
  });

  const steps = useMemo(
    () => data?.projectStepInfo ?? [],
    [data?.projectStepInfo],
  );

  // 첫 진입 시 또는 step이 없을 때 첫 번째 step으로 리다이렉트
  useEffect(() => {
    if (steps.length > 0 && !currentStepId) {
      router.replace(`${pathname}?step=${steps[0].stepId}`);
    }
  }, [steps, currentStepId, pathname, router]);

  // steps가 없거나 로딩 중일 때는 렌더링하지 않음
  if (steps.length === 0) return null;

  if (isNew) {
    return (
      <CreatePost
        projectId={projectId}
        stepId={Number(currentStepId)}
        steps={steps}
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* <SectionTitle>진행 단계</SectionTitle> */}
      <div className="mb-4 overflow-hidden">
        <ErrorBoundary>
          <Suspense fallback={<KanbanBoardSkeleton />}>
            <KanbanBoard projectId={projectId} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 게시판 영역 */}
      <SectionTitle>게시판</SectionTitle>
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <ScrollableTabs
            value={currentStepId || String(steps[0].stepId)}
            items={steps.map((step) => ({
              value: String(step.stepId),
              label: step.stepName || "",
            }))}
            onValueChange={(value) => {
              router.replace(`${pathname}?step=${value}`, { scroll: false });
            }}
          />
        </div>
        <Button
          onClick={() => {
            setNewPost(true, { scroll: false, history: "push" });
          }}
          className="flex-none"
        >
          <Plus className="mr-2 h-4 w-4" />새 게시물
        </Button>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <PostListTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
