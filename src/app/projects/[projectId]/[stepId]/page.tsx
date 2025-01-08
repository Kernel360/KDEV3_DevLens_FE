import { projectSteps } from "@/lib/mockData";
import { Tabs, TabsList, TabsTrigger } from "@ui";
import Link from "next/link";

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
            <Link key={step.id} href={`./${step.id}`}>
              <TabsTrigger value={step.id}>{step.title}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
