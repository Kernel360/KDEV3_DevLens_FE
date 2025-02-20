"use state";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@ui";
// import { EmailVerification } from "@/app/(protected)/my/_components/email-verification";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateMember } from "@/lib/api/generated/main/services/my-page-api/my-page-api";
import { MyPageGetMember } from "@/lib/api/generated/main/models";
import { useQueryClient } from "@tanstack/react-query";
import { getMemberDetailQueryKey } from "@/lib/api/generated/main/services/my-page-api/my-page-api";

interface EditAccountInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userInfo: MyPageGetMember;
}

export default function EditAccountInfoDialog({
  isOpen,
  onOpenChange,
  userInfo,
}: EditAccountInfoDialogProps) {
  const [editingInfo, setEditingInfo] = useState<MyPageGetMember>(userInfo);
  const { name, loginId, email, phoneNumber, department, position, company } =
    editingInfo;

  const queryClient = useQueryClient();

  const { mutate: updateMember } = useUpdateMember({
    mutation: {
      onSuccess: () => {
        toast.success("회원 정보가 수정되었습니다.");
        queryClient.invalidateQueries({ queryKey: getMemberDetailQueryKey() });
        onOpenChange(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "회원 정보 수정에 실패했습니다.");
      },
    },
  });

  const handleSave = () => {
    updateMember({
      data: {
        email,
        phoneNumber,
        department,
        position,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>회원 정보 수정</DialogTitle>
          <DialogDescription>수정할 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" value={name} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id">아이디</Label>
            <Input id="id" value={loginId} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email || ""}
              onChange={(e) =>
                setEditingInfo({ ...editingInfo, email: e.target.value })
              }
            />
            {/* <EmailVerification /> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">소속 회사</Label>
            <Input id="company" value={company} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor=" phoneNumber">전화번호</Label>
            <Input
              id=" phoneNumber"
              type="tel"
              value={phoneNumber || ""}
              onChange={(e) =>
                setEditingInfo({
                  ...editingInfo,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">부서</Label>
              <Input
                id="department"
                value={department || ""}
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
                value={position || ""}
                onChange={(e) =>
                  setEditingInfo({ ...editingInfo, position: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
