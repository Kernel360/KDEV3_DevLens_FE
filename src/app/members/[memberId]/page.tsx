export default function MemberDetailPage({
  params,
}: {
  params: {
    memberId: string;
  };
}) {
  const { memberId } = params;

  return (
    <>
      <h1>{memberId} 멤버 조회</h1>
    </>
  );
}
