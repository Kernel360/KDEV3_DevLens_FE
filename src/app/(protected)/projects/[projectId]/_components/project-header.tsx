"use client";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  Select,
  // SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProjectDetail } from "@/lib/api/generated/main/services/project-api/project-api";
import { ChevronsUpDown } from "lucide-react";

export default function ProjectHeader({ projectId }: { projectId: number }) {
  const { data: projectDetail } = useGetProjectDetail(projectId);

  const {
    projectName,
    projectDescription,
    projectTypeName,
    currentStep,
    customerMemberAuthorizations,
    developerMemberAuthorizations,
    projectTags,
  } = projectDetail ?? {};

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
              <Select>
                <SelectTrigger className="border-1 w-fit min-w-32 rounded-full border border-primary">
                  {/* 현재 프로젝트 단계 동적으로 받아오기 */}
                  <SelectValue placeholder={currentStep} />
                </SelectTrigger>
                {/* <SelectContent>
                  {projectStep?.map((step) => (
                    <SelectItem
                      key={step.stepId}
                      value={step.stepName ?? ""}
                      className="truncate"
                    >
                      {step.stepName}
                    </SelectItem>
                  ))}
                </SelectContent> */}
              </Select>
            </div>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="space-y-2">
              <p className="text-xs">{projectDescription}</p>
              <TooltipProvider delayDuration={100}>
                <div className="flex gap-8 text-xs">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-bold">
                        고객사({customerMemberAuthorizations?.length})
                      </span>
                      {/* <span>카카오(3)</span> */}
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
                      <span className="font-bold">
                        개발사({developerMemberAuthorizations?.length})
                      </span>
                      {/* <span>데브렌즈(5)</span> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      {developerMemberAuthorizations?.map((member) => (
                        <p key={member.memberId}>
                          {member.memberName} {member.department}{" "}
                          {member.position}
                          {member.projectAuthorization === "APPROVER" && "*"}
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
    </>
  );
}
