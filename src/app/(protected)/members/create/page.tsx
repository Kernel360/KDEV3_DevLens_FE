import { MemberForm } from "@/app/(protected)/members/create/_components/member-form";
import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import BatchMembersButton from "./_components/batch-members-button";

export const dynamic = "force-dynamic";

export default function CreateMemberPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "계정 목록", href: "/members" },
          { label: "계정 생성" },
        ]}
      />
      <div className="flex justify-between">
        <SectionTitle>계정 생성</SectionTitle>
        <BatchMembersButton />
      </div>
      <MemberForm />
    </>
  );
}
