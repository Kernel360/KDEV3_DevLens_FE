import { useEffect } from "react";
import { useMemberStore } from "@/store/useMemberAssignStore";
import { HandleMemberAssignment } from "./handle-member-assignment";
import SectionTitle from "@/components/composites/section-title";
import { GetMemberByCompanyResponse } from "@/types/project";

interface MemberAssignmentProps {
  customerId: number;
  developerId: number;
}

export function MemberAssignment({
  customerId,
  developerId,
}: MemberAssignmentProps) {
  const store = useMemberStore();

  // Mock API 호출 (실제 API로 교체 예정)
  const getMemberByCompany = async (
    type: "customer" | "developer",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    companyId: number,
  ): Promise<GetMemberByCompanyResponse[]> => {
    const mockData = {
      customer: [
        {
          memberId: "c1",
          memberName: "고객사 멤버 1",
          department: "영업",
          position: "매니저",
        },
        {
          memberId: "c2",
          memberName: "고객사 멤버 2",
          department: "마케팅",
          position: "담당자",
        },
        {
          memberId: "c3",
          memberName: "고객사 멤버 3",
          department: "인사",
          position: "HR",
        },
      ],
      developer: [
        {
          memberId: "d1",
          memberName: "개발사 멤버 1",
          department: "개발",
          position: "엔지니어",
        },
        { memberId: "d2", memberName: "개발사 멤버 2" },
        {
          memberId: "d3",
          memberName: "개발사 멤버 3",
          department: "QA",
          position: "테스터",
        },
      ],
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData[type]);
      }, 500);
    });
  };

  // 고객사 멤버 로딩
  useEffect(() => {
    if (customerId) {
      store.setLoading("customer", true);
      getMemberByCompany("customer", customerId)
        .then((data: GetMemberByCompanyResponse[]) => {
          const extendedData = data.map((item) => ({
            ...item,
            company: "customer" as const,
          }));
          store.setMembers("customer", extendedData);
        })
        .catch((err) => {
          console.error("Failed to fetch customer members:", err);
        })
        .finally(() => {
          store.setLoading("customer", false);
        });
    }
  }, [customerId]);

  // 개발사 멤버 로딩
  useEffect(() => {
    if (developerId) {
      store.setLoading("developer", true);
      getMemberByCompany("developer", developerId)
        .then((data: GetMemberByCompanyResponse[]) => {
          const extendedData = data.map((item) => ({
            ...item,
            company: "developer" as const,
          }));
          store.setMembers("developer", extendedData);
        })
        .catch((err) => {
          console.error("Failed to fetch developer members:", err);
        })
        .finally(() => {
          store.setLoading("developer", false);
        });
    }
  }, [developerId]);

  return (
    <div className="space-y-8">
      <SectionTitle>프로젝트 멤버 할당</SectionTitle>

      <HandleMemberAssignment
        type="developer"
        title="개발사"
        section={store.developer}
        store={store}
      />

      <HandleMemberAssignment
        type="customer"
        title="고객사"
        section={store.customer}
        store={store}
      />
    </div>
  );
}
