import { mainAxios } from "@/lib/axiosClient";
import { cookies } from "next/headers";
import ProjectDetailContent from "./_components/project-detail-content";
import ProjectHeader from "./_components/project-header";
import { APIError } from "@/types/common";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useAuthorizationStore } from "@/store/authorizationStore";
import type { APIResponseGetMemberAuthorizationResponse } from "@/lib/api/generated/main/models";

type PageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ step: string }>;
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: PageProps) {
  const projectId = Number((await params).projectId);
  const stepParam = (await searchParams).step;

  // 쿠키를 비동기적으로 가져오기
  const cookieHeader = await cookies();

  try {
    // 서버에서 멤버 권한 데이터 가져오기
    const memberAuthorization = await mainAxios<
      APIResponseGetMemberAuthorizationResponse["data"]
    >({
      url: `/api/projects/${projectId}/authorizations/members`,
      method: "GET",
      headers: {
        Cookie: cookieHeader.toString(), // 쿠키를 헤더에 포함
      },
    });

    if (memberAuthorization) {
      // authorization 값 가져오기

      // zustand 스토어에 authorization 값 설정
      const setAuthorization =
        useAuthorizationStore.getState().setAuthorization;
      setAuthorization(memberAuthorization.authorization!);
    } else {
      // memberAuthorization이 undefined인 경우 처리
      console.error("Authorization data is undefined");
    }

    return (
      <>
        <ProjectHeader projectId={projectId} />
        {/* <HydrationBoundary state={dehydratedState}> */}
        <ProjectDetailContent projectId={projectId} currentStepId={stepParam} />
        {/* </HydrationBoundary> */}
      </>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 400) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <div className="text-2xl font-bold">{error.message}</div>
          <Link href="/dashboard">
            <Button variant="outline">대시보드로 돌아가기</Button>
          </Link>
        </div>
      );
    }
    // 다른 에러 처리
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">
          알 수 없는 오류가 발생했습니다.
        </div>
        <Link href="/dashboard">
          <Button variant="outline">대시보드로 돌아가기</Button>
        </Link>
      </div>
    );
  }
}
