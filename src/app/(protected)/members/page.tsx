import SectionTitle from "@/components/composites/section-title";
import { ErrorBoundary } from "@/components/error/error-boundary";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import MemberListTable from "./_components/member-list-table";

export default function MembersPage() {
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>계정 목록</SectionTitle>
        <Link href="/members/create">
          <Button>
            <Plus size={12} />
            계정 생성
          </Button>
        </Link>
      </div>
      <ErrorBoundary>
      <MemberListTable />
      </ErrorBoundary>
    </>
  );
}
