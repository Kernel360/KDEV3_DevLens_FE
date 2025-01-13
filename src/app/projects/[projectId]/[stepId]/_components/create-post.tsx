"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Heading from "@/components/ui/heading";
import PostForm from "./post-form";

export function CreatePost() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Heading>새 게시물 작성</Heading>
      </div>
      <PostForm />
    </div>
  );
}
