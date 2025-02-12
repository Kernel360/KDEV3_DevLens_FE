import { UserAvatar } from "@/components/composites/user-avatar";
import { formatDateWithTime } from "@/lib/utils";
import { Button } from "@ui";

interface CommentItemProps {
  userName: string;
  userImage?: string;
  content: string;
  createdAt: string;
  onReplyClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function CommentItem({
  userName,
  userImage,
  content,
  createdAt,
  onReplyClick,
  children,
  className = "",
}: CommentItemProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex gap-3">
        <UserAvatar name={userName} imageSrc={userImage} />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">
              {formatDateWithTime(createdAt)}
            </span>
            {onReplyClick && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-auto p-0 text-xs text-muted-foreground"
                onClick={onReplyClick}
              >
                답글달기
              </Button>
            )}
          </div>
          <p className="text-sm">{content}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
