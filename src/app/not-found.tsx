import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            존재하지 않는 페이지입니다.
          </h1>
          <p className="text-gray-500">404 Page Not Found</p>
        </div>
        <Link href="/dashboard" prefetch={false}>
          <Button className="mt-4">메인 화면으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
