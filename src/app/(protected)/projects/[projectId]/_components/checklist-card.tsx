import {
  Badge,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import ChecklistDetail from "./checklist-detail";
import ChecklistRequestForm from "./checklist-request-form";
import { GetStepChecklistprojectChecklist } from "@/lib/api/generated/main/models";
import { getChecklistStatusVariant } from "@/lib/utils";

export default function ChecklistCard({
  checklist,
}: {
  checklist: GetStepChecklistprojectChecklist;
}) {
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
          {checklist.checklistStatus && (
              <Badge variant={getChecklistStatusVariant(checklist.checklistStatus).variant}>
                {getChecklistStatusVariant(checklist.checklistStatus).label}
              </Badge>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-h-[50vh] max-w-3xl flex-col">
        <DialogHeader className="flex flex-row items-center justify-between pr-4">
          <DialogTitle>{checklist.checklistName}</DialogTitle>
          <ChecklistRequestForm checklistId={checklist.checklistId ?? 0} />
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <ChecklistDetail checklistId={checklist.checklistId ?? 0} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
