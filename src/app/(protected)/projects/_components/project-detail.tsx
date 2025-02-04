"use client";

import DatePickerInput from "@/components/composites/date-picker-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { adminProjectApi } from "@/lib/apis/admin/adminProjectApi";
import { createProjectSchema } from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProjectDetail({ id }: { id: number }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ["projectDetail", id],
    queryFn: () => adminProjectApi.getDetail(id),
  });

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: data?.projectName || "",
      projectDescription: data?.projectDescription || "",
      bnsManager: data?.bnsManager || "",
      contractNumber: data?.contractNumber || "",
      plannedStartDate: data?.plannedStartDate || "",
      plannedEndDate: data?.plannedEndDate || "",
      projectStatusCode: data?.projectStatusCode || "PREPARED",
    },
  });

  const statusOptions = {
    PREPARED: "준비중",
    IN_PROGRESS: "진행중",
    COMPLETED: "완료",
    CLOSED: "종료",
    CANCELLED: "취소",
    DELETED: "삭제됨",
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">프로젝트 상세</h2>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "취소" : "수정"}
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트명</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
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
                <FormLabel>상태</FormLabel>
                <Select
                  disabled={!isEditing}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {statusOptions[field.value as keyof typeof statusOptions]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusOptions).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>고객사</FormLabel>
            <Input value={data.customerCompanyName} disabled />
          </FormItem>

          <FormItem>
            <FormLabel>개발사</FormLabel>
            <Input value={data.developerCompanyName} disabled />
          </FormItem>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>프로젝트 설명</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={!isEditing} />
                </FormControl>
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
                  <Input {...field} disabled={!isEditing} />
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
                  <Input {...field} disabled={!isEditing} />
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
                <FormControl>
                  <DatePickerInput
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) =>
                      field.onChange(date?.toISOString().split("T")[0])
                    }
                    disabled={!isEditing}
                    placeholder="시작일 선택"
                  />
                </FormControl>
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
                <FormControl>
                  <DatePickerInput
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) =>
                      field.onChange(date?.toISOString().split("T")[0])
                    }
                    disabled={!isEditing}
                    placeholder="종료일 선택"
                    minDate={
                      form.getValues("plannedStartDate")
                        ? new Date(form.getValues("plannedStartDate"))
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="submit">저장</Button>
          </div>
        )}
      </Form>
    </div>
  );
}
