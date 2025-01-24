import { Card } from "@/components/ui";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex w-full flex-col">
        <Card className="p-2">Test Account : asdf123 / asdf123!</Card>
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
