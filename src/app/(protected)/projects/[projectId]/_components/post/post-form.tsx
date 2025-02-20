"use client";

import { FileMetadataResponse } from "@/lib/api/generated/main/models/fileMetadataResponse";
import {
  useCreatePost,
  useUpdatePost,
  useUploadPostFiles,
} from "@/lib/api/generated/main/services/post-api/post-api";
import { useGetProjectStepAndChecklist } from "@/lib/api/generated/main/services/project-step-api/project-step-api";
import { cn } from "@/lib/utils";
import { postFormSchema } from "@/schemas/post-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  CalendarCustom,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@ui";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FileUploadSection } from "./file-upload-section";
import { LinkUploadSection } from "./link-upload-section";
import { LinkInput } from "@/lib/api/generated/main/models";

type FormValues = z.infer<typeof postFormSchema>;

interface PostFormProps {
  mode: "create" | "edit";
  defaultStepId: number;
  initialData?: FormValues;
  onCancel?: () => void;
  postId?: number;
  initialFiles?: FileMetadataResponse[];
  initialLinks?: { id: number; linkTitle: string; link: string }[];
}

export default function PostForm({
  mode,
  defaultStepId,
  initialData,
  onCancel,
  postId,
  initialFiles = [],
  initialLinks,
}: PostFormProps) {
  const [, setNew] = useQueryState("new");
  const [parentId] = useQueryState("id", parseAsInteger);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [, setPendingLinks] = useState<LinkInput[]>([]);

  const { projectId } = useParams();
  const { data: projectSteps } = useGetProjectStepAndChecklist(
    Number(projectId),
  );
  const steps = projectSteps?.projectStepInfo ?? [];

  const defaultValues: Partial<FormValues> = {
    step: String(defaultStepId ?? 0),
    status: "DEFAULT",
    title: "",
    content: "",
    links:
      initialLinks?.map((link) => ({
        id: link.id,
        linkTitle: link.linkTitle ?? "",
        link: link.link ?? "",
      })) ?? [],
    priority: "DEFAULT",
    ...initialData,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    // values가 있을 때 폼을 리셋
    values: initialData,
  });

  // 게시글 생성
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: uploadPostFiles } = useUploadPostFiles();

  // 게시글 수정
  const { mutateAsync: updatePost } = useUpdatePost();

  const queryClient = useQueryClient();

  // 게시글 생성
  const onCreate = async (data: FormValues) => {
    try {
      const createResponse = (await createPost({
        data: {
          projectStepId: Number(data.step),
          parentPostId: parentId ?? undefined,
          priority: data.priority,
          status: data.status,
          title: data.title,
          content: data.content,
          deadline: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : "",
          linkInputList: data.links.map((link) => ({
            linkTitle: link.linkTitle,
            link: link.link,
          })),
        },
      })) as { postId: number };

      if (!createResponse.postId) {
        throw new Error("게시물 생성 실패");
      }

      if (pendingFiles.length > 0) {
        await uploadPostFiles({
          postId: createResponse.postId,
          data: { files: pendingFiles },
        });
      }

      // 모든 작업이 성공적으로 완료됨
      toast.success("게시물이 작성되었습니다");
      await setNew(null);
    } catch {
      toast.error("게시물 작성에 실패했습니다");
      //     console.error(error);
    }
  };

  const onUpdate = async (data: FormValues) => {
    if (!postId) return;

    try {
      await updatePost({
        postId,
        data: {
          postId,
          projectStepId: Number(data.step),
          priority: data.priority,
          status: data.status,
          title: data.title,
          content: data.content,
          deadline: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : "",
        },
      });

      // 게시글 다시 불러오기
      await queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });

      toast.success("게시물이 수정되었습니다");
      onCancel?.();
    } catch (error) {
      toast.error("게시물 수정에 실패했습니다");
      console.error(error);
    }
  };

  const onSubmit = mode === "create" ? onCreate : onUpdate;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 p-1 lg:flex-row lg:gap-10">
          <div className="flex grow flex-col space-y-6">
            {/* 단계 필드 */}
            <FormField
              control={form.control}
              name="step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>단계</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="상태를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {steps.map((step) => (
                        <SelectItem
                          key={step.stepId}
                          value={String(step.stepId)}
                        >
                          {step.stepName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 제목 필드 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 본문 작성 */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>본문</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="본문을 입력하세요"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 파일 업로드 */}
            <FileUploadSection
              mode={mode}
              postId={postId}
              initialFiles={initialFiles}
              onFilesChange={setPendingFiles}
            />

            {/* 관련 링크 */}
            <LinkUploadSection
              mode={mode}
              postId={postId}
              onLinksChange={setPendingLinks}
            />
          </div>

          {/* 옵션카드 */}
          <Card className="h-fit min-w-24 lg:w-72">
            <CardHeader>옵션</CardHeader>
            <CardContent className="flex flex-col gap-6 lg:flex-row">
              <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-1">
                {/* 상태 선택 */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>상태</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="상태를 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DEFAULT">기본</SelectItem>
                          <SelectItem value="IN_PROGRESS">진행</SelectItem>
                          <SelectItem value="COMPLETED">완료</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 우선순위 선택 */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>우선순위</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="우선순위를 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DEFAULT">기본</SelectItem>
                          <SelectItem value="LOW">낮음</SelectItem>
                          <SelectItem value="MEDIUM">중간</SelectItem>
                          <SelectItem value="HIGH">높음</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 마감일 선택 */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>마감일</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ko })
                              ) : (
                                <span>날짜를 선택하세요</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarCustom
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 bg-background py-4 lg:pt-10">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            등록
          </Button>
        </div>
      </form>
    </Form>
  );
}
