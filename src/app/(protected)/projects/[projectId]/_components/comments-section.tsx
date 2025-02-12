import { useCreateComment } from "@/lib/api/generated/main/services/comment-api/comment-api";
import {
  PostCommentRequest,
  GetCommentResponse,
} from "@/lib/api/generated/main/models";
import { useState } from "react";
import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getSelectPostQueryKey } from "@/lib/api/generated/main/services/post-api/post-api";

interface CommentsSectionProps {
  postId: number;
  comments: GetCommentResponse[];
  onCommentUpdate?: () => void;
}

function groupComments(comments: CommentsSectionProps["comments"]) {
  return comments.reduce(
    (acc, comment) => {
      if (!comment.parentCommentId) {
        return [
          ...acc,
          {
            ...comment,
            replies: comments.filter(
              (c) => c.parentCommentId === comment.commentId,
            ),
          },
        ];
      }
      return acc;
    },
    [] as (CommentsSectionProps["comments"][0] & {
      replies: CommentsSectionProps["comments"];
    })[],
  );
}

export function CommentsSection({ postId, comments }: CommentsSectionProps) {
  const queryClient = useQueryClient();
  const [isReplying, setIsReplying] = useState<number | null>(null);
  const groupedComments = groupComments(comments);

  const { mutate: createComment } = useCreateComment({
    mutation: {
      onSuccess: async () => {
        setIsReplying(null);
        await queryClient.invalidateQueries({
          queryKey: getSelectPostQueryKey(postId),
        });
      },
      onError: (error) => {
        console.error("Failed to submit comment:", error);
        toast.error("댓글 작성에 실패했습니다");
      },
    },
  });

  const handleCommentSubmit = async (
    data: { content: string },
    parentId?: number,
  ) => {
    const commentData: PostCommentRequest = {
      content: data.content,
      parentCommentId: parentId,
    };

    createComment({
      postId,
      data: commentData,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">댓글 {comments.length}개</h3>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {groupedComments.map((comment) => (
          <CommentItem
            key={comment.commentId ?? 0}
            userName={comment.writer ?? "익명"}
            content={comment.content ?? ""}
            createdAt={comment.createdAt ?? ""}
            onReplyClick={() =>
              setIsReplying(
                isReplying === comment.commentId
                  ? null
                  : (comment.commentId ?? null),
              )
            }
          >
            {/* 대댓글 목록 */}
            {comment.replies?.map((reply) => (
              <div key={reply.commentId ?? 0} className="ml-11">
                <CommentItem
                  userName={reply.writer ?? "익명"}
                  content={reply.content ?? ""}
                  createdAt={reply.createdAt ?? ""}
                />
              </div>
            ))}

            {/* 답글 입력 폼 */}
            {isReplying === comment.commentId && (
              <div className="ml-11">
                <CommentForm
                  onSubmit={(data) =>
                    handleCommentSubmit(data, comment.commentId)
                  }
                  placeholder="답글을 입력하세요"
                  className="space-y-3"
                  autoFocus
                />
              </div>
            )}
          </CommentItem>
        ))}
      </div>

      {/* 새 댓글 작성 폼 */}
      <CommentForm
        onSubmit={(data) => handleCommentSubmit(data)}
        className="space-y-3 p-1"
      />
    </div>
  );
}
