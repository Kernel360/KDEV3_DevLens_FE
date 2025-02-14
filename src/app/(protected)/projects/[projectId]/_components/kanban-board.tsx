"use client";

import { ProjectApi } from "@/lib/apis/main/projectApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AddStepDialog from "./add-step-dialog";
import CreateChecklistDialog from "./create-checklist-dialog";
import EditStepDialog from "./edit-step-dialog";
import IssueCard from "./issue-card";

export function KanbanBoard({ projectId }: { projectId: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data } = useSuspenseQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => ProjectApi.steps.getSteps(Number(projectId)),
  });

  const steps = data?.projectStepInfo ?? [];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">진행단계</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-2"
        >
          {isExpanded ? (
            <>
              체크리스트 닫기
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              체크리스트 열기
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "h-auto opacity-100" : "h-16 opacity-90"
        }`}
      >
        <div
          className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${isExpanded ? "" : "hidden"}`}
        >
          {[...steps]
            .sort((a, b) => a.stepOrder - b.stepOrder)
            .map((step) => (
              <div key={step.stepId} className="w-[15rem] shrink-0">
                <Card className="group h-full border-none bg-muted px-3 shadow-none [&>*]:p-2">
                  <CardHeader className="!pb-0">
                    <CardTitle
                      className="flex h-[2.25rem] cursor-pointer items-center justify-between text-sm hover:text-primary"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {step.stepName}
                      <EditStepDialog stepInfo={step} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[40dvh] space-y-2 overflow-y-auto !pt-0 scrollbar-hide">
                    <CreateChecklistDialog stepId={step.stepId} />
                    {step.projectChecklist.map((issue) => (
                      <IssueCard key={issue.checklistId} issue={issue} />
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          {steps.length < 10 && (
            <AddStepDialog nextStepOrder={steps.length + 1} />
          )}
        </div>

        {/* Collapsed View */}
        <div
          className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${isExpanded ? "hidden" : ""}`}
        >
          {[...steps]
            .sort((a, b) => a.stepOrder - b.stepOrder)
            .map((step) => (
              <div key={step.stepId} className="w-auto shrink-0">
                <Card className="w-[15rem] border-none bg-muted px-3 shadow-none">
                  <CardHeader className="p-2">
                    <CardTitle
                      className="flex h-[2.25rem] cursor-pointer items-center justify-between gap-2 text-sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <span>{step.stepName}</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-background text-xs">
                        {step.projectChecklist.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
