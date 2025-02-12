"use client";

import { CompanySelect } from "@/components/composites/company-select";
import DatePickerInput from "@/components/composites/date-picker-input";
import { useNewProject } from "@/lib/api/generated/admin/services/administrator-project-management-api/administrator-project-management-api";
import { usePostProjectAuthorization } from "@/lib/api/generated/main/services/project-authorization-controller/project-authorization-controller";
import { PROJECT_TYPES } from "@/lib/constants/selects";
import { createProjectSchema, type ProjectFormData } from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemberStore } from "@/store/useMemberAssignStore";
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X } from "lucide-react";
import { MemberAssignment } from "./member-assignment";

export const SUGGESTED_PROJECT_TAGS = [
  "웹",
  "모바일",
  "네이티브",
  "하이브리드",
  "웹앱",
  "키오스크",
  "챗봇",
  "전자정부",
  "공공데이터",
  "데이터분석",
  "컨설팅",
] as const;

export default function ProjectForm() {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: "",
      customerId: undefined,
      developerId: undefined,
      projectDescription: "",
      projectTypeId: 1,
      bnsManager: "",
      contractNumber: "",
      plannedStartDate: "",
      plannedEndDate: "",
      projectTags: [],
    },
  });
  const router = useRouter();
  const { mutateAsync: createProject } = useNewProject();
  const { mutateAsync: assignMembers } = usePostProjectAuthorization();
  const { customer, developer } = useMemberStore();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // 1. 프로젝트 생성
      const newProject = await createProject({
        data: {
          projectName: data.projectName,
          customerId: data.customerId!,
          developerId: data.developerId!,
          projectDescription: data.projectDescription,
          projectTypeId: data.projectTypeId,
          bnsManager: data.bnsManager,
          contractNumber: data.contractNumber,
          plannedStartDate: data.plannedStartDate,
          plannedEndDate: data.plannedEndDate,
          projectTags: data.projectTags,
        },
      });

      // 2. 프로젝트 ID가 있을 때만 멤버 할당
      if (newProject?.id) {
        try {
          await assignMembers({
            projectId: newProject.id,
            data: {
              customerAuthorizations: [
                ...customer.selectedApprovers.map((member) => ({
                  memberId: Number(member.memberId),
                  projectAuthorization: "APPROVER" as const,
                })),
                ...customer.selectedNormal.map((member) => ({
                  memberId: Number(member.memberId),
                  projectAuthorization: "MEMBER" as const,
                })),
              ],
              developerAuthorizations: [
                ...developer.selectedApprovers.map((member) => ({
                  memberId: Number(member.memberId),
                  projectAuthorization: "APPROVER" as const,
                })),
                ...developer.selectedNormal.map((member) => ({
                  memberId: Number(member.memberId),
                  projectAuthorization: "MEMBER" as const,
                })),
              ],
            },
          });

          toast.success("프로젝트 생성 및 멤버 배정이 완료되었습니다.", {
            action: {
              label: "프로젝트로 이동",
              onClick: () => router.push(`/projects/${newProject.id}`),
            },
          });
        } catch (memberError) {
          toast.warning("프로젝트는 생성되었으나 멤버 배정에 실패했습니다.", {
            action: {
              label: `${memberError}, 상세 페이지에서 재시도`,
              onClick: () => router.push(`/projects/${newProject.id}`),
            },
          });
        }
      }
    } catch (error) {
      toast.error(`프로젝트 생성 중 오류가 발생했습니다. ${error}`);
    }
  };

  return (
    <div className="p-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                    <Input placeholder="프로젝트명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>고객사</FormLabel>
                  <FormControl>
                    <CompanySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="developerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>개발사</FormLabel>
                  <FormControl>
                    <CompanySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                  >
                    <FormControl>
                      <SelectTrigger>
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
              name="bnsManager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BNS 매니저</FormLabel>
                  <FormControl>
                    <Input placeholder="BNS 매니저명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="계약번호를 입력하세요" {...field} />
                  </FormControl>
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
                    placeholder="시작일 선택"
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
                    placeholder="종료일 선택"
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
          </div>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="프로젝트 설명을 입력하세요"
                    className="h-32"
                    {...field}
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
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => {
                              const newTags = [...(field.value ?? [])];
                              newTags.splice(index, 1);
                              field.onChange(newTags);
                            }}
                          />
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-1.5">
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
                        onCompositionEnd={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.dataset.composing = "false";
                        }}
                        onCompositionStart={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.dataset.composing = "true";
                        }}
                        onKeyDown={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (target.dataset.composing === "true") return;

                            const value = target.value.trim();
                            if (value && !field.value?.includes(value)) {
                              field.onChange([...(field.value ?? []), value]);
                              target.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MemberAssignment
            customerId={form.watch("customerId")}
            developerId={form.watch("developerId")}
          />

          <Button type="submit" className="w-full">
            프로젝트 생성
          </Button>
        </form>
      </Form>
    </div>
  );
}
