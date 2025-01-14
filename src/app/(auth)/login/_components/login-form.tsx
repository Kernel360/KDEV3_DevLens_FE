"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// TODO: 로그인 스키마 확인
const formSchema = z.object({
  id: z.string().min(8, {
    message: "최소 8자 이상의 아이디를 입력해주세요.",
  }),
  password: z.string().min(8, {
    message: "최소 8자 이상의 비밀번호를 입력해주세요.",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: 로그인 로직
    console.log(values);
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[500px] flex-col gap-6",
        className,
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            부여된 아이디와 비밀번호로 로그인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <a href="/forgot" className="underline underline-offset-4">
              비밀번호 찾기
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
