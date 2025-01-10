import SectionTitle from "@/components/section-title";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { Pencil } from "lucide-react";

export default function MyPage() {
  return (
    <>
      <SectionTitle>마이페이지</SectionTitle>
      {/* 프로필 사진 */}
      <div className="flex items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </div>
      {/* 기본 정보 */}
      {/* 내 프로젝트 */}
      {/* 회원 탈퇴 */}
    </>
  );
}
