import { useRef, useState } from "react";
import { FormControl, FormItem, FormLabel, Button, FormDescription } from "@ui";
import { UploadIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/composites/confirm-dialog";
import { FileMetadataResponse } from "@/lib/api/generated/main/models";
import { useDeletePostFiles } from "@/lib/api/generated/main/services/post-api/post-api";
import { useUploadPostFiles } from "@/lib/api/generated/main/services/post-api/post-api";
import { formatFileSize, isValidFileType } from "@/lib/utils";
import { ALLOWED_FILE_TYPES } from "@/lib/constants/etc";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FileUploadSectionProps {
  mode: "create" | "edit";
  postId?: number;
  initialFiles?: FileMetadataResponse[];
  onFilesChange?: (files: File[]) => void;
}

export function FileUploadSection({
  mode,
  postId,
  initialFiles = [],
  onFilesChange,
}: FileUploadSectionProps) {
  // 생성 모드: 미리보기용 파일 목록 (submit 시 상위 컴포넌트에서 업로드)
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  // 수정 모드: 서버에 저장된 파일 메타데이터 목록
  const [savedFiles, setSavedFiles] =
    useState<FileMetadataResponse[]>(initialFiles);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadPostFiles } = useUploadPostFiles();
  const { mutateAsync: deletePostFile } = useDeletePostFiles();

  // 파일 선택 핸들러
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // 파일 타입 검증
    const invalidFiles = selectedFiles.filter(
      (file) => !isValidFileType(file.name),
    );

    if (invalidFiles.length > 0) {
      toast.error(
        `지원하지 않는 파일 형식이 포함되어 있습니다: ${invalidFiles
          .map((file) => file.name)
          .join(", ")}`,
      );
      return;
    }

    // 파일 크기 및 개수 검증
    const isValid = selectedFiles.every((file) => file.size <= MAX_FILE_SIZE);
    const totalCount =
      mode === "create"
        ? previewFiles.length + selectedFiles.length
        : savedFiles.length + selectedFiles.length;

    if (!isValid) {
      toast.error("50MB 이하의 파일만 업로드할 수 있습니다");
      return;
    }

    if (totalCount > 10) {
      toast.error("최대 10개의 파일만 업로드할 수 있습니다");
      return;
    }

    if (mode === "create") {
      // 생성 모드: 미리보기 목록에 추가
      setPreviewFiles((prev) => [...prev, ...selectedFiles]);
      onFilesChange?.([...previewFiles, ...selectedFiles]);
    } else if (postId) {
      // 수정 모드: 바로 서버에 업로드
      try {
        await uploadPostFiles({
          postId,
          data: { files: selectedFiles },
        });
        const newFiles: FileMetadataResponse[] = selectedFiles.map((file) => ({
          id: Date.now(),
          displayTitle: file.name,
          size: file.size,
        }));
        setSavedFiles((prev) => [...prev, ...newFiles]);
        toast.success("파일이 업로드되었습니다");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("파일 업로드에 실패했습니다");
      }
    }

    // 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = async (index: number, fileId?: number) => {
    if (mode === "create") {
      // 생성 모드: 미리보기에서만 제거
      const updatedFiles = previewFiles.filter((_, i) => i !== index);
      setPreviewFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    } else if (postId && fileId) {
      // 수정 모드: 서버에서 삭제
      try {
        await deletePostFile({
          postId,
          fileId,
        });
        setSavedFiles((prev) => prev.filter((file) => file.id !== fileId));
        toast.success("파일이 삭제되었습니다");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("파일 삭제에 실패했습니다");
      }
    }
  };

  // 현재 표시할 파일 목록
  const displayFiles =
    mode === "create"
      ? previewFiles.map((file) => ({
          id: undefined,
          displayTitle: file.name,
          size: String(file.size),
        }))
      : savedFiles;

  return (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel>첨부파일</FormLabel>
        <FormDescription>
          {mode === "create"
            ? "최대 10개의 파일을 첨부할 수 있습니다."
            : "게시글 수정 시 파일 추가와 삭제는 미리보기와 동시에 서버에 반영됩니다."}
        </FormDescription>
      </div>
      <FormControl>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
              accept={ALLOWED_FILE_TYPES.join(",")}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              파일 선택
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayFiles.map((file, index) => (
              <div
                key={file.id || index}
                className="flex items-center gap-2 rounded-md border p-2"
              >
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium">{file.displayTitle}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(Number(file.size))}
                  </div>
                </div>
                {mode === "create" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                ) : (
                  <ConfirmDialog
                    title="파일 삭제"
                    description={`${file.displayTitle} 파일을 삭제하시겠습니까? 삭제된 파일은 복구할 수 없습니다.`}
                    trigger={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    }
                    onConfirm={() => handleRemoveFile(index, file.id)}
                    confirmText="삭제"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </FormControl>
    </FormItem>
  );
}
