import {
  Badge,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { ProjectChecklist } from "@/types/project";
import ChecklistDetail from "./checklist-detail";
import ChecklistRequestForm from "./checklist-request-form";

interface ChecklistCardProps {
  checklist: ProjectChecklist;
}

export default function ChecklistCard({ checklist }: ChecklistCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          key={checklist.checklistId}
          className="flex cursor-pointer flex-col gap-2 p-2"
        >
          <h2 className="line-clamp-1 text-sm font-medium">
            {checklist.checklistName}
          </h2>
          <div className="flex w-full justify-end">
            {checklist.approvalTime && (
              <Badge className="hover:bg-primary">승인요청</Badge>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-h-[50vh] max-w-3xl flex-col">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle>{checklist.checklistName}</DialogTitle>
          <ChecklistRequestForm checklistId={checklist.checklistId} />
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <ChecklistDetail checklistId={checklist.checklistId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
