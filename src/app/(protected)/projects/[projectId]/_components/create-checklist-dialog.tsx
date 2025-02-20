"use client";
import { usePostProjectChecklist } from "@/lib/api/generated/main/services/project-checklist-api/project-checklist-api";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@ui";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ChecklistForm {
  checklistName: string;
  checklistDescription: string;
}

export default function CreateChecklistDialog({ stepId }: { stepId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ChecklistForm>({
    checklistName: "",
    checklistDescription: "",
  });
  const queryClient = useQueryClient();
  const params = useParams();
  const projectId = Number(params.projectId);

  const { mutate: createChecklist, isPending } = usePostProjectChecklist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["projectSteps"],
        });
        toast.success("체크리스트가 추가되었습니다.");
        setIsOpen(false);
        setForm({
          checklistName: "",
          checklistDescription: "",
        });
      },
      onError: (error) => {
        toast.error(
          `체크리스트 추가에 실패했습니다. ${error instanceof Error ? error.message : ""}`,
        );
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.checklistName.trim()) {
      toast.error("단계명을 입력해주세요");
      return;
    }

    if (!form.checklistDescription.trim()) {
      toast.error("설명을 입력해주세요");
      return;
    }

    createChecklist({
      projectId,
      stepId,
      data: {
        checklistTitle: form.checklistName,
        checklistDescription: form.checklistDescription,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="invisible flex h-4 w-full items-center justify-center bg-transparent opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
        >
          <Plus size={10} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>체크리스트 추가</DialogTitle>
            <DialogDescription>
              프로젝트 진행 시 주요하게 확인해야 하는 리스트를 생성합니다
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stepName" className="text-right">
                단계명
              </Label>
              <Input
                id="checklistName"
                placeholder="기획안 컨펌"
                className="col-span-3"
                value={form.checklistName}
                onChange={(e) =>
                  setForm({ ...form, checklistName: e.target.value })
                }
                disabled={isPending}
                maxLength={20}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stepDescription" className="text-right">
                설명
              </Label>
              <Input
                id="checklistDescription"
                placeholder="기획안 검토 및 승인 절차"
                className="col-span-3"
                value={form.checklistDescription}
                onChange={(e) =>
                  setForm({ ...form, checklistDescription: e.target.value })
                }
                disabled={isPending}
                maxLength={50}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "추가 중..." : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
