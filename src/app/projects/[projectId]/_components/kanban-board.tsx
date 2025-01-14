"use client";

import { CheckListData, projectSteps } from "@/lib/mockData";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import AddStepDialog from "./add-step-dialog";
import { EditStepDialog } from "./edit-step-dialog";
import IssueCard from "./issue-card";

export function KanbanBoard({ projectId }: { projectId: string }) {
  const steps = projectSteps;
  const issues = CheckListData;

  const handleStepUpdate = (updatedStep: (typeof steps)[0]) => {
    // TODO: 업데이트 로직 구현
    console.log("Updated step:", updatedStep);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step) => (
          <div key={step.id} className="w-[15rem] shrink-0">
            <Card className="h-full border-none bg-zinc-50 px-3 shadow-none *:p-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  <Link
                    className="flex items-center"
                    href={`/projects/${projectId}/${step.id}`}
                  >
                    {step.title}
                    <ChevronRight className="text-zinc-700" />
                  </Link>
                  <EditStepDialog stepInfo={step} onUpdate={handleStepUpdate} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {issues
                  .filter((issue) => issue.stepId === step.id)
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
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
        <AddStepDialog />
      </div>
    </div>
  );
}
