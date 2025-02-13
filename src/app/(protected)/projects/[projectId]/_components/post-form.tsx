"use client";

import {
  useCreatePost,
  useDeleteLink,
  useDeletePostFiles,
  useUpdatePost,
  useUpdatePostFiles,
  useUploadLinks,
  useUploadPostFiles,
} from "@/lib/api/generated/main/services/post-api/post-api";
import { useGetProjectStepAndChecklist } from "@/lib/api/generated/main/services/project-step-api/project-step-api";
import { cn, formatFileSize } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormDescription,
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
import {
  CalendarIcon,
  Loader2,
  PlusCircle,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { FileMetadataResponse } from "@/lib/api/generated/main/models/fileMetadataResponse";
import { ConfirmDialog } from "@/components/composites/confirm-dialog";
import { LinkResponse } from "@/lib/api/generated/main/models/linkResponse";

const formSchema = z.object({
  step: z.string().min(1, { message: "단계를 선택해주세요" }),
  title: z.string().trim().min(5, { message: "제목은 필수 입력 항목입니다" }),
  status: z.enum([
    "DEFAULT",
    "IN_PROGRESS",
    "ADDITION",
    "COMPLETED",
    "ON_HOLD",
  ] as const),
  priority: z.enum(["DEFAULT", "LOW", "MEDIUM", "HIGH"]),
  dueDate: z.date().optional(),
  content: z
    .string()
    .trim()
    .min(10, { message: "본문을 10자 이상 입력해주세요" }),
  links: z.array(
    z.object({
      linkTitle: z.string().trim(),
      link: z.string().trim().url({ message: "올바른 URL을 입력해주세요" }),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  mode: "create" | "edit";
  defaultStepId: number;
  initialData?: FormValues;
  onCancel?: () => void;
  postId?: number;
  initialFiles?: FileMetadataResponse[];
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export default function PostForm({
  mode,
  defaultStepId,
  initialData,
  onCancel,
  postId,
  initialFiles = [],
}: PostFormProps) {
  // 새로 업로드할 File 객체들
  const [files, setFiles] = useState<File[]>([]);
  // 기존 파일 메타데이터
  const [existingFiles, setExistingFiles] = useState<FileMetadataResponse[]>(
    initialFiles ?? [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tempLink, setTempLink] = useState({
    linkTitle: "",
    link: "",
  });
  const [existingLinks, setExistingLinks] = useState<LinkResponse[]>(
    initialData?.links ?? [],
  );

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
    links: [],
    priority: "DEFAULT",
    ...initialData, // initialData로 덮어써야 함
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    // values가 있을 때 폼을 리셋하도록 설정
    values: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });

  // 게시글 생성
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: uploadPostFiles } = useUploadPostFiles();

  // 게시글 수정때 개별 동작
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: deletePostFile } = useDeletePostFiles();
  const { mutateAsync: updatePostFile } = useUpdatePostFiles();
  const { mutateAsync: uploadLinks } = useUploadLinks();
  const { mutateAsync: deleteLink } = useDeleteLink();

  const queryClient = useQueryClient();

  // 링크 입력 핸들러
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 링크 추가 핸들러
  const handleAddLink = async () => {
    if (!tempLink.linkTitle || !tempLink.link) {
      toast.error("링크 제목과 URL을 모두 입력해주세요");
      return;
    }

    try {
      if (mode === "create") {
        // 생성 모드: form 상태에만 추가
        append(tempLink);
      } else if (postId) {
        // 수정 모드: API 호출 후 상태 업데이트
        await uploadLinks({
          postId,
          data: [tempLink],
        });
        setExistingLinks((prev) => [...prev, tempLink]);
        setTempLink({ linkTitle: "", link: "" });
        toast.success("링크가 추가되었습니다");
      }
    } catch (error) {
      toast.error("링크 추가에 실패했습니다");
      console.error(error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    // 파일 크기 검증
    const oversizedFiles = newFiles.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error("파일 크기는 50MB를 초과할 수 없습니다");
      return;
    }

    if (mode === "create") {
      // 생성 모드: 브라우저 상태에만 파일 추가
      setFiles((prev) => [...prev, ...newFiles]);
    } else if (postId) {
      // 수정 모드: 파일 업로드 API 호출 후 상태 업데이트
      try {
        await uploadPostFiles({
          postId,
          data: { files: newFiles },
        });
        setExistingFiles((prev) => [...prev, ...newFiles]);
        toast.success("파일이 업로드되었습니다");
      } catch (error) {
        toast.error("파일 업로드에 실패했습니다");
        console.error(error);
      }
    }
  };

  const removeFile = async (index: number, fileId?: number) => {
    if (mode === "create") {
      // 생성 모드: 브라우저 상태에서만 제거
      setFiles((prev) => prev.filter((_, i) => i !== index));
    } else if (postId && fileId) {
      // 수정 모드 파일 삭제
      setExistingFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const removeLink = () => {
    if (mode === "create") {
      // 생성 모드: 브라우저 상태에서만 제거
    } else {
      // 수정 모드 : api 호출하고 링크 리스트 ui에서 삭제
    }
  };

  // 게시글 생성
  const onCreate = async (data: FormValues) => {
    try {
      const createResponse = (await createPost({
        data: {
          projectStepId: Number(data.step),
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

      if (files.length > 0) {
        console.log("파일 업로드 시작");
        await uploadPostFiles({
          postId: createResponse.postId,
          data: { files },
        });
      }

      // 모든 작업이 성공적으로 완료됨
      toast.success("게시물이 작성되었습니다");
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

      // 게시글 데이터 무효화
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
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>첨부파일</FormLabel>
                <FormDescription>
                  {mode === "create"
                    ? "최대 10개의 파일을 첨부할 수 있습니다."
                    : "게시글 수정 시 파일 추가와 삭제는 미리보기와 동시에 서버에 반영됩니다."}
                </FormDescription>
              </div>
              <FormControl>
                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      파일 선택
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {/* 파일 목록 */}
                    {existingFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <div className="flex-1 truncate">
                          <div className="text-sm font-medium">
                            {file.displayTitle}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatFileSize(Number(file.size))}
                          </div>
                        </div>
                        <ConfirmDialog
                          title="파일 삭제"
                          description={`${file.displayTitle} 파일을 삭제하시겠습니까? 삭제된 파일은 복구할 수 없습니다.`}
                          trigger={
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          }
                          onConfirm={() => removeFile(index, file.id)}
                          confirmText="삭제"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
            </FormItem>

            {/* 관련 링크 */}
            <div className="space-y-4">
              <FormLabel>관련 링크</FormLabel>

              {/* 링크 입력 폼 */}
              <div className="flex gap-4">
                <Input
                  placeholder="링크 제목"
                  name="linkTitle"
                  value={tempLink.linkTitle}
                  onChange={handleLinkChange}
                />
                <Input
                  placeholder="URL"
                  name="link"
                  value={tempLink.link}
                  onChange={handleLinkChange}
                />
                <Button type="button" variant="outline" onClick={handleAddLink}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  추가
                </Button>
              </div>

              {/* 링크 목록 */}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 rounded-md border p-3"
                >
                  <div className="flex-1">
                    <div className="font-medium">{field.linkTitle}</div>
                    <Link
                      href={field.link}
                      target="_blank"
                      className="truncate text-sm text-muted-foreground hover:underline"
                    >
                      {field.link}
                    </Link>
                  </div>
                  <ConfirmDialog
                    title="링크 삭제"
                    description={`${field.linkTitle} 링크를 삭제하시겠습니까? 삭제된 링크는 복구할 수 없습니다.`}
                    trigger={
                      <Button type="button" variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">링크 삭제</span>
                      </Button>
                    }
                    onConfirm={() => {
                      removeLink();
                    }}
                    confirmText="삭제"
                  />
                </div>
              ))}
            </div>
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
                          <Calendar
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
