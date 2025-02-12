"use client";

import { Input } from "@ui";
import { adminMemberApi } from "@/lib/apis/admin/adminMemberApi";
import type { BatchMemberFormValues } from "@/types/member";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui";
import { Download, FileSpreadsheet } from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_DATA: BatchMemberFormValues[] = [
  {
    loginId: "testuser1",
    name: "테스트유저1",
    email: "test1@example.com",
    role: "USER",
    phoneNumber: "010-0000-0000",
    birthDate: "2000-01-01",
    department: "개발팀",
    position: "사원",
    companyId: 1,
  },
];

export default function BatchMembersButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<BatchMemberFormValues[]>([]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setPreviewData([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          // CSV 데이터 검증 및 companyId를 숫자로 변환
          const parsedData = (results.data as BatchMemberFormValues[]).map(
            (item) => ({
              ...item,
              companyId: Number(item.companyId),
            }),
          );

          const isValid = parsedData.every(
            (item) =>
              item.loginId &&
              item.name &&
              item.email &&
              item.role &&
              item.phoneNumber &&
              item.birthDate &&
              !isNaN(item.companyId), // companyId가 유효한 숫자인지 확인
          );

          if (!isValid) {
            throw new Error(
              "필수 필드가 누락되었거나 회사 ID가 유효하지 않습니다.",
            );
          }

          setPreviewData(parsedData);
        } catch (error) {
          toast.error(
            `CSV 파일 형식이 올바르지 않습니다. 필수 필드를 확인해주세요. ${error instanceof Error ? error.message : ""}`,
          );
        }
      },
      error: () => {
        toast.error("CSV 파일을 파싱하는데 실패했습니다.");
      },
    });
  };

  const handleSubmit = async () => {
    if (previewData.length === 0) return;

    setIsLoading(true);
    try {
      await adminMemberApi.batchMembers(previewData);
      toast.success("사용자가 성공적으로 생성되었습니다.");
      setOpen(false);
      setPreviewData([]);
    } catch (error) {
      toast.error(
        `사용자 생성에 실패했습니다. 다시 시도해주세요. ${error instanceof Error ? error.message : ""}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleCsv = () => {
    const headers = Object.keys(SAMPLE_DATA[0]).join(",");
    const values = SAMPLE_DATA.map((row) => Object.values(row).join(",")).join(
      "\n",
    );
    const csvContent = `${headers}\n${values}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-members.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <FileSpreadsheet className="size-4" />
          일괄 생성
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>유저 일괄생성</DialogTitle>
          <DialogDescription>
            CSV 파일을 업로드하여 여러 유저를 한번에 생성합니다. 필수 필드:
            로그인ID, 이름, 이메일, 역할, 전화번호, 생년월일
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
            <Button
              variant="outline"
              onClick={downloadSampleCsv}
              disabled={isLoading}
            >
              <Download className="size-4" />
              샘플 CSV 다운로드
            </Button>
          </div>
        </div>
        {previewData.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-medium">
              미리보기 ({previewData.length}명)
            </h3>
            <div className="max-h-60 overflow-auto rounded border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      이메일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      로그인ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {previewData.map((user, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {user.loginId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setPreviewData([]);
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || previewData.length === 0}
          >
            {isLoading ? "생성 중..." : "생성하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
