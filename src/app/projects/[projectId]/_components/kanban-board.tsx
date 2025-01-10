import { EllipsisVertical, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../components/ui/card";
import { Button } from "@ui";
import Link from "next/link";
import { CheckListData, projectSteps } from "@/lib/mockData";

export function KanbanBoard({ projectId }: { projectId: string }) {
  const steps = projectSteps;
  const tasks = CheckListData;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step) => (
          <div key={step.id} className="w-60 shrink-0">
            <Card className="h-full border-none bg-slate-50 px-3 shadow-none *:p-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  <Link href={`/projects/${projectId}/${step.id}`}>
                    {step.title}
                  </Link>
                  <Button variant="ghost" size="icon">
                    {/* TODO: step info/edit 드롭다운 or 팝오버 */}
                    <EllipsisVertical />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasks
                  .filter((task) => task.stepId === step.id)
                  .map((task) => (
                    <Card key={task.id} className="cursor-pointer p-2">
                      <h3 className="font-medium">{task.title}</h3>
                      {/* <p className="text-xs text-muted-foreground">
                        {task.description}
                      </p> */}
                    </Card>
                  ))}
                <Button
                  variant="outline"
                  className="flex h-4 w-full items-center justify-center bg-transparent"
                >
                  <Plus size={12} />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="w-20 shrink-0">
          <Button
            variant="outline"
            size="icon"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
