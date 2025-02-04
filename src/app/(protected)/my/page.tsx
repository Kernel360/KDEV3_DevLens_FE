import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import FetchAccount from "./_components/fetch-account";

export const dynamic = "force-dynamic";

export default function MyPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <FetchAccount />
    </div>
  );
}
