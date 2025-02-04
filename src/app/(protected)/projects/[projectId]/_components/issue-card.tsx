import { ProjectChecklist } from "@/types/project";
import {
  Badge,
  Card,
  Dialog,
  DialogTrigger
} from "@ui";

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
          <h2 className="line-clamp-1 text-sm font-medium">{issue.checklistName}</h2>
          <div className="flex w-full justify-end">
            {issue.approvalTime && <Badge className="hover:bg-primary">승인요청</Badge> }
          </div>
        </Card>
      </DialogTrigger>
      {/* <DialogContent className="flex h-[90vh] max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle>이슈 상세</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <IssueDetail />
        </div>
        <DialogFooter>
          <Button variant="destructive" type="submit">
            반려
          </Button>
          <Button type="submit">승인</Button>
        </DialogFooter>
      </DialogContent> */}
    </Dialog>
  );
}
