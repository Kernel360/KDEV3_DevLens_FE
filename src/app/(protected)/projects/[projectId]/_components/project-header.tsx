"use client";

import { ConfirmDialog } from "@/components/composites/confirm-dialog";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProjectDetail,
  usePatchProjectCurrentStep,
  getGetProjectDetailQueryKey,
} from "@/lib/api/generated/main/services/project-api/project-api";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProjectHeader({
  projectId,
  authorization,
}: {
  projectId: number;
  authorization: "APPROVER" | "PARTICIPANT" | "ADMIN";
}) {
  const [selectedStepId, setSelectedStepId] = useState<number>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: projectDetail } = useGetProjectDetail(projectId);
  const queryClient = useQueryClient();

  const {
    projectName,
    projectDescription,
    projectTypeName,
    projectSteps = [],
    customerCompanyName,
    customerMemberAuthorizations,
    developerCompanyName,
    developerMemberAuthorizations,
    projectTags,
  } = projectDetail ?? {};

  const currentStep = projectSteps?.find(
    (step) => step.isCurrentStep,
  )?.stepName;

  const mutation = usePatchProjectCurrentStep({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetProjectDetailQueryKey(projectId),
        });
        toast.success("현재 프로젝트 단계가 변경되었습니다. ");
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onError: (error) => {
        toast.error("현재 프로젝트 단계 변경 중 오류가 발생했습니다. ");
      },
    },
  });

  const handleStepChange = (stepId: number) => {
    setSelectedStepId(stepId);
    setIsDialogOpen(true);
  };

  const handleConfirmChange = () => {
    const step = projectSteps.find((s) => s.stepId === selectedStepId);
    if (step) {
      mutation.mutate({ projectId, stepId: step.stepId! });
    }
    setIsDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: getGetProjectDetailQueryKey(projectId),
    });
  };

  return (
    <>
      <Card className="mx-auto mb-4 w-full">
        <Collapsible>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {projectTypeName}
                  </span>
                </div>
                <CollapsibleTrigger className="flex items-center gap-2">
                  <CardTitle className="text-md">{projectName}</CardTitle>
                  <ChevronsUpDown className="h-4 w-4 hover:bg-accent hover:text-accent-foreground" />
                </CollapsibleTrigger>
              </div>
              {/* <div className="flex gap-2 text-right">
              <div className="text-sm text-muted-foreground">Manager</div>
              <div className="font-medium">{bnsManager}</div>
            </div> */}
              {currentStep && authorization === "PARTICIPANT" && (
                <div className="border-1 w-fit min-w-32 rounded-full border border-primary">
                  <span>{currentStep}</span>
                </div>
              )}
              {authorization === "APPROVER" && (
                <Select
                  value={currentStep}
                  onValueChange={(value) => {
                    const step = projectSteps.find((s) => s.stepName === value);
                    if (step) {
                      handleStepChange(step.stepId!);
                    }
                  }}
                >
                  <div className="space-y-1">
                    <SelectTrigger className="border-1 w-fit min-w-32 rounded-full border border-primary">
                      <SelectValue placeholder={currentStep} />
                    </SelectTrigger>
                  </div>
                  <SelectContent>
                    {projectSteps?.map((step) => (
                      <SelectItem
                        key={step.stepId}
                        value={step.stepName ?? ""}
                        className="truncate"
                      >
                        {step.stepName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {(authorization === "PARTICIPANT" ||
                authorization === "ADMIN") && (
                <div className="flex flex-col items-center space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    현재 단계
                  </Label>
                  <Button
                    variant="outline"
                    className="cursor-default hover:bg-transparent"
                  >
                    <span>{currentStep}</span>
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="space-y-2">
              <p className="text-xs">{projectDescription}</p>
              <TooltipProvider delayDuration={100}>
                <div className="flex gap-8 text-xs">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-bold">고객사</span>
                      <span>
                        {customerCompanyName} (
                        {customerMemberAuthorizations?.length})
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {customerMemberAuthorizations?.map((member) => (
                        <p key={member.memberId}>
                          {member.memberName} {member.department}{" "}
                          {member.position}
                          {member.projectAuthorization === "APPROVER" && "*"}
                        </p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-bold">개발사</span>
                      <span>
                        {developerCompanyName} (
                        {developerMemberAuthorizations?.length})
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {developerMemberAuthorizations?.map((member) => (
                        <p key={member.memberId}>
                          {member.memberName} {member.department}{" "}
                          {member.position}
                          {member.projectAuthorization === "APPROVER" && " *"}
                        </p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex gap-2">
                {projectTags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="group-hover:bg-primary/5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="단계 변경 확인"
        description="현재 진행 단계를 변경하시겠습니까?"
        onConfirm={handleConfirmChange}
        confirmText="확인"
        cancelText="취소"
      />
    </>
  );
}
