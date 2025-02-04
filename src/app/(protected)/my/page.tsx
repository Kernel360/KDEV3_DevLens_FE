import SectionTitle from "@/components/composites/section-title";
import Header from "@/components/layout/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui";
// import FetchAccount from "./_components/fetch-account";

export default function MyPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <Card>
        <CardHeader>
          <CardTitle>준비중</CardTitle>
        </CardHeader>
      </Card>   
      {/* <FetchAccount /> */}
    </div>
  );
}
