import { GetCompanyMemberResponse } from "@/lib/api/generated/admin/models";
import {
  PostProjectAuthorizationCustomerMemberAuthorization,
  PostProjectAuthorizationDeveloperMemberAuthorization,
} from "@/lib/api/generated/main/models";
import { adminAxios } from "@/lib/axiosClient";
import { create } from "zustand";

type CompanyType = "customer" | "developer";
type MemberRole = "APPROVER" | "PARTICIPANT";

interface CompanyMember {
  memberId: number;
  memberName: string;
  department?: string;
  position?: string;
  email?: string;
}

interface MemberSection {
  members: CompanyMember[];
  selectedApprovers: CompanyMember[];
  selectedNormal: CompanyMember[];
  activeRole: MemberRole;
  isLoading: boolean;
  companyId?: number;
}

interface MemberState {
  customer: MemberSection;
  developer: MemberSection;
}

const createInitialSection = (): MemberSection => ({
  members: [],
  selectedApprovers: [],
  selectedNormal: [],
  activeRole: "APPROVER",
  isLoading: false,
  companyId: undefined,
});

export const useMemberStore = create<
  MemberState & {
    setMembers: (
      type: CompanyType,
      members: GetCompanyMemberResponse["companyMemberList"],
    ) => void;
    setLoading: (type: CompanyType, isLoading: boolean) => void;
    selectMember: (
      type: CompanyType,
      member: CompanyMember,
      role?: MemberRole,
    ) => void;
    removeMember: (
      type: CompanyType,
      role: MemberRole,
      memberId: number,
    ) => void;
    setActiveRole: (type: CompanyType, role: MemberRole) => void;
    reset: (type: CompanyType) => void;
    formatMemberLabel: (member: CompanyMember) => string;
    fetchMembers: (type: CompanyType, companyId: number) => Promise<void>;
    getAuthorizations: () => {
      customerAuthorizations: PostProjectAuthorizationCustomerMemberAuthorization[];
      developerAuthorizations: PostProjectAuthorizationDeveloperMemberAuthorization[];
    };
  }
>((set, get) => ({
  customer: createInitialSection(),
  developer: createInitialSection(),

  setMembers: (type, members) =>
    set((state) => ({
      [type]: { ...state[type], members },
    })),

  setLoading: (type, isLoading) =>
    set((state) => ({
      [type]: { ...state[type], isLoading },
    })),

  selectMember: (type: CompanyType, member: CompanyMember, role?: MemberRole) =>
    set((state) => {
      const section = state[type];
      const targetRole = role || section.activeRole;

      const isApprover = section.selectedApprovers.some(
        (m) => m.memberId === member.memberId,
      );
      const isNormal = section.selectedNormal.some(
        (m) => m.memberId === member.memberId,
      );

      if (
        (targetRole === "APPROVER" && isNormal) ||
        (targetRole === "PARTICIPANT" && isApprover)
      ) {
        return state;
      }

      const targetArray =
        targetRole === "APPROVER" ? "selectedApprovers" : "selectedNormal";
      const exists = section[targetArray].find(
        (m) => m.memberId === member.memberId,
      );

      return {
        [type]: {
          ...section,
          [targetArray]: exists
            ? section[targetArray].filter((m) => m.memberId !== member.memberId)
            : [...section[targetArray], member],
        },
      };
    }),

  removeMember: (type: CompanyType, role: MemberRole, memberId: number) =>
    set((state) => {
      const section = state[type] as MemberSection;
      const targetArray =
        role === "APPROVER" ? "selectedApprovers" : "selectedNormal";

      return {
        [type]: {
          ...section,
          [targetArray]: section[targetArray].filter(
            (m) => m.memberId !== memberId,
          ),
        },
      };
    }),

  setActiveRole: (type, role) =>
    set((state) => ({
      [type]: { ...state[type], activeRole: role },
    })),

  reset: (type) =>
    set((state) => ({
      [type]: {
        ...state[type],
        selectedApprovers: [],
        selectedNormal: [],
        activeRole: "APPROVER",
        companyId: undefined,
      },
    })),

  formatMemberLabel: (member) => {
    const extras = [];
    if (member.department) extras.push(member.department);
    if (member.position) extras.push(member.position);
    return extras.length > 0
      ? `${member.memberName} (${extras.join(" ")})`
      : member.memberName;
  },

  fetchMembers: async (type: CompanyType, companyId: number) => {
    set((state) => ({
      [type]: { ...state[type], companyId, isLoading: true },
    }));

    if (!companyId) {
      set((state) => ({
        [type]: { ...state[type], members: [], isLoading: false },
      }));
      return;
    }

    try {
      const response = await adminAxios<GetCompanyMemberResponse>({
        url: `/api/admin/companies/${companyId}/members`,
        method: "GET",
      });

      set((state) => {
        const section = state[type];

        const members = response.companyMemberList || [];

        return {
          [type]: {
            ...section,
            members,
            isLoading: false,
          },
        };
      });
    } catch (error) {
      set((state) => ({
        [type]: { ...state[type], members: [], isLoading: false },
      }));
      console.error(`Failed to fetch ${type} members:`, error);
    }
  },

  getAuthorizations: () => {
    const state = get();

    const formatAuthorizations = (type: CompanyType) => {
      const section = state[type];
      return [
        ...section.selectedApprovers.map((member) => ({
          memberId: member.memberId,
          memberName: member.memberName,
          memberType:
            type === "customer" ? ("CLIENT" as const) : ("DEVELOPER" as const),
          projectAuthorization: "APPROVER" as const,
        })),
        ...section.selectedNormal.map((member) => ({
          memberId: member.memberId,
          memberName: member.memberName,
          memberType:
            type === "customer" ? ("CLIENT" as const) : ("DEVELOPER" as const),
          projectAuthorization: "PARTICIPANT" as const,
        })),
      ];
    };

    return {
      customerAuthorizations: formatAuthorizations("customer"),
      developerAuthorizations: formatAuthorizations("developer"),
    };
  },
}));
