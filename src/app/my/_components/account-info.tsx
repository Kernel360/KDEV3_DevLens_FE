"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Checkbox,
} from "@/components/ui";
import Heading from "@/components/ui/heading";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface UserInfo {
  name: string;
  id: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  position: string;
}

export default function AccountInfo() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "홍길동",
    id: "user123",
    email: "user@example.com",
    phone: "010-1234-5678",
    company: "tech-corp",
    department: "개발팀",
    position: "선임 개발자",
  });
  const [editingInfo, setEditingInfo] = useState<UserInfo>(userInfo);

  const companies = [
    { label: "테크 주식회사", value: "tech-corp" },
    { label: "테크 주식회사", value: "tech-corp" },
    { label: "테크 주식회사", value: "tech-corp" },
  ];

  const handleSave = () => {
    // TODO: API 호출하여 사용자 정보 업데이트
    setUserInfo(editingInfo);
    setIsEditDialogOpen(false);
  };

  const handleWithdraw = () => {
    // TODO: API 호출하여 회원 탈퇴 처리
    console.log("회원 탈퇴 처리");
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[100px_1fr] items-center py-2">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div>{value}</div>
    </div>
  );
  return (
    <section className="flex flex-col px-20">
      {/* 프로필 사진 */}
      <div className="mb-5 flex items-center gap-4">
        <div className="group relative self-start">
          <Avatar className="curs size-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="icon"
            className="absolute -bottom-2 -right-2 size-8 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Pencil className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Heading as="h3" size="md">
            {userInfo.name}
          </Heading>
          <p className="text-sm text-muted-foreground">
            {userInfo.department} / {userInfo.position}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingInfo(userInfo);
            setIsEditDialogOpen(true);
          }}
          className="self-end"
          variant="outline"
        >
          정보수정
        </Button>
      </div>

      {/* 기본 정보 */}

      <InfoRow label="아이디" value={userInfo.id} />
      <InfoRow label="이메일" value={userInfo.email} />
      <InfoRow label="전화번호" value={userInfo.phone} />
      <InfoRow
        label="소속 회사"
        value={
          companies.find((c) => c.value === userInfo.company)?.label ||
          userInfo.company
        }
      />

      {/* 내 프로젝트 */}
      {/* 회원 탈퇴 */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={handleWithdraw}
          >
            회원 탈퇴
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원 탈퇴</AlertDialogTitle>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              회원 탈퇴 시, 진행 중인 프로젝트가 일괄 삭제되며 프로젝트 접근
              대상에서 제외됩니다.
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    회원 탈퇴 이후 미완료된 프로젝트에 대해 열람하실 수 없음을
                    동의합니다.
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms2" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    회원 탈퇴를 진행하여 ‘DEVLENS’ 계정에 귀속된 모든 정보를
                    삭제하는 데 동의합니다.
                  </label>
                </div>
              </div>
              <br />
              *회원 탈퇴 시 위 내용에 동의한 것으로 간주합니다.
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleWithdraw}>
              회원 탈퇴
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
