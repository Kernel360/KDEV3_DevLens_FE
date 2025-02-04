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
import { User } from "@/types/user";
import { CompanySelect } from "./company-select";
import { toast } from "sonner";

interface EditAccountInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userInfo: User;
}

export default function EditAccountInfoDialog({
  isOpen,
  onOpenChange,
  userInfo,
}: EditAccountInfoDialogProps) {
  const [editingInfo, setEditingInfo] = useState<User>(userInfo);
  const { name, loginId, email, phoneNumber, department, position } =
    editingInfo;

  const handleSave = () => {
    // TODO: API 호출하여 사용자 정보 업데이트
    // setUserInfo(editingInfo);
    toast.error("기능 업데이트 예정입니다.");
    // onOpenChange(false);
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
            <CompanySelect
              value={editingInfo.company ? Number(editingInfo.company) : null}
              onChange={(value) =>
                setEditingInfo({
                  ...editingInfo,
                  company: value ? String(value) : "",
                })
              }
            />
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
