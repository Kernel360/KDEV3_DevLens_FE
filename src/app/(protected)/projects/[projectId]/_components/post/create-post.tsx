"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { GetProjectStepProjectStepInfo } from "@/lib/api/generated/main/models";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import PostForm from "./post/post-form";

interface CreatePostProps {
  projectId: number;
  stepId: number;
  steps: GetProjectStepProjectStepInfo[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreatePost({ projectId, stepId, steps }: CreatePostProps) {
  const [id] = useQueryState("id", parseAsInteger);
  const [step] = useQueryState("step", parseAsInteger);
  const [, setNew] = useQueryState("new");
  const router = useRouter();

  const handleBack = () => {
    if (id) {
      // 답글 작성 중이면 new 파라미터만 제거하여 원글로 돌아가기
      setNew(null);
    } else {
      // 새글 작성 중이면 step을 제외한 모든 파라미터 제거하여 목록으로 돌아가기
      router.replace(`/projects/${projectId}?step=${step}`);
    }
  };

  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Heading> {id ? "답글 작성" : "새 게시물 작성"}</Heading>
      </div>
      <PostForm mode="create" defaultStepId={stepId} />
    </div>
  );
}
