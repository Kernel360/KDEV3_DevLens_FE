import { commentSchema, type CommentFormValues } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input
} from "@ui";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";

interface CommentFormProps {
  onSubmit: (data: CommentFormValues) => Promise<void>;
  placeholder?: string;
  className?: string;
}

export default function CommentForm({
  onSubmit,
  placeholder = "댓글을 입력하세요",
  className,
}: CommentFormProps) {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (data: CommentFormValues) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={placeholder}
                      className="h-[42px] min-h-0 resize-none"
                      {...field}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-[42px]"
                    disabled={form.formState.isSubmitting}
                  >
                    <SendHorizontal className="h-4 w-4" />
                    <span className="sr-only">댓글 작성</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
