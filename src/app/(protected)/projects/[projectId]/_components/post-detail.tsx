"use client";

import { UserAvatar } from "@/components/composites/user-avatar";
import {
  useDeletePost,
  useSelectPost
} from "@/lib/api/generated/main/services/post-api/post-api";
import {
  formatDateToRelative,
  getStatusLabel,
  getStatusVariant,
} from "@/lib/utils";
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
  Separator
} from "@ui";
import { FileIcon, LinkIcon, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CommentsSection } from "./comments-section";

const initialPost = {
  postId: 0,
  projectStepId: 0,
  title: "",
  content: "",
  writer: "",
  status: "PREPARED",
  priority: "NORMAL",
  createDate: "",
  updateDate: "",
  deadline: "",
  files: [],
  links: [],
  comments: [],
};

function PostDetail({ id }: { id: number }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const { data: post = initialPost, isLoading } = useSelectPost(id, {
    query: {
      enabled: !!id,
    },
  });

  const { mutate: deletePost } = useDeletePost({
    mutation: {
      onSuccess: () => {
        toast.success("게시물이 삭제되었습니다");
        setIsDeleteDialogOpen(false);
        router.back();
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

  if (isLoading) return <div>Loading...</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

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
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
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
              <UserAvatar
                className="size-6"
                name={post.writer ?? ""}
                imageSrc={""}
              />
              <span>{post.writer}</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">상태</span>
            <div className="mt-1">
              <Badge variant={getStatusVariant(post.status ?? "")}>
                {getStatusLabel(post.status ?? "")}
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
            <div className="mt-1">
              {post.createDate ? formatDateToRelative(post.createDate) : "-"}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">수정일</span>
            <div className="mt-1">
              {post.updateDate ? formatDateToRelative(post.updateDate) : "-"}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {/* 본문 */}
        <div className="prose prose-sm max-w-none whitespace-pre-wrap">
          {post.content}
        </div>

        <Separator className="my-4" />

        {/* 첨부파일 */}
        {post.files && post.files.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">첨부파일</h3>
            <div className="space-y-2">
              {post.files.map((file) => (
                <div key={file.id} className="flex items-center gap-2 text-sm">
                  <FileIcon className="h-4 w-4" />
                  <a href={file.path} className="text-primary hover:underline">
                    {file.displayTitle}
                  </a>
                  <span className="text-muted-foreground">({file.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 링크 */}
        {post.links && post.links.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">관련 링크</h3>
            <div className="space-y-2">
              {post.links.map((link) => (
                <div key={link.id} className="flex items-center gap-2 text-sm">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={link.link}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {link.linkTitle}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 댓글 */}
        <Separator />
        <CommentsSection
          comments={post.comments || []}
          postId={id}
        />
      </div>

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
