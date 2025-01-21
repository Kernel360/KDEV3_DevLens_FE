"use client";

import { EmailVerification } from "@/app/(protected)/my/_components/email-verification";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
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

      {/* 정보수정 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>회원 정보 수정</DialogTitle>
            <DialogDescription>수정할 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">아이디</Label>
              <Input
                id="id"
                value={editingInfo.id}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={editingInfo.email}
                onChange={(e) =>
                  setEditingInfo({ ...editingInfo, email: e.target.value })
                }
              />
              <EmailVerification />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                type="tel"
                value={editingInfo.phone}
                onChange={(e) =>
                  setEditingInfo({ ...editingInfo, phone: e.target.value })
                }
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="company">소속 회사</Label>
              <CompanySelect
                value={editingInfo.company}
                onChange={(value) =>
                  setEditingInfo({ ...editingInfo, company: value })
                }
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">부서</Label>
                <Input
                  id="department"
                  value={editingInfo.department}
                  onChange={(e) =>
                    setEditingInfo({
                      ...editingInfo,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">직책</Label>
                <Input
                  id="position"
                  value={editingInfo.position}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, position: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* 기본 정보 */}
      <InfoRow label="아이디" value={userInfo.id} />
      <InfoRow label="이메일" value={userInfo.email} />
      <InfoRow label="전화번호" value={userInfo.phone} />
      <InfoRow label="소속 회사" value={userInfo.company} />

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
        <AlertDialogContent className="max-w-xl">
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
