"use client";

import { UserAvatar } from "@/components/composites/user-avatar";
import { PostResponse } from "@/lib/api/generated/main/models/postResponse";
import {
  useDeletePost,
  useSelectPost,
} from "@/lib/api/generated/main/services/post-api/post-api";
import {
  formatDateToRelative,
  formatFileSize,
  getStatusLabel,
  getStatusVariant,
} from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@ui";
import {
  ArrowUpLeft,
  ChevronRight,
  MoreVertical,
  Paperclip,
  Pencil,
  Reply,
  Trash2,
} from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CommentsSection } from "./comments-section";
import PostForm from "./post-form";
import { useLinkStore } from "@/store/use-link-store";

const initialPost: Required<PostResponse> = {
  postId: 0,
  isParentPost: true,
  projectStepId: 0,
  title: "",
  content: "",
  writer: "",
  status: "DEFAULT",
  priority: "DEFAULT",
  createDate: "",
  updateDate: "",
  deadline: "",
  isAuthor: false,
  relatedPosts: [],
  files: [],
  links: [],
  comments: [],
};

function PostDetail({ id }: { id: number }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [, setPostId] = useQueryState("id");

  const [, setNewPost] = useQueryState("new", parseAsBoolean);
  const queryClient = useQueryClient();

  const { data: post = initialPost, isLoading } = useSelectPost(id, {
    query: {
      enabled: !!id,
      // 타입에 undefined 제거
      select: (data): Required<PostResponse> => ({
        ...initialPost,
        ...data,
      }),
    },
  });

  const { mutate: deletePost } = useDeletePost({
    mutation: {
      onSuccess: () => {
        toast.success("게시물이 삭제되었습니다");
        setIsDeleteDialogOpen(false);
        // 쿼리파라미터의 id 삭제 목록으로 돌아가기
        setPostId(null);
        // post list table 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ["postList"] });
      },
      onError: (error) => {
        toast.error("게시물 삭제에 실패했습니다");
        console.error(error);
      },
    },
  });

  const handleDelete = () => {
    deletePost({ postId: id });
  };

  const setLinks = useLinkStore((state) => state.setLinks);
  const reset = useLinkStore((state) => state.reset);

  useEffect(() => {
    if (post.links) {
      setLinks(post.links);
    }

    return () => {
      reset(); // cleanup
    };
  }, [post.links, setLinks, reset]);

  if (isLoading) return <div>Loading...</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  if (isEditing) {
    return (
      <PostForm
        mode="edit"
        defaultStepId={post.projectStepId}
        postId={post.postId}
        initialData={{
          step: String(post.projectStepId),
          status: post.status,
          priority: post.priority,
          title: post.title,
          content: post.content,
          dueDate: post.deadline ? new Date(post.deadline) : undefined,
          links:
            post.links?.map((link) => ({
              linkTitle: link.linkTitle ?? "",
              link: link.link ?? "",
            })) ?? [],
        }}
        initialFiles={post.files}
        onCancel={() => {
          setIsEditing(false);
          setPostId(String(post.postId)); // URL 파라미터 복구
        }}
      />
    );
  }

  return (
    <>
      <div className="space-y-4">
        {!post.isParentPost && (
          <Button
            onClick={() => {
              setPostId(String(post.relatedPosts[0].id));
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowUpLeft className="h-4 w-4" />
            원글 :
            <span className="text-muted-foreground">
              {post.relatedPosts[0].title}
            </span>
          </Button>
        )}
        {/* 제목 및 메타 정보 */}
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {post.isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  삭제하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <div>
            <span className="text-muted-foreground">작성자</span>
            <div className="mt-1 flex items-center gap-2">
              <UserAvatar
                className="size-6"
                name={post.writer!}
                imageSrc={""}
              />
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
        <div className="prose prose-sm mb-12 max-w-none whitespace-pre-wrap">
          {post.content}
        </div>

        {post.files.length > 0 || post.links.length > 0 ? (
          <Separator className="my-4" />
        ) : null}

        {/* 첨부파일 */}

        {post.files && post.files.length > 0 && (
          <div>
            <h3 className="mb-3 font-bold">첨부파일</h3>
            <div className="space-y-2">
              {post.files.map((file) => (
                <div key={file.id} className="flex items-center gap-2 text-sm">
                  <Paperclip className="h-4 w-4" />
                  <a
                    href={file.path}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {file.displayTitle}
                  </a>
                  <span className="text-muted-foreground">
                    ({formatFileSize(Number(file.size))})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 링크 */}
        {post.links && post.links.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">관련 링크</h3>
            <div className="grid grid-cols-2 gap-2">
              {post.links.map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  className="w-full items-center gap-4 rounded-md border p-3"
                >
                  <div className="font-medium">{link.linkTitle}</div>
                  <div className="truncate text-sm text-muted-foreground hover:underline">
                    {link.link}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {post.isParentPost && (
          <>
            <Separator />
            <div className="flex flex-col gap-2">
              <h3 className="mb-3 font-medium">
                답글 {post.relatedPosts.length}건
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {post.relatedPosts.map((post) => (
                  <Button
                    variant="secondary"
                    key={post.id}
                    onClick={() => {
                      setPostId(String(post.id));
                    }}
                  >
                    <h3 className="w-full truncate">{post.title}</h3>
                    <ChevronRight />
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
        {post.isParentPost && (
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => {
              setNewPost(true);
            }}
          >
            <Reply className="rotate-180" />
            답글 작성
          </Button>
        )}
        {/* 댓글 */}
        <Separator />
        <CommentsSection comments={post.comments || []} postId={id} />
      </div>

      {/* 삭제 모달 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 삭제</DialogTitle>
            <DialogDescription>
              정말 이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostDetail;
