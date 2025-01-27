"use client";

import { InfoRow } from "@/components/composites/info-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminProjectApi } from "@/lib/apis/admin/adminProjectApi";
import { getStatusVariant } from "@/lib/utils";
import { getStatusLabel } from "@/lib/utils";
import { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Save } from "lucide-react";
import { useState } from "react";

export default function ProjectDetail({ id }: { id: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Project>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["projectDetail", id],
    queryFn: () => adminProjectApi.getDetail(id),
    enabled: !!id,
  });

  if (isLoading || !data) return null;

  const handleValueChange = (key: keyof Project, value: string) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
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

      {/* 프로젝트 기본 정보 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">기본 정보</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <InfoRow
              label="프로젝트명"
              value={data.projectName}
              isEditing={isEditing}
              onValueChange={(value) => handleValueChange("projectName", value)}
            />
            <InfoRow
              label="상태"
              value={
                <Badge variant={getStatusVariant(data.projectStatusCode)}>
                  {getStatusLabel(data.projectStatusCode)}
                </Badge>
              }
            />
            <InfoRow
              label="계약번호"
              value={data.contractNumber}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("contractNumber", value)
              }
            />
            <InfoRow
              label="프로젝트 유형"
              value={data.projectTypeName}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("projectTypeName", value)
              }
            />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 참여 기업 정보 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">참여 기업</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <InfoRow
              label="고객사"
              value={data.customerName}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("customerName", value)
              }
            />
            <InfoRow
              label="개발사"
              value={data.developerName}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("developerName", value)
              }
            />
            <InfoRow
              label="BNS 담당자"
              value={data.bnsManagerName}
              isEditing={isEditing}
              onValueChange={(value) =>
                handleValueChange("bnsManagerName", value)
              }
            />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 프로젝트 일정 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">프로젝트 일정</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <InfoRow
                  label="계획 시작일"
                  value={data.plannedStartDate}
                  isEditing={isEditing}
                  onValueChange={(value) =>
                    handleValueChange("plannedStartDate", value)
                  }
                />
                <InfoRow
                  label="계획 종료일"
                  value={data.plannedEndDate}
                  isEditing={isEditing}
                  onValueChange={(value) =>
                    handleValueChange("plannedEndDate", value)
                  }
                />
              </div>
              <div className="space-y-4">
                <InfoRow
                  label="실제 시작일"
                  value={data.startDate || "미정"}
                  valueClassName={
                    !data.startDate ? "text-muted-foreground" : ""
                  }
                  isEditing={isEditing}
                  onValueChange={(value) =>
                    handleValueChange("startDate", value)
                  }
                />
                <InfoRow
                  label="실제 종료일"
                  value={data.endDate || "미정"}
                  valueClassName={!data.endDate ? "text-muted-foreground" : ""}
                  isEditing={isEditing}
                  onValueChange={(value) => handleValueChange("endDate", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 프로젝트 설명 */}
      {data.projectDescription && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-lg font-semibold">프로젝트 설명</h2>
            <Card>
              <CardContent className="pt-6">
                <InfoRow
                  label="설명"
                  value={data.projectDescription}
                  isEditing={isEditing}
                  onValueChange={(value) =>
                    handleValueChange("projectDescription", value)
                  }
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
