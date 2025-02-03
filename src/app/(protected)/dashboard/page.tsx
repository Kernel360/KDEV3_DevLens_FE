import Header from "@/components/layout/Header";
import { Suspense } from "react";
import { ProjectListSkeleton } from "../../../components/skeleton/project-list-skeleton";
import ProjectSection from "./_components/project-section";
import { ErrorBoundary } from "@/components/error/error-boundary";

export default function Dashboard() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
