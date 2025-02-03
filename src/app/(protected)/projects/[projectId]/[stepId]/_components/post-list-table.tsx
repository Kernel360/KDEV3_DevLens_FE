"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import PostDetail from "./post-detail";
import { postListColumns } from "./post-list-columns";
import { PostApi } from "@/lib/apis/main/postApi";
import { useParams } from "next/navigation";
import TableTools from "@/components/composites/table/table-tools";

export default function PostListTable() {
  const params = useParams();
  const [page] = useQueryState("page", parseAsInteger.withDefault(0));
  const [search] = useQueryState("search");
  const [filter] = useQueryState("filter");
  const [sortType] = useQueryState("sortType");

  const { data } = useSuspenseQuery({
    queryKey: ["projectList", page, search, sortType],
    queryFn: () =>
      PostApi.getListByStep(
        Number(params.stepId),
        page,
        search ?? "",
        filter as "ALL" | "TITLE" | "CONTENT" | "WRITER" | undefined,
        sortType === "NEWEST"
          ? "LATEST"
          : sortType === "OLDEST"
            ? "OLDEST"
            : undefined,
      ),
    retry: 1,
  });

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
