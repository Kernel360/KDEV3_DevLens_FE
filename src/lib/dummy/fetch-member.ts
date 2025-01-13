import { Member } from "@/types/member";

export async function fetchMemberData(): Promise<Member[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const dummyMembers: Member[] = [
    {
      id: 1,
      loginId: "john.doe",
      name: "John Doe",
      email: "john@example.com",
      role: "USER",
      status: "ACTIVE",
      profileImageExists: "N",
      phoneNumber: "010-1234-5678",
      birthDate: "1990-01-01",
      departmentId: 1,
      positionId: 1,
    },
    // ... 더미 데이터
  ];

  return dummyMembers;
}
