"use client";

import { ProjectApi } from "@/lib/apis/main/projectApi";
import { ProjectStep } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EditStepDialogProps {
  stepInfo: ProjectStep;
}

export default function EditStepDialog({ stepInfo }: EditStepDialogProps) {
  const params = useParams();
  const [step, setStep] = useState<ProjectStep>(stepInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateStep, isPending: isUpdating } = useMutation({
    mutationFn: ProjectApi.steps.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectSteps"] });
      toast.success("단계가 수정되었습니다.");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(
        `단계 수정에 실패했습니다. ${error instanceof Error ? error.message : ""}`,
      );
    },
  });

  const { mutate: deleteStep, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      ProjectApi.steps.delete({
        projectId: Number(params.projectId),
        stepId: step.stepId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectSteps"] });
      toast.success("단계가 삭제되었습니다.");
      setShowDeleteAlert(false);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(
        `단계 삭제에 실패했습니다. ${error instanceof Error ? error.message : ""}`,
      );
    },
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateStep({
      stepId: step.stepId,
      stepName: step.stepName,
      stepDescription: step.description || "",
      stepOrder: step.stepOrder,
    });
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>프로젝트 진행 단계 수정</DialogTitle>
              <DialogDescription>
                프로젝트 진행 단계의 정보를 수정합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  단계명
                </Label>
                <Input
                  id="title"
                  value={step.stepName}
                  onChange={(e) =>
                    setStep({ ...step, stepName: e.target.value })
                  }
                  className="col-span-3"
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  설명
                </Label>
                <Input
                  id="description"
                  value={step.description || ""}
                  onChange={(e) =>
                    setStep({ ...step, description: e.target.value })
                  }
                  className="col-span-3"
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  순서
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={step.stepOrder || 0}
                  onChange={(e) =>
                    setStep({ ...step, stepOrder: Number(e.target.value) })
                  }
                  className="col-span-3"
                  disabled={isLoading}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteAlert(true)}
                disabled={isLoading}
              >
                삭제
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isUpdating ? "수정 중..." : "수정"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 단계 삭제 confirm */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>단계 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 단계를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteStep()}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
