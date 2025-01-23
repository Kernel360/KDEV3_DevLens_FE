"use client";

import { useQuery } from "@tanstack/react-query";
import { InfoRow } from "@/components/composites/info-row";
import { adminCompanyApi } from "@/lib/apis/admin/adminCompanyApi";

interface CompanyDetailProps {
  id: number;
}

export default function CompanyDetail({ id }: CompanyDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: () => adminCompanyApi.getDetail(id),
    enabled: !!id,
  });

  if (isLoading || !data) return null;

  return (
    <div className="space-y-4">
      <InfoRow label="회사명" value={data.companyName} />
      <InfoRow label="대표자명" value={data.representativeName} />
      <InfoRow label="대표자 연락처" value={data.representativeContact} />
      <InfoRow label="대표자 이메일" value={data.representativeEmail} />
      <InfoRow label="주소" value={data.address} />
      <InfoRow label="사업자 구분" value={data.businessType} />
      <InfoRow
        label="사업자 등록번호"
        value={data.businessRegistrationNumber}
      />
      <InfoRow label="활성화 상태" value={data.isActive} />
    </div>
  );
}
