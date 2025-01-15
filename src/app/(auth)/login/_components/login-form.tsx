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
import { signInSchema } from "@/schemas/signIn";
import { authenticate } from "@/lib/actions/action";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [, setError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginId: "",
      pwd: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setError("");

    const formData = new FormData();
    formData.append("loginId", values.loginId);
    formData.append("pwd", values.pwd);

    const result = await authenticate(undefined, formData);
    if (result) {
      setError(result);
    }
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[500px] flex-col gap-6",
        className,
      )}
      {...props}
    >
      <Card className="p-2">Test Account : adminadmin / admin1234</Card>
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
                name="loginId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pwd"
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
