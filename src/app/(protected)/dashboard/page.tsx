import Header from "@/components/layout/Header";
import ProjectSection from "./_components/project-section";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { ScheduleView } from "./_components/schedule-view";

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <div className="grid h-full grid-cols-3 gap-4">
        <div className="col-span-2">
          <ErrorBoundary>
            <ProjectSection />
          </ErrorBoundary>
        </div>
        <div className="col-span-1">
          <ScheduleView className="h-fit" />
        </div>
      </div>
    </>
  );
}
