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
import { useGetChecklistApplication } from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";
import { format } from "date-fns";

interface ChecklistDetailProps {
  checklistId: number;
}

export default function ChecklistDetail({ checklistId }: ChecklistDetailProps) {
  const { data } = useGetChecklistApplication(checklistId);
  const applications = data?.data?.applications;
  // const applications = [
  //   {
  //     applicationId: 1,
  //     checklistTitle: "시스템 점검 체크리스트",
  //     applicationTitle: "프로젝트 일정 개요",
  //     applicationContent: "2월 정기 시스템 점검 수행 결과입니다.",
  //     processStatus: "REJECTED",
  //     proposer: "김철수",
  //     applicationDate: "2025-02-13T09:00:00.000Z",
  //     applicationResult: {
  //       rejectReason: "",
  //       processor: "이관리",
  //     },
  //   },

  //   {
  //     applicationId: 3,
  //     checklistTitle: "품질 관리 체크리스트",
  //     applicationTitle: "2차 일정 확정안",
  //     applicationContent: "QA 관련 일정 추가된 계획입니다.",
  //     processStatus: "PENDING",
  //     proposer: "정민호",
  //     applicationDate: "2025-02-13T11:00:00.000Z",
  //   },
  // ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500">승인</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">반려</Badge>;
      case "PENDING":
        return <Badge variant="secondary">대기중</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "yyyy.MM.dd HH:mm");
  };

  // TODO: Sort applications by date (newest first)

  return (
    <ScrollArea className="pr-4">
      {!applications?.length ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">
            요청 목록이 없습니다
          </p>
          <Button variant="outline">요청 생성</Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {applications.map((app) => (
            <AccordionItem
              key={app.applicationId}
              value={app.applicationId!.toString()}
              className="rounded-lg border p-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex w-full flex-col items-start gap-2 text-left sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{app.applicationTitle}</h3>
                    {/* <p className="text-sm text-muted-foreground">
                      {app.checklistTitle}
                    </p> */}
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(app.processStatus!)}
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(app.applicationDate!)}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">요청자</span>
                      <span>{app.proposer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">요청 내용</span>
                      <span>{app.applicationContent}</span>
                    </div>
                  </div>
                  {app.applicationResult ? (
                    <div className="mt-4 space-y-2 border-t pt-4">
                      <h4 className="font-medium">처리 결과</h4>
                      <div className="grid gap-2">
                        {app.applicationResult.processor && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              처리자
                            </span>
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
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Separator />
                      <div className="flex justify-end gap-2">
                        <Button variant="destructive" type="submit">
                          반려
                        </Button>
                        <Button type="submit">승인</Button>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </ScrollArea>
  );
}
