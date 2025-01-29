"use client";

import { UserAvatar } from "@/components/composites/user-avatar";
import { PostApi } from "@/lib/apis/main/postApi";
import {
  formatDateToRelative,
  getStatusLabel,
  getStatusVariant,
} from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@ui";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { CommentsSection } from "./comments-section";

function PostDetail({ id }: { id: number }) {
  const { data: post, refetch } = useSuspenseQuery({
    queryKey: ["postDetail", id],
    queryFn: () => PostApi.getDetail(id),
    retry: 1,
  });

  return (
    <>
      {/* 제목 및 메타 정보 */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <div>
            <span className="text-muted-foreground">작성자</span>
            <div className="mt-1 flex items-center gap-2">
              <UserAvatar className="size-6" name={post.writer} imageSrc={""} />
              <span>{post.writer}</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">상태</span>
            <div className="mt-1">
              <Badge variant={getStatusVariant(post.status)}>
                {getStatusLabel(post.status)}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">마감일</span>
            <div className="mt-1">
              {post.deadline
                ? new Date(post.deadline).toLocaleDateString()
                : "-"}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">문서번호</span>
            <div className="mt-1">{post.postId}</div>
          </div>
          <div>
            <span className="text-muted-foreground">작성일</span>
            <div className="mt-1">{formatDateToRelative(post.createDate)}</div>
          </div>
          <div>
            <span className="text-muted-foreground">수정일</span>
            <div className="mt-1">{formatDateToRelative(post.updateDate)}</div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {/* 본문 */}
        <div className="prose prose-sm max-w-none whitespace-pre-wrap">
          {post.content}
        </div>

        {/* 첨부파일 */}
        {/* {post.attachments && post.attachments.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">첨부파일</h3>
            <div className="space-y-2">
              {post.attachments.map((file) => (
                <div key={file.id} className="flex items-center gap-2 text-sm">
                  <FileIcon className="h-4 w-4" />
                  <a href={file.url} className="text-primary hover:underline">
                    {file.name}
                  </a>
                  <span className="text-muted-foreground">({file.size})</span>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* 관련 링크 */}
        {/* {post.attachments && post.relatedLinks.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">관련 링크</h3>
            <div className="space-y-2">
              {post.relatedLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={link.url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {link.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* 댓글 */}
        <Separator />
        <CommentsSection
          comments={post.comments || []}
          postId={post.postId}
          onCommentUpdate={refetch}
        />
      </div>
    </>
  );
}

export default PostDetail;
