import SectionTitle from "@/components/section-title";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";
import { CheckListData } from "@/lib/mockData";
import { Info } from "lucide-react";
import DataTable from "../../../components/data-table";
import { checkListColumns } from "./_components/checklist-columns";
import { KanbanBoard } from "./_components/kanban-board";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;


  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        <Collapsible>
          <div className="flex">
            <SectionTitle>{`${projectId} 프로젝트`}</SectionTitle>
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
        <div className="overflow-hidden">
          <KanbanBoard projectId={projectId} />
        </div>
        <SectionTitle>승인 요청 목록</SectionTitle>
        <DataTable columns={checkListColumns} data={CheckListData} />
      </div>
    </>
  );
}
