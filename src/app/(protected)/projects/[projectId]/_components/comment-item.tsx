"use client";

import { UserAvatar } from "@/components/composites/user-avatar";
import { useDeleteComment } from "@/lib/api/generated/main/services/comment-api/comment-api";
import { getSelectPostQueryKey } from "@/lib/api/generated/main/services/post-api/post-api";
import { useUpdateComment } from "@/lib/api/generated/main/services/comment-api/comment-api";
import { formatDateWithTime } from "@/lib/utils";
import {
  Button,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { MoreVertical } from "lucide-react";
import CommentForm from "./comment-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommentFormValues } from "@/schemas/comment";

interface CommentItemProps {
  postId: number;
  commentId: number;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
  onReplyClick?: () => void;
  onCommentUpdate?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function CommentItem({
  postId,
  commentId,
  userName,
  userImage,
  content,
  createdAt,
  onReplyClick,
  onCommentUpdate,
  children,
  isAuthor,
  className = "",
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateComment } = useUpdateComment({
    mutation: {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries({
          queryKey: getSelectPostQueryKey(postId),
        });
        toast.success("댓글이 수정되었습니다");
      },
      onError: () => {
        toast.error("댓글 수정에 실패했습니다");
      },
    },
  });

  const { mutate: deleteComment } = useDeleteComment({
    mutation: {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        queryClient.invalidateQueries({
          queryKey: getSelectPostQueryKey(postId),
        });
        toast.success("댓글이 삭제되었습니다");
      },
      onError: () => {
        toast.error("댓글 삭제에 실패했습니다");
      },
    },
  });

  const handleUpdate = async (data: CommentFormValues) => {
    updateComment({
      postId,
      commentId,
      data: {
        content: data.content,
      },
    });
  };

  const handleDelete = () => {
    deleteComment({
      postId,
      commentId,
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex gap-3">
        <UserAvatar name={userName} imageSrc={userImage} />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{userName}</span>
            <span className="mr-auto text-xs text-muted-foreground">
              {formatDateWithTime(createdAt)}
            </span>
            {onReplyClick && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground"
                onClick={onReplyClick}
              >
                답글달기
              </Button>
            )}
            {isAuthor && (
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
          {isEditing ? (
            <CommentForm
              onSubmit={handleUpdate}
              initialValue={content}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-sm">{content}</p>
          )}
        </div>
      </div>
      {children}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
