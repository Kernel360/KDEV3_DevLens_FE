import DataTable from "@/components/data-table";
import { projectSteps } from "@/lib/mockData";
import { Tabs, TabsList, TabsTrigger } from "@ui";
import Link from "next/link";
import { postListColumns } from "./post-list-columns";

export default async function ProjectStepPage({
  params,
}: {
  params: Promise<{ stepId: string }>;
}) {
  const { stepId } = await params;
  const steps = projectSteps;
  return (
    <>
      <Tabs defaultValue={stepId} className="w-full">
        <TabsList>
          {steps.map((step) => (
            <Link key={step.id} href={`./${step.id}`} replace>
              <TabsTrigger value={step.id}>{step.title}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
      <DataTable columns={postListColumns} data={[]} />
    </>
  );
}
