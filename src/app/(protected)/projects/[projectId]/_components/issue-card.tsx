import IssueDetail from "@/app/(protected)/projects/[projectId]/_components/issue-detail";
import { IssueList } from "@/types/issue-list";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui";

export default function IssueCard({ issue }: { issue: IssueList }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card key={issue.id} className="flex cursor-pointer flex-col gap-2 p-2">
          <h2 className="line-clamp-1 text-sm font-medium">{issue.title}</h2>
          <div className="flex w-full justify-end">
            <Badge className="hover:bg-primary">승인요청</Badge>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] max-w-3xl flex-col">
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
      </DialogContent>
    </Dialog>
  );
}
