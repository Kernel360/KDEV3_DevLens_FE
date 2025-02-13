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
import IssueDetail from "./issue-detail";

interface IssueCardProps {
  issue: ProjectChecklist;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          key={issue.checklistId}
          className="flex cursor-pointer flex-col gap-2 p-2"
        >
          <h2 className="line-clamp-1 text-sm font-medium">
            {issue.checklistName}
          </h2>
          <div className="flex w-full justify-end">
            {issue.approvalTime && (
              <Badge className="hover:bg-primary">승인요청</Badge>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-h-[50vh] max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle>{issue.checklistName}</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <IssueDetail checklistId={issue.checklistId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
