import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import { KanbanBoard } from "./_components/kanban-board";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { Suspense } from "react";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  console.log("projectId", projectId);

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "내 프로젝트", href: "/projects" },
          // TODO: 프로젝트 이름 동적으로 받아오기
          { label: "프로젝트 이름" },
        ]}
      />
      <div className="flex h-full flex-col overflow-hidden">
      <SectionTitle>이슈</SectionTitle>
        <div className="mb-4 overflow-hidden">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <KanbanBoard projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <SectionTitle>전체 게시물</SectionTitle>
        {/* 스텝 column 추가 */}
        {/* <TableWithSheet columns={postListColumns} data={postListData} /> */}
      </div>
    </>
  );
}
