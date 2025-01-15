import PostTableWithSheet from "@/components/composites/post-table-with-sheet";
import SectionTitle from "@/components/composites/section-title";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";
import { postListData } from "@/lib/mockData";
import { Info } from "lucide-react";
import { postListColumns } from "./[stepId]/post-list-columns";
import { KanbanBoard } from "./_components/kanban-board";
import Header from "@/components/layout/Header";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

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
        <Collapsible>
          <div className="flex">
            <SectionTitle>이슈</SectionTitle>

            <CollapsibleTrigger className="flex items-center">
              <Info className="mb-4 ml-4" />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>프로젝트 개요</CardTitle>
              </CardHeader>
              <CardContent>
                프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트
                설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트
                설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        <div className="mb-4 overflow-hidden">
          <KanbanBoard projectId={projectId} />
        </div>
        <SectionTitle>전체 게시물</SectionTitle>
        {/* 스텝 column 추가 */}
        <PostTableWithSheet columns={postListColumns} data={postListData} />
      </div>
    </>
  );
}
