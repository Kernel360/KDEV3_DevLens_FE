import { useState } from "react";
import { FormControl, FormItem, FormLabel, Button, Input } from "@ui";
import { PlusCircle, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/composites/confirm-dialog";
import { LinkInput, LinkResponse } from "@/lib/api/generated/main/models";
import {
  useDeleteLink,
  useUploadLinks,
} from "@/lib/api/generated/main/services/post-api/post-api";
import { useLinkStore } from "@/store/use-link-store";

interface LinkUploadSectionProps {
  mode: "create" | "edit";
  postId?: number;
  onLinksChange?: (links: LinkInput[]) => void;
}

export function LinkUploadSection({
  mode,
  postId,
  onLinksChange,
}: LinkUploadSectionProps) {
  // 입력 필드 상태
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // create 모드용 로컬 상태
  const [localLinks, setLocalLinks] = useState<LinkInput[]>([]);

  // Zustand store
  const { links, addLink, removeLink } = useLinkStore();

  const { mutateAsync: uploadLinks } = useUploadLinks();
  const { mutateAsync: deleteLink } = useDeleteLink();

  const resetFields = () => {
    setLinkTitle("");
    setLinkUrl("");
  };

  const handleAddLink = async () => {
    if (!linkTitle || !linkUrl) {
      toast.error("링크 제목과 URL을 모두 입력해주세요");
      return;
    }

    const newLink: LinkInput = {
      linkTitle,
      link: linkUrl,
    };

    if (mode === "create") {
      // create 모드: 로컬 상태에만 추가
      const updatedLinks = [...localLinks, newLink];
      setLocalLinks(updatedLinks);
      onLinksChange?.(updatedLinks);
    } else if (postId) {
      try {
        const response = (await uploadLinks({
          postId,
          data: [newLink],
        })) as { [0]: LinkResponse };

        if (!response[0]) {
          throw new Error("링크 생성 응답 데이터가 없습니다");
        }

        // store에 새로운 링크 추가
        addLink(response[0]);
        toast.success("링크가 추가되었습니다");
        resetFields();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("링크 추가에 실패했습니다");
        return;
      }
    }

    resetFields();
  };

  const handleRemoveLink = async (index: number, linkId?: number) => {
    if (mode === "create") {
      const updatedLinks = localLinks.filter((_, i) => i !== index);
      setLocalLinks(updatedLinks);
      onLinksChange?.(updatedLinks);
    } else if (postId && linkId) {
      try {
        await deleteLink({
          postId,
          linkId,
        });
        removeLink(linkId);
        toast.success("링크가 삭제되었습니다");
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("링크 삭제에 실패했습니다");
      }
    }
  };

  return (
    <FormItem className="space-y-4">
      <FormLabel>관련 링크</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {/* 링크 입력 폼 */}
          <div className="flex gap-4">
            <Input
              placeholder="링크 제목"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
            <Input
              placeholder="URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <Button type="button" variant="outline" onClick={handleAddLink}>
              <PlusCircle className="mr-2 h-4 w-4" />
              추가
            </Button>
          </div>

          {/* 링크 목록 */}
          <div className="space-y-3">
            {(mode === "create" ? localLinks : links).map((link, index) => {
              // edit 모드에서는 LinkResponse 타입, create 모드에서는 LinkInput 타입
              const linkId =
                mode === "edit" ? (link as LinkResponse).id : undefined;
              const linkTitle =
                mode === "create"
                  ? (link as LinkInput).linkTitle
                  : (link as LinkResponse).linkTitle;
              const linkUrl =
                mode === "create"
                  ? (link as LinkInput).link
                  : (link as LinkResponse).link;

              return (
                <div
                  key={mode === "create" ? index : linkId}
                  className="flex items-center gap-4 rounded-md border p-3"
                >
                  <div className="w-full">
                    <div className="font-medium">{linkTitle}</div>
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full truncate text-sm text-muted-foreground hover:underline"
                    >
                      {linkUrl}
                    </a>
                  </div>
                  {mode === "create" ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  ) : (
                    <ConfirmDialog
                      title="링크 삭제"
                      description={`${linkTitle} 링크를 삭제하시겠습니까?`}
                      trigger={
                        <Button type="button" variant="ghost" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      }
                      onConfirm={() => handleRemoveLink(index, linkId)}
                      confirmText="삭제"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </FormControl>
    </FormItem>
  );
}
