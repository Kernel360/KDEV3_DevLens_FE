import { adminMemberApi } from "@/lib/apis/admin/adminMemberApi";
import { useQuery } from "@tanstack/react-query";

export default function MemberDetail({ id }: { id: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["memberDetail", id],
    queryFn: () => adminMemberApi.getDetail(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <>
      <h1>MemberDetail {id}</h1>
    </>
  );
}
