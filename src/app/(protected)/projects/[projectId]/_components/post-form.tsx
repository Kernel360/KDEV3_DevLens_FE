"use client";

import { GetProjectStepProjectStepInfo } from "@/lib/api/generated/main/models";
import {
  useCreatePost,
  useUploadPostFiles,
} from "@/lib/api/generated/main/services/post-api/post-api";
import { cn } from "@/lib/utils";
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
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  step: z.string().min(1, { message: "단계를 선택해주세요" }),
  title: z.string().trim().min(2, { message: "제목은 필수 입력 항목입니다" }),
  status: z.enum(["DEFAULT", "IN_PROGRESS", "COMPLETED"]),
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
  steps: GetProjectStepProjectStepInfo[];
  defaultStepId: number;
  initialData?: FormValues;
  onCancel?: () => void;
  postId?: number;
}

export default function PostForm({
  steps,
  defaultStepId,
  onCancel,
}: PostFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues: Partial<FormValues> = {
    step: String(defaultStepId ?? 0),
    status: "DEFAULT",
    title: "",
    content: "",
    links: [],
    priority: "DEFAULT",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: uploadPostFiles } = useUploadPostFiles();

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

  const onSubmit = async (data: FormValues) => {
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

  // const onSubmit = async (data: FormValues) => {
  //   try {
  //     // 1. 게시글 생성

  //     // 2. 파일이 있다면 게시글 생성 api의 응답으로 온 postId를 파라미터에 추가하고, 파일 업로드
  //     try {
  //       if (files.length > 0) {
  //         console.log("파일 업로드 시작");
  //         await uploadPostFiles({
  //           postId: Number(response.postId),
  //           data: files,
  //         });
  //       }

  //       // 모든 작업이 성공적으로 완료됨
  //       toast.success("게시물이 작성되었습니다");
  //       router.back();
  //       router.refresh();
  //     } catch (uploadError) {
  //       toast.error("파일 업로드에 실패했습니다");
  //       console.error(uploadError);
  //     }
  //   } catch (error) {
  //     toast.error("게시물 작성에 실패했습니다");
  //     console.error(error);
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // 파일 크기 검증
      const oversizedFiles = newFiles.filter(
        (file) => file.size > MAX_FILE_SIZE,
      );
      if (oversizedFiles.length > 0) {
        toast.error("파일 크기는 50MB를 초과할 수 없습니다");
        return;
      }

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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
                  최대 10개의 파일을 첨부할 수 있습니다.
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
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <div className="flex-1 truncate">
                          <div className="text-sm font-medium">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)}MB
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFile(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">파일 삭제</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
            </FormItem>

            {/* 관련 링크 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>관련 링크</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ linkTitle: "", link: "" })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  링크 추가
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`links.${index}.linkTitle`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="링크 제목" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">링크 삭제</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
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
