import SectionTitle from "@/components/composites/section-title";
import AccountInfo from "./_components/account-info";
import Header from "@/components/layout/Header";
import { Suspense } from "react";

export default function MyPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountInfo />
      </Suspense>
    </div>
  );
}
