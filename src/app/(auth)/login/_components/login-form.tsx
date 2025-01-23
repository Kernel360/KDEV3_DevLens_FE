"use client";

import { loginAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schemas/signIn";
// import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@ui";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });
  // const setUser = useAuthStore((state) => state.setUser);

  async function handleLoginAction(formData: FormData) {
    const res = await loginAction(formData);
    if (res.user) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect_to") || "/dashboard";
      redirect(redirectTo);
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
      <Card className="p-2">Test Account : jyp123 / qwer123!</Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            부여된 아이디와 비밀번호로 로그인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={handleLoginAction} className="space-y-6">
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
