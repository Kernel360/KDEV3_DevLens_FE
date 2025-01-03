import { KanbanBoard } from "@/components/kanban-board";
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
import { Info } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const { projectId } = params;

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
        <div className="flex-1 overflow-hidden">
          <KanbanBoard />
        </div>
        
      </div>
    </>
  );
}
