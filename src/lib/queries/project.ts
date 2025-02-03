import { QueryClient } from "@tanstack/react-query";
import { ProjectApi } from "../apis/main/projectApi";

export const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
} as const;

export async function prefetchProjects(queryClient: QueryClient) {
  const data = await ProjectApi.getList();
  await queryClient.prefetchQuery({
    queryKey: projectKeys.list(),
    queryFn: () => data,
  });
  return data;
}
