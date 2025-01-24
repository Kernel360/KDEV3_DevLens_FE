import ProjectList from "./_components/project-list";

import Header from "@/components/layout/Header";
import SectionTitle from "@/components/composites/section-title";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>구현 완료 기능</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-8 text-xs">
          <ul>
            <li>로그인/로그아웃</li>
            <li>내 정보 조회</li>
          </ul>
          <ul>
            <li>계정 목록 조회 - 필터링 x</li>
            <li>계정 생성</li>
          </ul>
          <ul>
            <li>회사 목록 조회 - 필터링 x</li>
            <li>회사 생성</li>
          </ul>
          <ul>
            <li>프로젝트 목록 조회 - 필터링 x</li>
            <li>프로젝트 생성</li>
          </ul>
        </CardContent>
      </Card>
      <Header />
      <div className="flex justify-between">
        <SectionTitle>내 프로젝트</SectionTitle>
      </div>
      <ProjectList />
    </>
  );
}
