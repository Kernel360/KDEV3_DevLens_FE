// import { DataTable } from "@/components/data-table";
// import { companyColumns } from "./company-columns";

import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";

export default async function CompanyPage() {
  // TODO: 데이터 페칭 로직
  // const data = await fetchCompanyData();
  return (
    <>
      <Header />
      <SectionTitle>회사 목록</SectionTitle>
      {/* <DataTable columns={companyColumns} data={data} /> */}
    </>
  );
}
