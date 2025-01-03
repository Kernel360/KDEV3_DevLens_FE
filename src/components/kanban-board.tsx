import { EllipsisVertical, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "planning" | "design" | "develop";
}

export function KanbanBoard() {
  const columns = [
    { id: "planning", title: "기획" },
    { id: "design", title: "디자인" },
    { id: "develop", title: "개발" },
    { id: "qa", title: "QA" },
  ];

  const tasks: Task[] = [
    // 예시 데이터
    {
      id: "1",
      title: "디자인 시스템 구축",
      description: "Shadcn UI 설정",
      status: "planning",
    },
    {
      id: "2",
      title: "인증 구현",
      description: "로그인/회원가입",
      status: "design",
    },
    {
      id: "3",
      title: "검색 기능",
      description: "검색 컴포넌트 완성",
      status: "develop",
    },
    {
      id: "4",
      title: "추가기능",
      description: "검색 컴포넌트 완성",
      status: "design",
    },
  ];

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {columns.map((column) => (
          <div key={column.id} className="w-60 shrink-0">
            <Card className="h-full border border-slate-300 px-3 shadow-none *:p-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  {column.title}
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <Card key={task.id} className="cursor-pointer p-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    </Card>
                  ))}
                <Button
                  variant="outline"
                  className="flex h-4 w-full items-center justify-center"
                >
                  <Plus size={12} />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="w-20 shrink-0">
          <Button
            variant="outline"
            className="flex h-80 items-center justify-center"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
