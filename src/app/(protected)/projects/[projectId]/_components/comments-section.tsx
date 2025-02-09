import { Comment, CommentWithReplies } from "@/types/comment";
import { CommentFormValues } from "@/schemas/comment";
import { useState } from "react";
import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import { PostApi } from "@/lib/apis/main/postApi";
import { toast } from "sonner";

interface CommentsSectionProps {
  postId: number;
  comments: Comment[];
  onCommentUpdate?: () => void;
}

function groupComments(comments: Comment[]): CommentWithReplies[] {
  const parentComments: CommentWithReplies[] = [];
  const replyMap = new Map<number, Comment[]>();

  comments.forEach((comment) => {
    if (comment.parentCommentId === null) {
      parentComments.push({ ...comment, replies: [] });
    } else {
      const replies = replyMap.get(comment.parentCommentId) || [];
      replies.push(comment);
      replyMap.set(comment.parentCommentId, replies);
    }
  });

  parentComments.forEach((comment) => {
    comment.replies = replyMap.get(comment.commentId) || [];
  });

  return parentComments;
}

export function CommentsSection({
  postId,
  comments,
  onCommentUpdate,
}: CommentsSectionProps) {
  const [isReplying, setIsReplying] = useState<number | null>(null);
  const groupedComments = groupComments(comments || []);

  const handleCommentSubmit = async (
    data: CommentFormValues,
    parentId?: number,
  ) => {
    try {
      await PostApi.createComment(postId, {
        content: data.content,
        parentCommentId: parentId || null,
      });
      setIsReplying(null);
      toast.success("댓글이 작성되었습니다.");
      onCommentUpdate?.();
    } catch (error) {
      console.error("Failed to submit comment:", error);
      toast.error("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">댓글 {comments.length}개</h3>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {groupedComments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            userName={comment.writer}
            content={comment.content}
            createdAt={comment.createdAt}
            onReplyClick={() =>
              setIsReplying(
                isReplying === comment.commentId ? null : comment.commentId,
              )
            }
          >
            {/* 대댓글 목록 */}
            {comment.replies?.map((reply) => (
              <div key={reply.commentId} className="ml-11">
                <CommentItem
                  userName={reply.writer}
                  content={reply.content}
                  createdAt={reply.createdAt}
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
