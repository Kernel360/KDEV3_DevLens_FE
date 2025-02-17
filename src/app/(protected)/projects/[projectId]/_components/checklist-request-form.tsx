"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircle, TrashIcon } from "lucide-react";
import * as z from "zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
import { getGetChecklistApplicationQueryKey } from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";

const requestFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "설명을 입력해주세요"),
  linkInputs: z
    .array(
      z.object({
        linkTitle: z.string().min(1, "링크 제목을 입력해주세요"),
        link: z.string().url("올바른 URL을 입력해주세요"),
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      title: "",
      content: "",
      linkInputs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "linkInputs",
  });

  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const { mutate: createRequest, isPending } =
    usePostProjectChecklistApplication();

  const onSubmit = () => {
    const values = form.getValues();
    createRequest(
      {
        checklistId,
        data: {
          title: values.title,
          description: values.content,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          setIsDialogOpen(false);
          queryClient.invalidateQueries({
            queryKey: getGetChecklistApplicationQueryKey(checklistId),
          });
        },
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          요청 생성
        </Button>
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

            <FormItem className="space-y-4">
              <FormLabel>관련 링크</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="링크 제목"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (newLinkTitle && newLinkUrl) {
                          append({ linkTitle: newLinkTitle, link: newLinkUrl });
                          setNewLinkTitle("");
                          setNewLinkUrl("");
                        }
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      추가
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-4 rounded-md border p-3"
                      >
                        <div className="w-full">
                          <div className="font-medium">{field.linkTitle}</div>
                          <a
                            href={field.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full truncate text-sm text-muted-foreground hover:underline"
                          >
                            {field.link}
                          </a>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
            </FormItem>

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
