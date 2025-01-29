"use client";

import { ProjectApi } from "@/lib/apis/main/projectApi";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import AddStepDialog from "./add-step-dialog";
import EditStepDialog from "./edit-step-dialog";
import IssueCard from "./issue-card";

export function KanbanBoard({ projectId }: { projectId: string }) {
  const { data } = useQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => ProjectApi.steps.getSteps(Number(projectId)),
    retry: 1,
  });

  const steps = data?.projectStepInfo ?? [];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step) => (
          <div key={step.stepId} className="w-[15rem] shrink-0">
            <Card className="group h-full border-none bg-zinc-50 px-3 shadow-none *:p-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  <Link
                    className="flex items-center"
                    href={`/projects/${projectId}/${step.stepId}`}
                  >
                    {step.stepName}
                    <ChevronRight className="text-zinc-700" />
                  </Link>
                  <EditStepDialog stepInfo={step} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {step.projectChecklist.map((issue) => (
                  <IssueCard key={issue.checklistId} issue={issue} />
                ))}
                <Button
                  variant="outline"
                  className="invisible flex h-4 w-full items-center justify-center bg-transparent opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                >
                  <Plus size={12} />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
        <AddStepDialog />
      </div>
    </div>
  );
}
