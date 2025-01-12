import SectionTitle from "@/components/section-title";
import AccountInfo from "./_components/account-info";

export default function MyPage() {
  return (
    <div className="mx-auto flex flex-col">
      <SectionTitle>마이페이지</SectionTitle>
      <AccountInfo />
    </div>
  );
}
