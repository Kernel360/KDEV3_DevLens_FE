import { Member } from "@/types/member";
import { dummyMembers } from "../mockData";

export async function fetchMemberData(): Promise<Member[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return dummyMembers;
}
