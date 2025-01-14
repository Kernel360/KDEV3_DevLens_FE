"use client";

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
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface StepInfo {
  id: string;
  title: string;
  description?: string;
  order?: number;
}

interface EditStepDialogProps {
  stepInfo: StepInfo;
  onUpdate?: (updatedStep: StepInfo) => void;
}

export function EditStepDialog({ stepInfo, onUpdate }: EditStepDialogProps) {
  const [step, setStep] = useState<StepInfo>(stepInfo);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate?.(step);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
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
                value={step.title}
                onChange={(e) => setStep({ ...step, title: e.target.value })}
                className="col-span-3"
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
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                순서
              </Label>
              <Input
                id="order"
                type="number"
                value={step.order || 0}
                onChange={(e) =>
                  setStep({ ...step, order: parseInt(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" type="submit">삭제</Button>
            <Button type="submit">수정</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
