export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  return (
    <>
      <h1>{memberId} 멤버 조회</h1>
    </>
  );
}
