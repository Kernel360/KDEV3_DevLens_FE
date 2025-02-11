import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import AccountInfo from "./_components/account-info";

export default function MyPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <AccountInfo />
    </div>
  );
}
