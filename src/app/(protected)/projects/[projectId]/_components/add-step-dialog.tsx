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

export default function AddStepDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 진행 단계 추가</DialogTitle>
          <DialogDescription>
            프로젝트 진행 시 큰 단위의 단계를 정의합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              단계명
            </Label>
            <Input id="name" placeholder="검수" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              설명 or 순서
            </Label>
            <Input id="username" placeholder="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
