export default function ProjectDetailPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const { projectId } = params;

  return (
    <>
      <h1>{projectId} 프로젝트 단계설정</h1>
    </>
  );
}
