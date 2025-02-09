"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { GetProjectStepProjectStepInfo } from "@/lib/api/generated/main/models";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import PostForm from "./post-form";

interface CreatePostProps {
  projectId: number;
  stepId: number;
  steps: GetProjectStepProjectStepInfo[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreatePost({ projectId, stepId, steps }: CreatePostProps) {
  const router = useRouter();

  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Heading>새 게시물 작성</Heading>
      </div>
      <PostForm steps={steps} defaultStepId={stepId} />
    </div>
  );
}
