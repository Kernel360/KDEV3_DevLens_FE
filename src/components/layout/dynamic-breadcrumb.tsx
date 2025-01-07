"use client";

import { usePathname } from "next/navigation";
import { ROUTE_CONFIG } from "@/lib/constants/routes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // 현재 경로에 맞는 설정 찾기
  const currentRoute = Object.entries(ROUTE_CONFIG).find(([key]) => {
    // 동적 라우트의 경우 [id]를 실제 값으로 치환하여 비교
    const routePattern = key.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(pathname);
  });

  if (!currentRoute) return null;

  const [, config] = currentRoute;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {config.breadcrumb.parent && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                {config.breadcrumb.parent}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{config.breadcrumb.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
