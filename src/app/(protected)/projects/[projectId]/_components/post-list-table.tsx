"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { PostApi } from "@/lib/apis/main/postApi";
import TableTools from "@/components/composites/table/table-tools";
import { postListColumns } from "./post-list-columns";
import PostDetail from "./post-detail";

export default function PostListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(0));
  const [search] = useQueryState("search");
  const [filter] = useQueryState("filter");
  const [sortType] = useQueryState("sortType");
  const [step] = useQueryState("step", parseAsInteger);

  const { data } = useSuspenseQuery({
    queryKey: ["projectList", step, page, search, sortType],
    queryFn: () => {
      if (!step) return null;
      return PostApi.getListByStep(
        step,
        page,
        search ?? "",
        filter as "ALL" | "TITLE" | "CONTENT" | "WRITER" | undefined,
        sortType === "NEWEST"
          ? "LATEST"
          : sortType === "OLDEST"
            ? "OLDEST"
            : undefined,
      );
    },
  });

  if (!step || !data) return null;

  return (
    <>
      <TableTools showFilter showSort />
      <TableWithSheet
        columns={postListColumns}
        data={data.content.map((post) => ({ ...post, id: post.postId }))}
        content={PostDetail}
        totalPages={data.totalPages}
      />
    </>
  );
}
