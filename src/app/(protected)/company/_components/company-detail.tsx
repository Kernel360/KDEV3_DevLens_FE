"use client";

import { useQuery } from "@tanstack/react-query";
import { InfoRow } from "@/components/composites/info-row";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Edit2, Save } from "lucide-react";
import { Company } from "@/types/company";

export default function CompanyDetail({ id }: { id: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Company>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: () => adminCompanyApi.getDetail(id),
    enabled: !!id,
  });

  if (isLoading || !data) return null;

  const handleValueChange = (key: keyof Company, value: string) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      // TODO: API 호출로 데이터 저장
      console.log("Saving:", editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {isEditing ? (
          <Button onClick={handleSave} variant="default" className="gap-2">
            <Save className="h-4 w-4" />
            저장
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            수정
          </Button>
        )}
      </div>

      {/* 기본 정보 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">기본 정보</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <InfoRow
              label="회사명"
              value={data.companyName}
              isEditing={isEditing}
              onValueChange={(value) => handleValueChange("companyName", value)}
            />
            <InfoRow
              label="사업자 구분"
              value={data.businessType}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("businessType", value)
              }
            />
            <InfoRow
              label="사업자 등록번호"
              value={data.businessRegistrationNumber}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("businessRegistrationNumber", value)
              }
            />
            <InfoRow
              label="주소"
              value={data.address}
              isEditing={isEditing}
              onValueChange={(value) => handleValueChange("address", value)}
            />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 대표자 정보 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">대표자 정보</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <InfoRow
              label="대표자명"
              value={data.representativeName}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("representativeName", value)
              }
            />
            <InfoRow
              label="연락처"
              value={data.representativeContact}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("representativeContact", value)
              }
            />
            <InfoRow
              label="이메일"
              value={data.representativeEmail}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("representativeEmail", value)
              }
            />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 상태 정보 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">상태 정보</h2>
        <Card>
          <CardContent className="pt-6">
            <InfoRow
              label="활성화 상태"
              value={data.isActive ? "활성" : "비활성"}
              valueClassName={
                data.isActive ? "text-success" : "text-destructive"
              }
              isEditing={isEditing}
              onValueChange={(value) => handleValueChange("isActive", value)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
