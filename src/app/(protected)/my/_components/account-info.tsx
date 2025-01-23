"use client";

import { InfoRow } from "@/components/composites/info-row";
import { UserAvatar } from "@/components/composites/user-avatar";
import Heading from "@/components/ui/heading";
import { User } from "@/types/user";
import { Button, Card } from "@ui";
import { useState } from "react";
import EditAccountInfoDialog from "./edit-account-info-dialog";
import EditAvatarButton from "./edit-avatar-button";
import WithdrawAlert from "./withdraw-alert";

interface AccountInfoProps {
  userInfo: User;
  avatar?: string;
}

export default function AccountInfo({ userInfo, avatar }: AccountInfoProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { name, loginId, email, phoneNumber, company, department, position } =
    userInfo;


  return (
    <section className="flex w-full flex-col">
      {/* 프로필 사진 */}
      <Card className="mb-5 flex w-full items-center gap-4 p-6">
        <div className="group relative self-start">
          <UserAvatar name={name} imageSrc={avatar} className="size-20" />
          <EditAvatarButton />
        </div>
        <div className="flex grow flex-col gap-3">
          <Heading as="h3" size="md">
            {name}
          </Heading>
          <div className="flex gap-2 text-sm">
            <p>{company}</p>
            {(department || position) && (
              <p className="inline-block text-sm text-muted-foreground">
                {department}
                {department && position && " / "}
                {position}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={() => {
            setIsEditDialogOpen(true);
          }}
        >
          수정
        </Button>
      </Card>

      {/* 정보수정 모달 */}
      <EditAccountInfoDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        userInfo={userInfo}
      />
      {/* 기본 정보 */}
      <InfoRow label="아이디" value={loginId} />
      <InfoRow label="이메일" value={email} />
      <InfoRow label="전화번호" value={phoneNumber} />

      {/* 내 프로젝트 */}
      {/* 회원 탈퇴 */}
      <WithdrawAlert />
    </section>
  );
}
