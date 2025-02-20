import SectionTitle from "@/components/composites/section-title";
import { ErrorBoundary } from "@/components/error/error-boundary";
import Header from "@/components/layout/Header";
import ProjectListTable from "./_components/project-list-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>프로젝트 목록</SectionTitle>
        <Link href="/projects/create">
          <Button>
            <Plus size={12} />
            프로젝트 생성
          </Button>
        </Link>
      </div>
      <ErrorBoundary>
        <ProjectListTable />
      </ErrorBoundary>
    </>
  );
}
