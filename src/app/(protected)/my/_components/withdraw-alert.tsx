"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Checkbox,
} from "@ui";

export default function WithdrawAlert() {
  const handleWithdraw = () => {
    // TODO: API 호출하여 회원 탈퇴 처리
    console.log("회원 탈퇴 처리");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          className="w-fit text-muted-foreground self-center"
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
  );
}
