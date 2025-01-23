import SectionTitle from "@/components/composites/section-title";
import AccountInfo from "./_components/account-info";
import Header from "@/components/layout/Header";
import { userApi } from "@/lib/apis/main/userApi";
import { getCurrentUser } from "@/lib/session";

export default async function MyPage() {
  const session = await getCurrentUser();
  const [userInfo, avatar] = await Promise.all([
    userApi.getDetail(session.loginId),
    userApi.getProfileImage(11),
  ]);
  return (
    <div className="flex flex-col">
      <Header />
      <SectionTitle>마이페이지</SectionTitle>
      <AccountInfo userInfo={userInfo} avatar={avatar} />
    </div>
  );
}
