"use client";

import { Input } from "@ui";
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
import { useCreateMembers } from "@/lib/api/generated/admin/services/administrator-member-management-api/administrator-member-management-api";
import type { MemberDtoRequest } from "@/lib/api/generated/admin/models";

const SAMPLE_DATA = [
  {
    companyId: 1,
    loginId: "testuser1",
    password: "test1234!",
    name: "테스트유저1",
    email: "test1@example.com",
    role: "USER",
    phoneNumber: "010-0000-0000",
    birthDate: "2000-01-01",
    department: "개발팀",
    position: "사원",
  },
];

interface CSVRow {
  companyId: string;
  loginId: string;
  password: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  birthDate: string;
  department?: string;
  position?: string;
}

const TABLE_COLUMNS = [
  { key: "companyId" as const, label: "회사ID", width: "w-[10%]" },
  { key: "name" as const, label: "이름", width: "w-[12%]" },
  { key: "loginId" as const, label: "로그인ID", width: "w-[15%]" },
  { key: "password" as const, label: "초기 비밀번호", width: "w-[18%]" },
  { key: "email" as const, label: "이메일", width: "w-[20%]" },
  { key: "phoneNumber" as const, label: "전화번호", width: "w-[15%]" },
  { key: "role" as const, label: "권한", width: "w-[10%]" },
] as const;
export default function BatchMembersButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<MemberDtoRequest[]>([]);

  const createMembersMutation = useCreateMembers();

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
          const parsedData = (results.data as CSVRow[]).map((item) => ({
            companyId: Number(item.companyId),
            loginId: item.loginId,
            password: item.password,
            name: item.name,
            email: item.email,
            role: item.role,
            phoneNumber: item.phoneNumber,
            birthDate: item.birthDate,
            department: item.department || undefined,
            position: item.position || undefined,
          })) as MemberDtoRequest[];

          const isValid = parsedData.every(
            (item) =>
              item.loginId &&
              item.password &&
              item.name &&
              item.email &&
              item.role &&
              item.phoneNumber &&
              item.birthDate &&
              item.companyId,
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
      await createMembersMutation.mutateAsync({ data: previewData });
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
      <DialogContent className="w-full sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>유저 일괄생성</DialogTitle>
          <DialogDescription className="w-full">
            CSV 파일을 업로드하여 여러 유저를 한번에 생성합니다. 필수 필드:
            로그인ID, 초기 비밀번호, 이름, 이메일, 역할, 전화번호, 생년월일
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
          <div className="mt-4 w-full overflow-y-scroll">
            <h3 className="mb-2 text-sm font-medium">
              미리보기 ({previewData.length}명)
            </h3>
            <div className="overflow-x-auto overflow-y-auto rounded border">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {TABLE_COLUMNS.map(({ label, width }) => (
                      <th
                        key={label}
                        className={`${width} flex-1 truncate px-3 py-2 text-left text-xs font-medium text-gray-500`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {previewData.map((user, index) => (
                    <tr key={index}>
                      {TABLE_COLUMNS.map(({ key, width }) => (
                        <td
                          key={key}
                          className={`${width} flex-1 truncate px-3 py-2 text-sm`}
                          title={user[key]?.toString()}
                        >
                          {user[key]}
                        </td>
                      ))}
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
