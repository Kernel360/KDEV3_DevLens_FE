import { GetCompanyMemberResponse } from "@/lib/api/generated/admin/models";
import { adminAxios } from "@/lib/axiosClient";
import {
  CompanyType,
  ExtendedMember,
  MemberRole,
  MemberState,
} from "@/types/project";
import { create } from "zustand";

const createInitialSection = () => ({
  members: [],
  selectedApprovers: [],
  selectedNormal: [],
  activeRole: "approver" as const,
  isLoading: false,
  companyId: undefined as number | undefined,
});

export const useMemberStore = create<
  MemberState & {
    setMembers: (type: CompanyType, members: ExtendedMember[]) => void;
    setLoading: (type: CompanyType, isLoading: boolean) => void;
    selectMember: (type: CompanyType, member: ExtendedMember) => void;
    removeMember: (
      type: CompanyType,
      role: MemberRole,
      memberId: string,
    ) => void;
    setActiveRole: (type: CompanyType, role: MemberRole) => void;
    reset: (type: CompanyType) => void;
    formatMemberLabel: (member: ExtendedMember) => string;
    fetchMembers: (type: CompanyType, companyId: number) => Promise<void>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>((set, get) => ({
  developer: createInitialSection(),
  customer: createInitialSection(),

  setMembers: (type, members) =>
    set((state) => ({
      [type]: { ...state[type], members },
    })),

  setLoading: (type, isLoading) =>
    set((state) => ({
      [type]: { ...state[type], isLoading },
    })),

  selectMember: (type, member) =>
    set((state) => {
      const section = state[type];
      const { activeRole } = section;

      if (!activeRole) return state;

      const isApprover = section.selectedApprovers.some(
        (m) => m.memberId === member.memberId,
      );
      const isNormal = section.selectedNormal.some(
        (m) => m.memberId === member.memberId,
      );

      if (
        (activeRole === "approver" && isNormal) ||
        (activeRole === "normal" && isApprover)
      ) {
        return state;
      }

      const targetArray =
        activeRole === "approver" ? "selectedApprovers" : "selectedNormal";
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

  removeMember: (type, role, memberId) =>
    set((state) => ({
      [type]: {
        ...state[type],
        [role === "approver" ? "selectedApprovers" : "selectedNormal"]: state[
          type
        ][role === "approver" ? "selectedApprovers" : "selectedNormal"].filter(
          (m) => m.memberId !== memberId,
        ),
      },
    })),

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
        activeRole: "approver",
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

  fetchMembers: async (type, companyId) => {
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

      set((state) => ({
        [type]: {
          ...state[type],
          members: response.companyMemberList || [],
          isLoading: false,
        },
      }));
    } catch (error) {
      set((state) => ({
        [type]: { ...state[type], members: [], isLoading: false },
      }));
      console.error(`Failed to fetch ${type} members:`, error);
    }
  },
}));
