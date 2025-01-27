"use client";

import TableWithSheet from "@/components/composites/table/table-with-sheet";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import PostDetail from "./post-detail";
import { postListColumns } from "./post-list-columns";
import { PostApi } from "@/lib/apis/main/postApi";

export default function PostListTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data } = useSuspenseQuery({
    queryKey: ["projectList", page],
    queryFn: () => PostApi.getListByStep(1, page),
    retry: 1,
  });

  return (
    <TableWithSheet
      columns={postListColumns}
      data={data.content.map((post) => ({ ...post, id: post.postId }))}
      content={PostDetail}
      totalPages={data.totalPages}
    />
  );
}
