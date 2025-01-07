import { EllipsisVertical, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../components/ui/card";
import { Button } from "@ui";
import Link from "next/link";
import { CheckListData } from "@/lib/mockData";


export function KanbanBoard({ projectId }: { projectId: string }) {
  const steps = [
    { id: "step1", title: "기획" },
    { id: "step2", title: "디자인" },
    { id: "step3", title: "개발" },
    { id: "step4", title: "QA" },
  ];

  const tasks = CheckListData;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step) => (
          <div key={step.id} className="w-60 shrink-0">
            <Card className="h-full border-none bg-slate-50 px-3 shadow-none *:p-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  {step.title}
                  <Link href={`/projects/${projectId}/${step.id}`}>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </Link>
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
            className="flex h-80 items-center justify-center"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
