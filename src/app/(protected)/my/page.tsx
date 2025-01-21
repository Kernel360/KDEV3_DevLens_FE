import SectionTitle from "@/components/composites/section-title";
import AccountInfo from "./_components/account-info";
import Header from "@/components/layout/Header";

export default function MyPage() {
  return (
    <div className="mx-auto flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <AccountInfo />
    </div>
  );
}
