"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Camera } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useUploadProfileImage,
  useMemberDetail,
  getMemberDetailQueryKey,
} from "@/lib/api/generated/main/services/my-page-api/my-page-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRef, useState } from "react";

export default function EditAvatarButton() {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();
  const { data: userInfo } = useMemberDetail();
  const { mutate: uploadImage } = useUploadProfileImage({
    mutation: {
      onSuccess: () => {
        // 멤버 상세정보 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: getMemberDetailQueryKey(),
        });

        // 프로필 이미지 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: [`/api/members/${userInfo?.memberId}/profile-image`],
        });

        // 전역 상태 업데이트 - 기존 사용자 정보는 유지하고 프로필 URL만 업데이트
        if (userInfo && selectedFile) {
          const currentUser = useAuthStore.getState().user;
          if (currentUser) {
            setUser({
              ...currentUser,
              profileUrl: URL.createObjectURL(selectedFile),
            });
          }
        }

        setOpen(false);
        setPreviewUrl(null);
        setSelectedFile(null);
        toast.success("프로필 이미지가 성공적으로 업로드되었습니다.");
      },
      onError: (error) => {
        toast.error("프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        console.error("Profile image upload error:", error);
      },
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !userInfo?.memberId) return;

    uploadImage({
      memberId: userInfo.memberId,
      data: { file: selectedFile },
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute -bottom-2 -right-2 size-8 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 이미지 업로드</DialogTitle>
          <DialogDescription>
            서비스 내에서 사용할 프로필 이미지를 업로드해주세요.
          </DialogDescription>
        </DialogHeader>
        <div
          className="mt-4 flex flex-col items-center justify-center gap-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed">
            {previewUrl ? (
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="h-full w-full rounded-full object-cover"
                width={256}
                height={256}
              />
            ) : (
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary underline focus-within:outline-none hover:text-primary/80"
                  >
                    <span>파일 업로드</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">또는 파일 끌어서 놓기</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF 최대 10MB
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setPreviewUrl(null);
              setSelectedFile(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
