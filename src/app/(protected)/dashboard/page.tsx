import Header from "@/components/layout/Header";
import ProjectSection from "./_components/project-section";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { ScheduleView } from "./_components/schedule-view";

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ErrorBoundary>
            <ProjectSection />
          </ErrorBoundary>
        </div>
        <div className="md:col-span-1">
          <ScheduleView className="h-fit" />
        </div>
      </div>
    </>
  );
}
