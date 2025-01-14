import Header from "@/components/layout/Header";
import { MemberForm } from "@/app/members/create/_components/member-form";
import SectionTitle from "@/components/section-title";

export default function CreateMemberPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "계정 목록", href: "/members" },
          { label: "계정 생성" },
        ]}
      />
      <SectionTitle>계정 생성</SectionTitle>
      <MemberForm />
    </>
  );
}
