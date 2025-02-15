"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { usePostProjectChecklistApplication } from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";

const requestFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "설명을 입력해주세요"),
  links: z
    .array(
      z.object({
        title: z.string().min(1, "링크 제목을 입력해주세요"),
        url: z.string().url("올바른 URL을 입력해주세요"),
      }),
    )
    .optional(),
});

type RequestFormValues = z.infer<typeof requestFormSchema>;

interface ChecklistRequestFormProps {
  checklistId: number;
}

export default function ChecklistRequestForm({
  checklistId,
}: ChecklistRequestFormProps) {
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      title: "",
      content: "",
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const { mutate: createRequest, isPending } =
    usePostProjectChecklistApplication();

  const onSubmit = (values: RequestFormValues) => {
    createRequest(
      {
        checklistId,
        data: {
          title: values.title,
          description: values.content,
          linkInputs:
            values.links?.map((link) => ({
              linkTitle: link.title,
              link: link.url,
            })) || [],
        },
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">요청 생성</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>체크리스트 요청 생성</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="승인 요청 제목" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="승인 요청에 대한 상세 설명을 입력해주세요"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>관련 링크</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ title: "", url: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  링크 추가
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`links.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>링크 제목</FormLabel>
                          <FormControl>
                            <Input placeholder="링크 제목" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                초기화
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "제출 중..." : "제출하기"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
