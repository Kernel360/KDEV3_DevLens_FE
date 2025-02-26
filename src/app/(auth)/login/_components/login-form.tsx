"use client";

import { loginAction } from "@/lib/actions/loginAction";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schemas/signIn";
import { useAuthStore } from "@/store/useAuthStore";
import { APIError } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import LoginSubmitButton from "./login-submit-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });
  const setUser = useAuthStore((state) => state.setUser);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      const res = await loginAction(values);
      if (res.success && res.user) {
        setUser({ ...res.user });
        toast.success(`반갑습니다, ${res.user.name}님`);
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get("redirect_to") || "/dashboard";
        router.push(redirectTo);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof APIError
          ? error.message
          : "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-[400px] grow flex-col gap-6",
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
              <LoginSubmitButton isSubmitting={form.formState.isSubmitting} />
            </form>
          </Form>

          {/* <div className="mt-4 text-center text-sm">
            <a href="/forgot" className="underline underline-offset-4">
              비밀번호 찾기
            </a>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
