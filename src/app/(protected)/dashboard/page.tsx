import Header from "@/components/layout/Header";
import ProjectSection from "./_components/project-section";
import { ErrorBoundary } from "@/components/error/error-boundary";

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <ProjectSection />
      </ErrorBoundary>
    </>
  );
}
