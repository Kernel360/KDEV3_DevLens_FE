import SectionTitle from "@/components/composites/section-title";
import { ErrorBoundary } from "@/components/error/error-boundary";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CompanyListTable from "./_components/company-list-table";

export default function CompanyPage() {
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>회사 목록</SectionTitle>
        <Link href="/company/create">
          <Button>
            <Plus size={12} />
            회사 생성
          </Button>
        </Link>
      </div>
      <ErrorBoundary>
        <CompanyListTable />
      </ErrorBoundary>
    </>
  );
}
