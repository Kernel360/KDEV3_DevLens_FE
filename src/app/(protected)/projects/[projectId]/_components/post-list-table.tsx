"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { parseAsInteger, useQueryState } from "nuqs";
import TableTools from "@/components/composites/table/table-tools";
import { postListColumns } from "./post-list-columns";
import PostDetail from "./post/post-detail";
import { useSelectPosts } from "@/lib/api/generated/main/services/post-api/post-api";
import { useParams } from "next/navigation";
import { PostListResponse } from "@/lib/api/generated/main/models";

export default function PostListTable() {
  const { projectId } = useParams<{ projectId: string }>();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const [filter] = useQueryState("filter");
  const [sortType] = useQueryState("sortType");
  const [step] = useQueryState("step", parseAsInteger);

  const { data } = useSelectPosts<{
    content: PostListResponse[];
    totalPages: number;
  }>(Number(projectId), {
    projectStepId: step ?? undefined,
    isAllStages: step ? false : true,
    page: page - 1,
    filter: filter as "ALL" | "TITLE" | "CONTENT" | "WRITER" | undefined,
    keyword: search ?? "",
    sortType: sortType as "NEWEST" | "OLDEST" | undefined,
  });

  if (!data) return null;

  return (
    <>
      <TableTools showFilter showSort />
      <TableWithSheet
        columns={postListColumns}
        data={(data.content || []).map((post) => ({
          ...post,
          id: post.postId ?? 0,
        }))}
        content={PostDetail}
        totalPages={data.totalPages}
      />
    </>
  );
}
