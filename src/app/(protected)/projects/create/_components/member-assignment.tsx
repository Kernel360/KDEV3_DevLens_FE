import SectionTitle from "@/components/composites/section-title";
import { useMemberStore } from "@/store/useMemberAssignStore";
import { HandleMemberAssignment } from "./handle-member-assignment";
import { useEffect } from "react";

interface MemberAssignmentProps {
  customerId: number;
  developerId: number;
}

export function MemberAssignment({
  customerId,
  developerId,
}: MemberAssignmentProps) {
  const store = useMemberStore();

  useEffect(() => {
    // 컴포넌트 마운트 시 초기화
    store.reset("customer");
    store.reset("developer");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  useEffect(() => {
    if (customerId) {
      // customerId가 변경될 때마다 해당 타입만 초기화 후 데이터 조회
      store.reset("customer");
      store.fetchMembers("customer", customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    if (developerId) {
      // developerId가 변경될 때마다 해당 타입만 초기화 후 데이터 조회
      store.reset("developer");
      store.fetchMembers("developer", developerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developerId]);

  return (
    <div className="space-y-8">
      <SectionTitle>프로젝트 멤버 할당</SectionTitle>

      <HandleMemberAssignment type="customer" title="고객사" />

      <HandleMemberAssignment type="developer" title="개발사" />
    </div>
  );
}
