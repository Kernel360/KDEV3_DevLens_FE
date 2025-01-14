import Header from "@/components/layout/Header";
import SectionTitle from "@/components/section-title";
import { CompanyForm } from "./_components/company-form";

export default function CreateCompanyPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "회사 목록", href: "/company" },
          { label: "회사 생성" },
        ]}
      />
      <SectionTitle>회사 생성</SectionTitle>
      <CompanyForm />
    </>
  );
}
