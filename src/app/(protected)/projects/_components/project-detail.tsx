"use client";

import {
  useReadProject,
  useUpdateProject,
} from "@/lib/api/generated/admin/services/administrator-project-management-api/administrator-project-management-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import {
  updateProjectSchema,
  type UpdateProjectFormData,
} from "@/schemas/project";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Badge,
  CardContent,
  CardHeader,
  Card,
  CardTitle,
} from "@ui";
import DatePickerInput from "@/components/composites/date-picker-input";
import { PROJECT_STATUS, PROJECT_TYPES } from "@/lib/constants/selects";
import { X } from "lucide-react";
import { MemberAssignment } from "../create/_components/member-assignment";
import { SUGGESTED_PROJECT_TAGS } from "../create/_components/project-form";
import { useEffect, useState } from "react";
import { useMemberStore } from "@/store/useMemberAssignStore";
import { GetProjectResponse } from "@/lib/api/generated/admin/models";

type RequiredProject = Required<GetProjectResponse>;

export default function ProjectDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get("id"));

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useReadProject(projectId, {
    query: {
      enabled: !!projectId,
      staleTime: 1000 * 60 * 5, // 5분
      // cacheTime: 1000 * 60 * 30, // 30분
    },
  });

  const updateProjectMutation = useUpdateProject();

  const form = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectTypeId: 1,
      projectTypeName: "",
      projectStatusCode: "PREPARED",
      bnsManager: "",
      plannedStartDate: "",
      plannedEndDate: "",
      startDate: "",
      endDate: "",
      projectTags: [],
      customerCompanyId: 0,
      developerCompanyId: 0,
      customerCompanyName: "",
      developerCompanyName: "",
      contractNumber: "",
      finalApprover: "",
      finalApprovalDate: null,
    },
  });

  const store = useMemberStore();

  useEffect(() => {
    if (project) {
      form.reset({
        projectName: project.projectName ?? "",
        customerCompanyId: project.customerCompanyId ?? 0,
        developerCompanyId: project.developerCompanyId ?? 0,
        customerCompanyName: project.customerCompanyName ?? "",
        developerCompanyName: project.developerCompanyName ?? "",
        projectDescription: project.projectDescription ?? "",
        projectTypeId: Number(project.project?.projectType) ?? 1,
        projectTypeName: project.projectTypeName ?? "",
        projectStatusCode: project.projectStatusCode || "PREPARED",
        bnsManager: project.bnsManager ?? "",
        contractNumber: project.contractNumber ?? "",
        plannedStartDate: project.plannedStartDate ?? "",
        plannedEndDate: project.plannedEndDate ?? "",
        startDate: project.startDate ?? "",
        endDate: project.endDate ?? "",
        finalApprover: project.finalApprover ?? "",
        finalApprovalDate: project.finalApprovalDate ?? null,
        projectTags: project.projectTags || [],
      });
    }
  }, [project, form]);

  useEffect(() => {
    if (!project || isLoading) return;

    // 초기화
    store.reset("customer");
    store.reset("developer");

    // 고객사 멤버 초기화
    project.customerMemberAuthorizations?.forEach((member) => {
      if (member.memberId && member.memberName) {
        const role =
          member.projectAuthorization === "APPROVER" ? "APPROVER" : "NORMAL";
        store.selectMember(
          "customer",
          {
            memberId: member.memberId,
            memberName: member.memberName,
          },
          role,
        );
      }
    });

    // 개발사 멤버 초기화
    project.developerMemberAuthorizations?.forEach((member) => {
      if (member.memberId && member.memberName) {
        const role =
          member.projectAuthorization === "APPROVER" ? "APPROVER" : "NORMAL";
        store.selectMember(
          "developer",
          {
            memberId: member.memberId,
            memberName: member.memberName,
          },
          role,
        );
      }
    });

    console.log("Store after:", {
      customer: store.customer,
      developer: store.developer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  const onSubmit = async (data: UpdateProjectFormData) => {
    console.log("Submit attempted with data:", data);
    try {
      await updateProjectMutation.mutateAsync({
        id: projectId,
        data: {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          projectTypeId: data.projectTypeId,
          projectStatusCode: data.projectStatusCode,
          bnsManager: data.bnsManager,
          plannedStartDate: data.plannedStartDate,
          plannedEndDate: data.plannedEndDate,
          startDate: data.startDate,
          endDate: data.endDate,
          projectTags: data.projectTags,
          // customerCompanyId: data.customerCompanyId,
          // developerCompanyId: data.developerCompanyId,
        },
      });

      
      toast.success("프로젝트 정보가 수정되었습니다");
      setIsEditing(false);
      
    } catch (error) {
      console.error("Mutation error:", error);
      toast.error(`프로젝트 수정 중 오류가 발생했습니다. ${error}`);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: </div>;
  }

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {isEditing ? "프로젝트 수정" : "프로젝트 상세"}
        </h2>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "취소" : "수정"}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            console.log("Form submission triggered");
            form.handleSubmit(onSubmit)(e);
          }}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트명</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectStatusCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트 상태</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                        <SelectValue placeholder="프로젝트 상태를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(PROJECT_STATUS).map(([code, label]) => (
                        <SelectItem key={code} value={code}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerCompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>고객사</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="developerCompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>개발사</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contractNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>계약번호</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트 유형</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                        <SelectValue placeholder="프로젝트 유형을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plannedStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>계획 시작일</FormLabel>
                  <DatePickerInput
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                    disabled={!isEditing}
                    // className={!isEditing ? "bg-muted" : ""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plannedEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>계획 종료일</FormLabel>
                  <DatePickerInput
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                    disabled={!isEditing}
                    // className={!isEditing ? "bg-muted" : ""}
                    minDate={
                      form.watch("plannedStartDate")
                        ? new Date(form.watch("plannedStartDate"))
                        : undefined
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bnsManager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시스템 담당자</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 설명</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={!isEditing}
                    className={`h-32 ${!isEditing ? "bg-muted" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 태그</FormLabel>
                <FormControl>
                  <div className="w-full space-y-4">
                    <div className="flex w-full flex-wrap gap-2">
                      {field.value?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          {isEditing && (
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => {
                                const newTags = [...(field.value ?? [])];
                                newTags.splice(index, 1);
                                field.onChange(newTags);
                              }}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_PROJECT_TAGS.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="shrink-0 cursor-pointer hover:bg-secondary"
                            onClick={() => {
                              if (!field.value?.includes(tag)) {
                                field.onChange([...(field.value ?? []), tag]);
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Input
                          placeholder="직접 입력: 태그를 입력하고 Enter를 누르세요"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const value = e.currentTarget.value.trim();
                              if (value && !field.value?.includes(value)) {
                                field.onChange([...(field.value ?? []), value]);
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing ? (
            <MemberAssignment
              customerId={form.watch("customerCompanyId")}
              developerId={form.watch("developerCompanyId")}
            />
          ) : (
            <div className="space-y-4">
              <FormLabel>참여 멤버</FormLabel>
              <Card>
                <CardHeader>
                  <CardTitle>고객사</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        승인권자
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.customerMemberAuthorizations
                          ?.filter(
                            (member) =>
                              member.projectAuthorization === "APPROVER",
                          )
                          .map((member) => (
                            <Badge key={member.memberId} variant="secondary">
                              {member.memberName}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        일반참여멤버
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.customerMemberAuthorizations
                          ?.filter(
                            (member) =>
                              member.projectAuthorization === "MEMBER",
                          )
                          .map((member) => (
                            <Badge key={member.memberId} variant="secondary">
                              {member.memberName}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>개발사</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        승인권자
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.developerMemberAuthorizations
                          ?.filter(
                            (member) =>
                              member.projectAuthorization === "APPROVER",
                          )
                          .map((member) => (
                            <Badge key={member.memberId} variant="secondary">
                              {member.memberName}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        일반참여멤버
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.developerMemberAuthorizations
                          ?.filter(
                            (member) =>
                              member.projectAuthorization === "MEMBER",
                          )
                          .map((member) => (
                            <Badge key={member.memberId} variant="secondary">
                              {member.memberName}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {isEditing && (
            <Button type="submit" className="w-full">
              프로젝트 정보 수정
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
