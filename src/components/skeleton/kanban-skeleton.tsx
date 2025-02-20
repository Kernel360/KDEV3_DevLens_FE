import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KanbanBoardSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-[15rem] shrink-0">
            <Card className="group h-full border-none bg-zinc-50 px-3 shadow-none *:p-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Show 3 skeleton issue cards per column */}
                {Array.from({ length: 3 }).map((_, issueIndex) => (
                  <Card key={issueIndex} className="overflow-hidden">
                    <CardContent className="space-y-2 p-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
