import SectionTitle from "@/components/composites/section-title";
import { Project } from "@/types/project";
import { Card, CardHeader, CardTitle } from "@ui";
import { useMemo } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "./project-card";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function ProjectList({
  projects,
  title,
}: {
  projects: Project[];
  title: "내 프로젝트" | "회사 프로젝트";
}) {
  // 6개씩 페이지 나누기
  const projectPages = useMemo(() => {
    const itemsPerPage = 6;
    return projects.reduce((acc, curr, i) => {
      const pageIndex = Math.floor(i / itemsPerPage);
      acc[pageIndex] = acc[pageIndex] || [];
      acc[pageIndex].push(curr);
      return acc;
    }, [] as Project[][]);
  }, [projects]);

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
          modules={[Navigation, Pagination]}
          pagination={{
            el: ".project-pagination",
            clickable: true,
          }}
          spaceBetween={16}
          className="project-swiper !pb-8"
        >
          {projectPages.map((pageProjects, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pageProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
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
            </SwiperSlide>
          ))}
          <div className="project-pagination absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-1 text-sm text-muted-foreground [&_.swiper-pagination-bullet-active]:bg-primary" />
        </Swiper>
      </div>
    </>
  );
}
