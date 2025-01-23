import Header from "@/components/layout/Header";
import { projectSteps } from "@/lib/mockData";
import { Button, Tabs, TabsList, TabsTrigger } from "@ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CreatePost } from "./_components/create-post";

export default async function ProjectStepPage(props: {
  params: Promise<{ projectId: string; stepId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { stepId } = params;
  const isNewPost = searchParams.isNewPost === "true";

  if (isNewPost) {
    return <CreatePost />;
  }

  const steps = projectSteps;

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "내 프로젝트", href: "/dashboard" },
          // TODO: 프로젝트 이름 동적으로 받아오기
          { label: "프로젝트 이름", href: `/projects/${params.projectId}` },
          { label: `단계별 게시판` },
        ]}
      />
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
      {/* <TableWithSheet columns={postListColumns} data={postListData} /> */}
    </>
  );
}
