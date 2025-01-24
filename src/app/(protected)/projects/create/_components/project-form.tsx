"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { adminProjectApi } from "@/lib/apis/admin/adminProjectApi";
import { createProjectSchema, type ProjectFormData } from "@/schemas/project";
import {
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
import { CompanySelect } from "@/app/(protected)/my/_components/company-select";
import { PROJECT_TYPES } from "@/lib/constants/selects";
import DatePickerInput from "@/components/composites/date-picker-input";

export default function ProjectForm() {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: "",
      customerId: undefined,
      developerId: undefined,
      projectDescription: "",
      projectTypeId: 1,
      // projectStatusCode: "PREPARED",
      bnsManagerName: "",
      contractNumber: "",
      plannedStartDate: "",
      plannedEndDate: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await adminProjectApi.create(data);
      toast.success("프로젝트가 생성되었습니다.", {
        action: {
          label: "프로젝트 목록으로 이동",
          onClick: () => router.push("/projects"),
        },
      });
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

            {/* <FormField
              control={form.control}
              name="projectStatusCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트 상태</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="프로젝트 상태를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PREPARED">준비중</SelectItem>
                      <SelectItem value="IN_PROGRESS">진행중</SelectItem>
                      <SelectItem value="COMPLETED">완료</SelectItem>
                      <SelectItem value="CLOSED">종료</SelectItem>
                      <SelectItem value="CANCELLED">취소</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="bnsManagerName"
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

          <Button type="submit" className="w-full">
            프로젝트 생성
          </Button>
        </form>
      </Form>
    </div>
  );
}
