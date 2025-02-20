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
    if (customerId) {
      store.fetchMembers("customer", customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    if (developerId) {
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
