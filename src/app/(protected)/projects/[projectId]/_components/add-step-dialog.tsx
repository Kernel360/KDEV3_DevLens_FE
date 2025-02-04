"use client";

import { ProjectApi } from "@/lib/apis/main/projectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface StepForm {
  stepName: string;
  stepDescription: string;
  stepOrderNumber: number;
  checklists: [];
}

interface AddStepDialogProps {
  nextStepOrder: number;
}

export default function AddStepDialog({ nextStepOrder }: AddStepDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<StepForm>({
    stepName: "",
    stepDescription: "",
    stepOrderNumber: nextStepOrder,
    checklists: [],
  });
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate: createStep, isPending } = useMutation({
    mutationFn: () =>
      ProjectApi.steps.create(Number(params.projectId), {
        stepName: form.stepName,
        stepDescription: form.stepDescription,
        stepOrderNumber: form.stepOrderNumber,
        checklists: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectSteps"] });
      toast.success("단계가 추가되었습니다.");
      setIsOpen(false);
      setForm({
        stepName: "",
        stepDescription: "",
        stepOrderNumber: nextStepOrder,
        checklists: [],
      });
    },
    onError: (error) => {
      toast.error(
        `단계 추가에 실패했습니다. ${error instanceof Error ? error.message : ""}`,
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStep();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>프로젝트 진행 단계 추가</DialogTitle>
            <DialogDescription>
              프로젝트 진행 시 큰 단위의 단계를 정의합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stepName" className="text-right">
                단계명
              </Label>
              <Input
                id="stepName"
                placeholder="검수"
                className="col-span-3"
                value={form.stepName}
                onChange={(e) => setForm({ ...form, stepName: e.target.value })}
                disabled={isPending}
                maxLength={15}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stepDescription" className="text-right">
                설명
              </Label>
              <Input
                id="stepDescription"
                placeholder=""
                className="col-span-3"
                value={form.stepDescription}
                onChange={(e) =>
                  setForm({ ...form, stepDescription: e.target.value })
                }
                disabled={isPending}
                maxLength={30}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stepOrder" className="text-right">
                순서
              </Label>
              <Input
                id="stepOrder"
                type="number"
                min={1}
                max={10}
                className="col-span-3"
                value={form.stepOrderNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stepOrderNumber: Number(e.target.value),
                  })
                }
                disabled={isPending}
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
