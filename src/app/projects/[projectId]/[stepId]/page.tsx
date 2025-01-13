import PostTableWithSheet from "@/components/post-table-with-sheet";
import TableTools from "@/components/table-tools";
import { postListData, projectSteps } from "@/lib/mockData";
import { Button, Tabs, TabsList, TabsTrigger } from "@ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CreatePost } from "./_components/create-post";
import { postListColumns } from "./post-list-columns";

export default async function ProjectStepPage({
  params,
  searchParams,
}: {
  params: Promise<{ stepId: string }>;
  searchParams: { isNewPost?: string };
}) {
  const { stepId } = await params;
  const { isNewPost } = await searchParams; // searchParams도 await 처리

  const isNewPostFlag = isNewPost === "true";

  if (isNewPostFlag) {
    return <CreatePost />;
  }

  const steps = projectSteps;

  return (
    <>
      <div className="flex">
        <Tabs defaultValue={stepId} className="w-full">
          <TabsList>
            {steps.map((step) => (
              <Link key={step.id} href={`./${step.id}`} replace>
                <TabsTrigger value={step.id}>{step.title}</TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
        <Link href={{ query: { isNewPost: "true" } }}>
          <Button>
            <Plus />새 게시물
          </Button>
        </Link>
      </div>
      <TableTools />
      <PostTableWithSheet columns={postListColumns} data={postListData} />
    </>
  );
}
