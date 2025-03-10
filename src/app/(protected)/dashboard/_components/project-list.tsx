import SectionTitle from "@/components/composites/section-title";
import { Card, CardHeader, CardTitle } from "@ui";
import { useEffect, useMemo } from "react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "./project-card";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { GetMyProjectListGetMyProjectResponseInfo } from "@/lib/api/generated/main/models";
import { useScheduleStore } from "@/store/useScheduleStore";

interface ProjectListProps {
  projects: GetMyProjectListGetMyProjectResponseInfo[];
  title: "내 프로젝트" | "진행 중 프로젝트";
}

export default function ProjectList({ projects, title }: ProjectListProps) {
  // 6개씩 페이지 나누기
  const projectPages = useMemo(() => {
    const itemsPerPage = 6;
    return projects.reduce<GetMyProjectListGetMyProjectResponseInfo[][]>(
      (acc, curr, i) => {
        const pageIndex = Math.floor(i / itemsPerPage);
        acc[pageIndex] = acc[pageIndex] || [];
        acc[pageIndex].push(curr);
        return acc;
      },
      [],
    );
  }, [projects]);

  const setProjectSchedules = useScheduleStore(
    (state) => state.setProjectSchedules,
  );

  // projects가 변경될 때마다 스케줄 업데이트
  useEffect(() => {
    setProjectSchedules(projects);
  }, [projects, setProjectSchedules]);

  if (!projects?.length) {
    return (
      <>
        <SectionTitle>{title}</SectionTitle>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-center text-base text-muted-foreground">
                {title === "내 프로젝트"
                  ? "참여 중인 프로젝트가 없습니다"
                  : "현재 진행중인 프로젝트가 없습니다"}
              </CardTitle>
            </CardHeader>
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          pagination={{
            el: ".project-pagination",
            clickable: true,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          spaceBetween={16}
          className="project-swiper !pb-8"
        >
          {projectPages.map((pageProjects, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                {pageProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
                <div className="hidden lg:contents">
                  {[...Array(6 - pageProjects.length)].map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="invisible"
                      aria-hidden="true"
                    >
                      <Card className="opacity-0">
                        <CardHeader>
                          <CardTitle>빈 카드</CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="project-pagination absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-1 text-sm text-muted-foreground [&_.swiper-pagination-bullet-active]:bg-primary" />
        </Swiper>
      </div>
    </>
  );
}
