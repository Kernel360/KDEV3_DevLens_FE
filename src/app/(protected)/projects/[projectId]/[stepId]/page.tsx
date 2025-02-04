"use client";

import Header from "@/components/layout/Header";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button, Tabs, TabsList, TabsTrigger } from "@ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { CreatePost } from "./_components/create-post";
import PostListTable from "./_components/post-list-table";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProjectApi } from "@/lib/apis/main/projectApi";

export default function ProjectStepPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isNewPost = searchParams.has("new");
  const projectName = searchParams.get("projectName") || "프로젝트";

  const { projectId, stepId } = params;

  const { data } = useQuery({
    queryKey: ["projectSteps", projectId],
    queryFn: () => ProjectApi.steps.getSteps(Number(projectId)),
    retry: 2,
  });

  const steps = data?.projectStepInfo ?? [];

  if (isNewPost) {
    return <CreatePost steps={steps} currentStepId={Number(stepId)} />;
  }

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "내 프로젝트", href: "/dashboard" },
          { label: projectName, href: `/projects/${projectId}` },
          { label: `단계별 게시판` },
        ]}
      />
      <div className="flex">
        <Tabs defaultValue={String(stepId)} className="w-full">
          <TabsList>
            {steps.map((step) => (
              <Link key={step.stepId} href={`./${step.stepId}`} replace>
                <TabsTrigger value={String(step.stepId)}>
                  {step.stepName}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
        <Link href="?new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />새 게시물
          </Button>
        </Link>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <PostListTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
