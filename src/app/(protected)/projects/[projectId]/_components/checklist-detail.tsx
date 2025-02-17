"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  ScrollArea,
  Separator,
} from "@/components/ui";
import {
  useGetChecklistApplication,
  usePostProjectChecklistReject,
  usePostProjectChecklistAccept,
} from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";
import { format } from "date-fns";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { getGetChecklistApplicationQueryKey } from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";
import { useParams } from "next/navigation";


const getStatusBadge = (status: string) => {
  switch (status) {
    case "승인":
      return <Badge variant="success">승인</Badge>;
    case "반려":
      return <Badge variant="destructive">반려</Badge>;
    case "승인대기":
      return <Badge variant="secondary">대기중</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function ChecklistDetail({
  checklistId,
}: {
  checklistId: number;
}) {
  const queryClient = useQueryClient();
  const params = useParams();
  const projectId = Number(params.projectId);
  const { data } = useGetChecklistApplication(projectId, checklistId) as {
    // TODO: orval + axios 세팅 재확인
    data: {
      applications: {
        applicationId?: number;
        checklistTitle?: string;
        applicationTitle?: string;
        applicationContent?: string;
        processStatus?: string;
        proposer?: string;
        applicationDate?: string;
        applicationResult?: {
          rejectReason?: string;
          processor?: string;
          processDate?: string;
        };
      }[];
    };
  };
  let applications = data?.applications;
  applications = applications?.sort((a, b) => {
    const dateA = new Date(a.applicationDate!).getTime();
    const dateB = new Date(b.applicationDate!).getTime();
    return dateB - dateA;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "yy년 MM월 dd일 HH:mm");
  };

  const [rejectReason, setRejectReason] = useState<string>("");
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);

  const rejectMutation = usePostProjectChecklistReject({
    mutation: {
      onSuccess: () => {
        setSelectedApplicationId(null);
        setRejectReason("");
        queryClient.invalidateQueries({
          queryKey: getGetChecklistApplicationQueryKey(projectId, checklistId),
        });
      },
    },
  });

  const acceptMutation = usePostProjectChecklistAccept({
    mutation: {
      onSuccess: () => {
        setSelectedApplicationId(null);
        queryClient.invalidateQueries({
          queryKey: getGetChecklistApplicationQueryKey(projectId, checklistId),
        });
      },
    },
  });

  const handleReject = (applicationId: number) => {
    setSelectedApplicationId(applicationId);
  };

  const handleRejectSubmit = () => {
    if (selectedApplicationId) {
      rejectMutation.mutate({
        projectId,
        applicationId: selectedApplicationId,
        data: { rejectReason },
      });
    }
  };

  const handleAccept = (applicationId: number) => {
    acceptMutation.mutate({
      projectId,
      applicationId,
    });
  };

  if (!applications?.length) {
    return (
      <ScrollArea className="">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">요청 목록이 없습니다</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="">
      <p className="mb-2 text-sm text-muted-foreground">
        전체 {applications.length}건
      </p>
      <Accordion
        type="single"
        collapsible
        className="space-y-4"
        defaultValue={applications[0].applicationId!.toString()}
      >
        {applications.map((app) => (
          <AccordionItem
            key={app.applicationId}
            value={app.applicationId!.toString()}
            className="rounded-lg border p-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex w-full flex-row items-center gap-2 text-left">
                <div className="flex-1 gap-2 truncate">
                  <p className="mb-2 whitespace-nowrap text-xs text-muted-foreground">
                    {formatDate(app.applicationDate!)}
                  </p>
                  <h3 className="font-semibold">{app.applicationTitle}</h3>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(app.processStatus!)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-[4rem_1fr] gap-2 text-sm">
                  <span className="font-medium text-muted-foreground">
                    요청자
                  </span>
                  <span>{app.proposer}</span>
                  <span className="font-medium text-muted-foreground">
                    요청 내용
                  </span>
                  <span>{app.applicationContent}</span>
                </div>
                {app.applicationResult && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <h4 className="font-medium">처리 결과</h4>
                    <div className="grid gap-2">
                      {app.applicationResult.processor && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">처리자</span>
                          <span>{app.applicationResult.processor}</span>
                        </div>
                      )}
                      {app.applicationResult.processDate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            처리일시
                          </span>
                          <span>
                            {formatDate(app.applicationResult.processDate)}
                          </span>
                        </div>
                      )}
                      {app.applicationResult.rejectReason && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            반려사유
                          </span>
                          <span>{app.applicationResult.rejectReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {!app.applicationResult && (
                  <div className="flex flex-col space-y-2">
                    <Separator />
                    {selectedApplicationId !== app.applicationId ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => handleReject(app.applicationId!)}
                        >
                          반려
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button type="button">승인</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>승인 확인</DialogTitle>
                            <DialogDescription>
                              이 신청을 승인하시겠습니까?
                            </DialogDescription>
                            <DialogFooter>
                              <Button
                                variant="destructive"
                                onClick={() => handleAccept(app.applicationId!)}
                              >
                                승인
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="반려 사유를 입력하세요"
                          value={rejectReason}
                          className="ml-1"
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={() => setSelectedApplicationId(null)}
                        >
                          취소
                        </Button>
                        <Button onClick={handleRejectSubmit}>제출</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}
