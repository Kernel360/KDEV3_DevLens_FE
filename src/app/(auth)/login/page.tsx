import { Card, CardContent, CardHeader, Separator } from "@/components/ui";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex w-full flex-col">
        <Card className="max-w-30 p-2">
          <CardHeader>Test Accounts pw:asdf123!</CardHeader>
          <CardContent>
            user : taek123, kyo123, seung123, jeong123, jeong321, dae123,
            seung321,
            <Separator />
            admin : test
          </CardContent>
        </Card>
        <h1
          id="logo"
          className="mx-auto w-fit cursor-default select-none py-4 font-mono text-3xl font-bold"
        >
          DevLens
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
